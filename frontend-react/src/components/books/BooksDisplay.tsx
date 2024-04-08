import { useState, useEffect, useCallback, useRef } from "react";
import {
  InputGroup,
  InputRightElement,
  Flex,
  Heading,
  SimpleGrid,
  Box,
  Image,
  Text,
  Spinner,
  Input,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
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
  const [books, setBooks] = useState<BookData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<BookData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const observer = useRef<IntersectionObserver>();
  const sentinelRef = useRef<HTMLDivElement>(null);

  const fetchBooks = useCallback(() => {
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
        setBooks((prevBooks) => [...prevBooks, ...newBooks]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const debouncedSearch = useCallback(
    debounce((query) => {
      const filtered = books.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
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

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    });

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
