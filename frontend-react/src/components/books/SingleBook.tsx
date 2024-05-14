import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Flex,
  Heading,
  VStack,
  Image,
  IconButton,
  Text,
  Button,
  SimpleGrid,
  GridItem,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { SendRequestOptions, sendRequest } from "../hooks/http";
import { useAuth } from "../auth/AuthContext";

interface BookData {
  id: number;
  isbn: string;
  author: string;
  productionDate: string;
  quantity: number;
  description: string;
  images: string[];
}

function BookDetails({ bookData }: { bookData: BookData }) {
  return (
    <VStack align="start" spacing="4" fontSize="lg">
      <Heading as="h2" size="lg" color="teal.500">
        Book Details
      </Heading>
      <SimpleGrid columns={2} spacingX="40px" spacingY="20px" w="100%">
        <GridItem>
          <Text fontWeight="bold">ISBN:</Text>
          <Text>{bookData.isbn}</Text>
        </GridItem>
        <GridItem>
          <Text fontWeight="bold">Author:</Text>
          <Text>{bookData.author}</Text>
        </GridItem>
        <GridItem>
          <Text fontWeight="bold">Production Date:</Text>
          <Text>{bookData.productionDate}</Text>
        </GridItem>
        <GridItem>
          <Text fontWeight="bold">Quantity:</Text>
          <Text>{bookData.quantity}</Text>
        </GridItem>
      </SimpleGrid>
      <Text fontWeight="bold">Description:</Text>
      <Text>{bookData.description}</Text>
      <Button colorScheme="teal" variant="solid" w="100%">
        Download
      </Button>
    </VStack>
  );
}

function SingleBook() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { id } = useParams(); // Get the book id from the URL
  const [bookData, setBookData] = useState<BookData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { logout } = useAuth();
  const navigate = useNavigate();
  const imageSize = useBreakpointValue({ base: "100%", md: "300px" });
  const hoverBgColor = useColorModeValue("gray.100", "gray.700");

  const fetchBook = useCallback(async () => {
    setLoading(true);
    const requestOptions: SendRequestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const data = await sendRequest<BookData>(
        `http://localhost:8081/api/books/${id}`, // Endpoint to fetch single book by id
        requestOptions,
        navigate,
        logout
      );
      setBookData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [id, navigate, logout]);

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  if (loading || !bookData) return <div>Loading...</div>;

  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % bookData.images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => {
      return prevIndex === 0 ? bookData.images.length - 1 : prevIndex - 1;
    });
  };

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="center"
        p={4}
        maxW="1200px"
        mx="auto"
        flex="1"
        mb="10vh"
        gap={4}
      >
        {/* Image carousel container */}
        <Flex align="center" justify="center" position="relative">
          <IconButton
            aria-label="Previous image"
            icon={<ChevronLeftIcon />}
            onClick={prevImage}
            position="absolute"
            left={0}
            zIndex="2"
            variant="ghost"
            _hover={{ bg: hoverBgColor }}
          />
          <Image
            src={`data:image/jpeg;base64,${bookData.images[currentImageIndex]}`}
            boxSize={imageSize}
            objectFit="cover"
            boxShadow="lg"
            borderRadius="lg"
            m={2}
          />
          <IconButton
            aria-label="Next image"
            icon={<ChevronRightIcon />}
            onClick={nextImage}
            position="absolute"
            right={0}
            zIndex="2"
            variant="ghost"
            _hover={{ bg: hoverBgColor }}
          />
        </Flex>
        <Box flexGrow={1} ml={{ md: "8" }} mt={{ base: "4", md: "0" }}>
          <BookDetails bookData={bookData} />
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
}

export default SingleBook;
