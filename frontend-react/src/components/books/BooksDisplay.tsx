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
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { debounce, throttle } from "lodash";
import { useNavigate } from "react-router-dom";
import { BookData } from "../interfaces/userInterfaces";
import { SendRequestOptions, sendRequest } from "../hooks/http";
import { useAuth } from "../auth/AuthContext";

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

function BooksDisplay() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [books, setBooks] = useState<BookData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
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
        `http://localhost:8081/api/books?page=${page}&limit=10`, // Updated URL with pagination parameters
        requestOptions,
        navigate,
        logout
      );

      const newBooks = data.map((item: BookData) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        mainImage: item.mainImage,
      }));

      setBooks((prevBooks) => {
        // Only add new books if they are not already in the list
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
    fetchBooks(); // Fetch books when the component mounts or when page changes
  }, [fetchBooks, page]);

  const debouncedSearch = useCallback(
    debounce((query) => {
      const filtered = books.filter((book) =>
        book.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setIsSearching(true);
    }, 300),
    [books]
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
    <Flex direction="column" align="center" minH="100vh" p="4">
      <Heading as="h1" size="xl" color="teal.500" mb="4">
        Dashboard
      </Heading>
      <Flex justify="flex-end" width="100%" paddingRight="4" paddingBottom="4">
        <InputGroup width="300px">
          <Input
            placeholder="Search by title..."
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
  );
}

export default BooksDisplay;
