import React, { useState, useEffect, useCallback, useRef } from "react";
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
  Select,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { debounce, throttle } from "lodash";
import { useNavigate } from "react-router-dom";
import { BookData } from "../interfaces/userInterfaces";
import { SendRequestOptions, sendRequest } from "../hooks/http";
import { useAuth } from "../auth/AuthContext";
import { useTranslation } from "react-i18next";

function Book({
  id,
  name,
  author,
  quantity,
  mainImage,
  price,
  knowledgeArea,
  language,
}: BookData) {
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
        {name} {author ? `by ${author}` : ""}
      </Text>
      <Text color="gray.500">
        {quantity} {quantity === 1 ? "available" : "available"}
      </Text>
      <Text color="gray.500">Price: {price}</Text>
      <Text color="gray.500">Knowledge Area: {knowledgeArea}</Text>
      <Text color="gray.500">Language: {language}</Text>
    </Box>
  );
}

function BooksDisplay() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [books, setBooks] = useState<BookData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchBy, setSearchBy] = useState<string>("title"); // New state for search criteria
  const [searchResults, setSearchResults] = useState<BookData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isFetching = useRef<boolean>(false);

  const fetchBooks = useCallback(async () => {
    if (isFetching.current) return;
    isFetching.current = true;
    setLoading(true);
    const requestOptions: SendRequestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const data = await sendRequest<Array<BookData>>(
        `http://localhost:8081/api/books?page=${page}&limit=10`,
        requestOptions,
        navigate,
        logout
      );

      const newBooks = data.map((item: BookData) => ({
        id: item.id,
        name: item.name,
        author: item.author, // Ensure this field is populated
        quantity: item.quantity,
        mainImage: item.mainImage,
        price: item.price,
        knowledgeArea: item.knowledgeArea,
        language: item.language,
      }));

      setBooks((prevBooks) => {
        const existingBookIds = new Set(prevBooks.map((book) => book.id));
        const filteredBooks = newBooks.filter(
          (book) => !existingBookIds.has(book.id)
        );
        return [...prevBooks, ...filteredBooks];
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      isFetching.current = false;
      setLoading(false);
    }
  }, [page, navigate, logout]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks, page]);

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
          `http://localhost:8081/api/books/search?query=${query}&searchBy=${searchBy}`,
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
    [navigate, logout, searchBy]
  );

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    } else {
      setIsSearching(false);
    }
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(
      throttle((entries) => {
        if (entries[0].isIntersecting && !loading && !isFetching.current) {
          setPage((prevPage) => prevPage + 1);
        }
      }, 1000),
      { threshold: 1.0 }
    );

    if (sentinelRef.current) {
      observer.current.observe(sentinelRef.current);
    }

    return () => observer.current?.disconnect();
  }, [loading]);

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
            {t("booksDisplay.books")}
          </Button>
          <Button
            variant="link"
            color="white"
            onClick={() => navigate("/articles")}
            fontSize="lg"
          >
            {t("booksDisplay.articles")}
          </Button>
          <Button
            variant="link"
            color="white"
            onClick={() => navigate("/periodicals")}
            fontSize="lg"
          >
            {t("booksDisplay.periodicals")}
          </Button>
          <Button
            variant="link"
            color="white"
            onClick={() => navigate("/readers")}
            fontSize="lg"
          >
            {t("booksDisplay.readers")}
          </Button>
          <Button
            variant="link"
            color="white"
            onClick={() => navigate("/graduation-theses")}
            fontSize="lg"
          >
            {t("booksDisplay.graduationTheses")}
          </Button>
          <Button
            variant="link"
            color="white"
            onClick={() => navigate("/dissertations")}
            fontSize="lg"
          >
            {t("booksDisplay.dissertations")}
          </Button>
        </VStack>
      </Flex>
      <Flex direction="column" align="center" minH="100vh" p="4" flex="1">
        <Heading as="h1" size="xl" color="teal.500" mb="4">
          {t("booksDisplay.title")}
        </Heading>
        <Flex
          justify="flex-end"
          width="100%"
          paddingRight="4"
          paddingBottom="4"
        >
          <InputGroup width="300px" mr="4">
            <Select
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
              bg="white"
            >
              <option value="title">{t("booksDisplay.searchByTitle")}</option>
              <option value="author">{t("booksDisplay.searchByAuthor")}</option>
              <option value="topic">{t("booksDisplay.searchByTopic")}</option>
            </Select>
          </InputGroup>
          <InputGroup width="300px">
            <Input
              placeholder={t("booksDisplay.searchPlaceholder", { searchBy })}
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
          <div ref={sentinelRef}></div>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default BooksDisplay;
