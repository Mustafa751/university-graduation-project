import React, { useState, useEffect, useCallback } from "react";
import {
  InputGroup,
  InputRightElement,
  Flex,
  Heading,
  SimpleGrid,
  Box,
  Spinner,
  Input,
  Text,
  Image,
  VStack,
  Button,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import { BookData } from "../interfaces/userInterfaces";
import { SendRequestOptions, sendRequest } from "../hooks/http";
import { useAuth } from "../auth/AuthContext";
import { BookKnowledgeArea } from "../interfaces/userInterfaces";
import { useTranslation } from "react-i18next";

function Book({ id, name, quantity, mainImage }: BookData) {
  const navigate = useNavigate();

  return (
    <Box
      p="4"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      cursor="pointer"
      onClick={() => navigate(`/book/${id}`)}
    >
      <Image src={`data:image/jpeg;base64,${mainImage}`} alt={name} />
      <Text mt="2" fontWeight="semibold">
        {name}
      </Text>
      <Text color="gray.500">{quantity} readers</Text>
    </Box>
  );
}

function ReadersPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [books, setBooks] = useState<BookData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<BookData[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    const requestOptions: SendRequestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const data = await sendRequest<Array<BookData>>(
        `http://localhost:8081/api/books?knowledgeArea=${BookKnowledgeArea.Reader}&page=1&limit=100`,
        requestOptions,
        navigate,
        logout
      );

      setBooks(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [navigate, logout]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (query.length < 3) return;

      const requestOptions: SendRequestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const data = await sendRequest<Array<BookData>>(
          `http://localhost:8081/api/books/search?knowledgeArea=${BookKnowledgeArea.Reader}&query=${query}`,
          requestOptions,
          navigate,
          logout
        );

        setSearchResults(data);
        setIsSearching(true);
      } catch (error) {
        console.error("Error searching books:", error);
      }
    }, 500),
    [navigate, logout]
  );

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    } else {
      setIsSearching(false);
    }
  }, [searchTerm, debouncedSearch]);

  return (
    <Flex direction="row" minH="100vh">
      <Flex
        direction="column"
        bg="teal.500"
        color="white"
        p="6"
        width="250px"
        minH="100vh"
        boxShadow="md"
      >
        <VStack align="flex-start" spacing={4}>
          <Button
            variant="link"
            color="white"
            onClick={() => navigate("/books")}
            fontSize="lg"
          >
            {t("menu.books")}
          </Button>
          <Button
            variant="link"
            color="white"
            onClick={() => navigate("/articles")}
            fontSize="lg"
          >
            {t("menu.articles")}
          </Button>
          <Button
            variant="link"
            color="white"
            onClick={() => navigate("/periodicals")}
            fontSize="lg"
          >
            {t("menu.periodicals")}
          </Button>
          <Button
            variant="link"
            color="white"
            onClick={() => navigate("/readers")}
            fontSize="lg"
          >
            {t("menu.readers")}
          </Button>
        </VStack>
      </Flex>
      <Flex direction="column" align="center" minH="100vh" p="4" flex="1">
        <Heading as="h1" size="xl" color="teal.500" mb="4">
          {t("readersPage.title")}
        </Heading>
        <Flex
          justify="flex-end"
          width="100%"
          paddingRight="4"
          paddingBottom="4"
        >
          <InputGroup width="300px">
            <Input
              placeholder={t("readersPage.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputRightElement children={<SearchIcon color="gray.500" />} />
          </InputGroup>
        </Flex>
        <Flex
          direction="column"
          align="center"
          justify="center"
          bg="gray.100"
          p="6"
          borderRadius="xl"
          w="100%"
          maxW="1200px"
          mt="4"
          overflowY="auto"
        >
          <SimpleGrid columns={4} spacing={4}>
            {(isSearching ? searchResults : books).map((book, index) => (
              <Book key={`${book.id}-${index}`} {...book} />
            ))}
          </SimpleGrid>
          {loading && <Spinner color="teal.500" mt="4" />}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ReadersPage;
