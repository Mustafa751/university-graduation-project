import React, { useState, useEffect, useCallback } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Box,
  useColorModeValue,
  Container,
  Text,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { SendRequestOptions, sendRequest } from "../hooks/http";
import { useAuth } from "../auth/AuthContext";
import { useTranslation } from "react-i18next";

interface UnreturnedBook {
  bookId: number;
  bookName: string;
  author: string;
  inventoryNumber: string;
  signature: string;
  rentalStartDate: string;
  rentalEndDate: string;
}

const UserBooks: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [books, setBooks] = useState<UnreturnedBook[]>([]);
  const bg = useColorModeValue("white", "gray.800"); // Adapting based on theme
  const color = useColorModeValue("gray.600", "white");
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const fetchBooks = useCallback(async () => {
    const requestOptions: SendRequestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const data = await sendRequest<UnreturnedBook[]>(
        `http://localhost:8089/api/users/${userId}/unreturned-books`,
        requestOptions,
        navigate,
        logout
      );
      setBooks(data);
    } catch (error) {
      console.error("Error fetching unreturned books:", error);
    }
  }, [userId, navigate, logout]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleReturn = async (bookId: number) => {
    const requestOptions: SendRequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await sendRequest(
        `http://localhost:8089/api/users/${userId}/return-book/${bookId}`,
        requestOptions,
        navigate,
        logout
      );
      setBooks((prevBooks) =>
        prevBooks.filter((book) => book.bookId !== bookId)
      );
    } catch (error) {
      console.error("Error returning book:", error);
    }
  };

  return (
    <Flex direction="column" minHeight="100vh">
      <Box flex="1" py="6">
        <Container maxWidth="container.xl">
          <Text fontSize="xl" mb="4" fontWeight="bold" color={color}>
            {t("userBooks.unreturnedBooks")}
          </Text>
          <TableContainer bg={bg} borderRadius="lg" boxShadow="base" p="4">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>{t("userBooks.bookName")}</Th>
                  <Th>{t("userBooks.author")}</Th>
                  <Th>{t("userBooks.inventoryNumber")}</Th>
                  <Th>{t("userBooks.signature")}</Th>
                  <Th>{t("userBooks.rentalStartDate")}</Th>
                  <Th>{t("userBooks.rentalEndDate")}</Th>
                  <Th>{t("userBooks.actions")}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {books.map((book) => (
                  <Tr key={book.bookId}>
                    <Td>{book.bookName}</Td>
                    <Td>{book.author}</Td>
                    <Td>{book.inventoryNumber}</Td>
                    <Td>{book.signature}</Td>
                    <Td>
                      {new Date(book.rentalStartDate).toLocaleDateString()}
                    </Td>
                    <Td>{new Date(book.rentalEndDate).toLocaleDateString()}</Td>
                    <Td>
                      <Tooltip
                        label={t("userBooks.returnBook")}
                        aria-label={t("userBooks.returnBook")}
                      >
                        <Button
                          size="sm"
                          colorScheme="teal"
                          onClick={() => handleReturn(book.bookId)}
                        >
                          {t("userBooks.return")}
                        </Button>
                      </Tooltip>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </Flex>
  );
};

export default UserBooks;
