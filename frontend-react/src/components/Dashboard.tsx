import { useState, useEffect } from "react";
import {
  ChakraProvider,
  Flex,
  Heading,
  SimpleGrid,
  Box,
  Image,
  Text,
  Spinner,
  Input,
} from "@chakra-ui/react";
import { debounce } from "lodash";
import React from "react";

interface BookData {
  id: number;
  title: string;
  count: number;
  imageUrl: string;
}

function Book({ title, count, imageUrl }: BookData) {
  return (
    <Box p="4" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={imageUrl} alt={title} />
      <Text mt="2" fontWeight="semibold">
        {title}
      </Text>
      <Text color="gray.500">{count}</Text>
    </Box>
  );
}

function fetchBooks(page = 1) {
  return fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => ({
      books: data.map((item) => ({
        id: item.id,
        title: item.title,
        count: Math.floor(Math.random() * 1000), // Random count for demonstration
        imageUrl: item.url, // Use image URL from JSONPlaceholder API
      })),
      hasMore: page < 10, // Limit to 10 pages for demonstration
    }));
}

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<BookData[]>([]);

  useEffect(() => {
    setLoading(true);
    fetchBooks(page)
      .then((data) => {
        setFilteredBooks((prevBooks) => [...prevBooks, ...data.books]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    // Debounce the search term with a delay of 1 second
    const debouncedSearch = debounce(() => {
      const filtered = filteredBooks.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
    }, 1000);

    // Execute the debounced search when searchTerm changes
    if (searchTerm.length >= 3) {
      debouncedSearch();
    } else {
      // If the search term is less than 3 characters, reset the filtered books
      fetchBooks(page).then((data) => {
        setFilteredBooks(data.books);
      });
    }

    return () => {
      // Cleanup the debounced function
      debouncedSearch.cancel();
    };
  }, [searchTerm, page]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollHeight - scrollTop === clientHeight && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <Flex direction="column" align="center" minH="100vh" p="4">
      <Heading as="h1" size="xl" color="teal.500" mb="4">
        Dashboard
      </Heading>
      <Input
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb="4"
      />
      <Flex
        direction="column"
        align="center"
        justify="center"
        bg="gray.100"
        p="6"
        borderRadius="xl"
        w="100%"
        maxW="1200px" // Make the container wider
        mt="4"
        overflowY="auto" // Allow vertical overflow scrolling
        onScroll={handleScroll}
      >
        <SimpleGrid columns={4} spacing={4}>
          {filteredBooks.map((book) => (
            <Book
              key={book.id}
              title={book.title}
              count={book.count}
              imageUrl={book.imageUrl}
              id={0}
            />
          ))}
        </SimpleGrid>
        {loading && <Spinner color="teal.500" mt="4" />}
      </Flex>
    </Flex>
  );
}

function Navbar() {
  return (
    <Flex justify="space-between" p="4" bg="teal.500" color="white">
      <Heading as="h1" size="lg">
        Navbar
      </Heading>
    </Flex>
  );
}

function Footer() {
  return (
    <Flex justify="center" p="4" bg="teal.500" color="white">
      <Heading as="h6" size="sm">
        Footer
      </Heading>
    </Flex>
  );
}

function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <Dashboard />
      <Footer />
    </ChakraProvider>
  );
}

export default App;
