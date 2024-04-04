import {
  ChakraProvider,
  Box,
  Flex,
  Heading,
  VStack,
  Image,
  IconButton,
  Text,
  Grid,
  GridItem,
  Button,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useState } from "react";

interface BookData {
  isbn: string;
  author: string;
  productionDate: string;
  quantity: number;
  description: string; // Added description field to the interface
  images: string[];
}

const dummyBookData: BookData = {
  isbn: "9780132350884",
  author: "Elon Musk",
  productionDate: "March 2024",
  quantity: 10,
  description: "This is a dummy description for the book.",
  images: [
    "https://via.placeholder.com/550",
    "https://via.placeholder.com/550.png/09f/fff",
    "https://via.placeholder.com/550.jpg/09f/fff",
    "https://via.placeholder.com/550.gif/09f/fff",
  ],
};

function BookDetails({ bookData }: { bookData: BookData }) {
  return (
    <VStack align="start" spacing="4" fontSize="xl">
      <Heading as="h2" size="lg">
        Book Details
      </Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <GridItem>
          <Text>
            <strong>ISBN:</strong> {bookData.isbn}
          </Text>
          <Text>
            <strong>Author:</strong> {bookData.author}
          </Text>
          <Text>
            <strong>Production Date:</strong> {bookData.productionDate}
          </Text>
          <Text>
            <strong>Quantity:</strong> {bookData.quantity}
          </Text>
        </GridItem>
        <GridItem colSpan={2}>
          <Text>
            <strong>Description:</strong> {bookData.description}
          </Text>
          <Button colorScheme="teal" variant="solid">
            Download
          </Button>
        </GridItem>
      </Grid>
    </VStack>
  );
}
function Navbar() {
  return (
    <Flex justify="space-between" p="4" bg="teal.500" color="white" mb="4">
      <Heading as="h1" size="lg">
        Navbar
      </Heading>
    </Flex>
  );
}

function Footer() {
  return (
    <Flex
      justify="center"
      p="4"
      bg="teal.500"
      color="white"
      position="fixed"
      bottom="0"
      width="100%"
    >
      <Heading as="h6" size="sm">
        Footer
      </Heading>
    </Flex>
  );
}

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === dummyBookData.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? dummyBookData.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <ChakraProvider>
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <Navbar />
        <Flex
          direction="row"
          align="center"
          justify="center"
          p="4"
          maxW="800px"
          mx="auto"
          flex="1"
          mb="30vh" // Move content further up
          ml="20%" // Move content to the left
        >
          <IconButton
            aria-label="Previous image"
            icon={<ChevronLeftIcon />}
            onClick={prevImage}
            alignSelf="center"
            mr="4"
          />
          <Image
            src={dummyBookData.images[currentImageIndex]}
            mb="2"
            maxW="900px" // Make the image three times bigger
            maxH="900px" // Make the image three times bigger
            objectFit="cover"
          />
          <IconButton
            aria-label="Next image"
            icon={<ChevronRightIcon />}
            onClick={nextImage}
            alignSelf="center"
            ml="4"
          />
          <Box ml="8" fontSize="2xl">
            <BookDetails bookData={dummyBookData} />
          </Box>
        </Flex>
        <Footer />
      </Box>
    </ChakraProvider>
  );
}

export default App;
