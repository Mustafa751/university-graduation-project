import { useState, useEffect, useCallback, useRef } from "react";
import {
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

interface ApiResponseItem {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

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
      <Text color="gray.500">{count} readers</Text>
    </Box>
  );
}

function BooksDisplay() {
  const [loading, setLoading] = useState<boolean>(false);
  const [allBooks, setAllBooks] = useState<BookData[]>([]);
  const [displayCount, setDisplayCount] = useState<number>(10);
  const [displayBooks, setDisplayBooks] = useState<BookData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const observer = useRef<IntersectionObserver>();
  const sentinelRef = useRef<HTMLDivElement>(null);

  const fetchBooks = useCallback((page: number) => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`)
      .then((response) => response.json())
      .then((data: ApiResponseItem[]) => {
        const newBooks = data.map((item) => ({
          id: item.id,
          title: item.title,
          count: Math.floor(Math.random() * 1000),
          imageUrl: item.url,
        }));
        setAllBooks((prevBooks) => [...prevBooks, ...newBooks]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchBooks(page);
  }, [page, fetchBooks]);

  useEffect(() => {
    setDisplayBooks(allBooks.slice(0, displayCount));
  }, [allBooks, displayCount]);

  const debouncedSearch = useCallback(
    debounce((search) => {
      const filtered = allBooks.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase())
      );
      setDisplayBooks(filtered);
    }, 300),
    [allBooks]
  );

  useEffect(() => {
    if (searchTerm.length >= 3) {
      debouncedSearch(searchTerm);
    } else if (searchTerm.length === 0) {
      setDisplayBooks(allBooks.slice(0, displayCount));
    }
  }, [searchTerm, debouncedSearch, allBooks, displayCount]);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }
  
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        if (allBooks.length === displayCount) {
          setPage((prevPage) => prevPage + 1); // Fetch more books if needed
        } else {
          setDisplayCount((prevCount) => prevCount + 10); // Just display more books if we have them
        }
      }
    });
  
    if (sentinelRef.current) {
      observer.current.observe(sentinelRef.current);
    }
  
    return () => observer.current?.disconnect();
  }, [loading, allBooks.length, displayCount]);

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
        maxW="1200px"
        mt="4"
        overflowY="auto"
      >
        <SimpleGrid columns={4} spacing={4}>
          {displayBooks.map((book, index) => (
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
