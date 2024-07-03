import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Flex,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { SendRequestOptions, sendRequest } from "../hooks/http";
import { useAuth } from "../auth/AuthContext";
import { useTranslation } from "react-i18next";

interface Option {
  value: string | number;
  label: string;
}

const RentOut: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [books, setBooks] = useState<Option[]>([]);
  const [users, setUsers] = useState<Option[]>([]);
  const [selectedBook, setSelectedBook] = useState<Option | null>(null);
  const [selectedUser, setSelectedUser] = useState<Option | null>(null);
  const [returnDate, setReturnDate] = useState<string>("");
  const [, setRentalStartDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const inputBgColor = useColorModeValue("white", "gray.700");

  const fetchBooks = useCallback(async () => {
    const requestOptions: SendRequestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const data = await sendRequest<Array<{ id: number; name: string }>>(
        "http://localhost:8081/api/books/rent-books",
        requestOptions,
        navigate,
        logout
      );

      const bookOptions = data.map((book) => ({
        value: book.id,
        label: book.name,
      }));
      setBooks(bookOptions);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }, [navigate, logout]);

  const fetchUsers = useCallback(async () => {
    const requestOptions: SendRequestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const data = await sendRequest<Array<{ id: number; name: string }>>(
        "http://localhost:8089/api/users/rent-users",
        requestOptions,
        navigate,
        logout
      );

      const userOptions = data.map((user) => ({
        value: user.id,
        label: user.name,
      }));
      setUsers(userOptions);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [navigate, logout]);

  useEffect(() => {
    fetchBooks();
    fetchUsers();
  }, [fetchBooks, fetchUsers]);

  const handleRentOut = async () => {
    if (!selectedBook || !selectedUser || !returnDate) {
      alert(t("rentOut.fillAllFields"));
      return;
    }

    const requestOptions: SendRequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookId: selectedBook.value,
        userId: selectedUser.value,
        rentalStartDate: new Date().toISOString(), // Include the current date and time
        returnDate,
      }),
    };

    try {
      await sendRequest(
        "http://localhost:8081/api/books/rent",
        requestOptions,
        navigate,
        logout
      );
      alert(t("rentOut.success"));
      // Optionally, reset the form
      setSelectedBook(null);
      setSelectedUser(null);
      setReturnDate("");
      setRentalStartDate(new Date().toISOString().split("T")[0]); // Reset the date to now
    } catch (error) {
      console.error("Error renting book:", error);
    }
  };

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Flex direction="column" align="center" justify="center" p={4} flex="1">
        <Heading as="h1" size="xl" color="teal.500" mb="4">
          {t("rentOut.title")}
        </Heading>
        <VStack spacing="4" width="100%" maxW="600px">
          <FormControl isRequired>
            <FormLabel htmlFor="book">{t("rentOut.selectBook")}</FormLabel>
            <Select
              id="book"
              options={books}
              value={selectedBook}
              onChange={(option) => setSelectedBook(option as Option)}
              placeholder={t("rentOut.bookPlaceholder")}
              styles={{
                control: (base) => ({
                  ...base,
                  background: inputBgColor,
                  color: "black",
                }),
              }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="user">{t("rentOut.selectUser")}</FormLabel>
            <Select
              id="user"
              options={users}
              value={selectedUser}
              onChange={(option) => setSelectedUser(option as Option)}
              placeholder={t("rentOut.userPlaceholder")}
              styles={{
                control: (base) => ({
                  ...base,
                  background: inputBgColor,
                  color: "black",
                }),
              }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="date">{t("rentOut.returnDate")}</FormLabel>
            <Input
              id="date"
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              bg={inputBgColor}
            />
          </FormControl>
          <Button colorScheme="teal" onClick={handleRentOut}>
            {t("rentOut.rentOutButton")}
          </Button>
        </VStack>
      </Flex>
    </Box>
  );
};

export default RentOut;
