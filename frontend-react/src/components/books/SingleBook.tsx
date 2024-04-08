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
import { useState } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

interface BookData {
  isbn: string;
  author: string;
  productionDate: string;
  quantity: number;
  description: string;
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

  // Ensure the nextImage and prevImage functions correctly update the state
  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % dummyBookData.images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => {
      return prevIndex === 0 ? dummyBookData.images.length - 1 : prevIndex - 1;
    });
  };

  const imageSize = useBreakpointValue({ base: "100%", md: "300px" });

  // Color mode value for hover effects
  const hoverBgColor = useColorModeValue("gray.100", "gray.700");

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="center"
        p={4}
        maxW="1200px" // Adjust for a wider max width
        mx="auto"
        flex="1"
        mb="10vh"
        gap={4} // Added gap for spacing between elements
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
            // Added hover effect
            _hover={{ bg: hoverBgColor }}
          />
          <Image
            src={dummyBookData.images[currentImageIndex]}
            boxSize={imageSize}
            objectFit="cover"
            boxShadow="lg" // Enhanced shadow for depth
            borderRadius="lg" // Rounded corners
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
            // Added hover effect
            _hover={{ bg: hoverBgColor }}
          />
        </Flex>
        <Box flexGrow={1} ml={{ md: "8" }} mt={{ base: "4", md: "0" }}>
          <BookDetails bookData={dummyBookData} />
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
}

export default SingleBook;
