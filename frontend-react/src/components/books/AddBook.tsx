// Import React, useState, and Chakra UI components
import React, { ChangeEvent, useState } from "react";
import {
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Flex,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import Navbar from "../common/Navbar"; // Adjust the import path as needed
import Footer from "../common/Footer"; // Adjust the import path as needed

const AddBook = () => {
  // State hooks for form fields
  const [isbn, setIsbn] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<FileList | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("isbn", isbn);
    formData.append("title", title);
    formData.append("date", date);
    formData.append("author", author);
    formData.append("description", description);
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }
    if (pdf) {
      formData.append("pdf", pdf);
    }

    // Placeholder for where you would send formData to the server
    console.log("Form Data Submitted", formData);
  };

  // Handle image file upload
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      setImages(event.target.files);
    }
  };

  // Handle PDF file upload
  const handlePdfUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      setPdf(event.target.files[0]);
    }
  };

  const formBgColor = useColorModeValue("gray.50", "gray.700");
  const inputBgColor = useColorModeValue("white", "gray.800");

  return (
    <Flex direction="column" minHeight="100vh">
      <Navbar />
      <Flex direction="column" align="center" justify="center" flex="1" pt={10}>
        <Text fontSize="2xl" fontWeight="bold" mb={5}>
          Add a New Book
        </Text>
        <Box
          as="form"
          onSubmit={handleSubmit}
          bg={formBgColor}
          p={8}
          borderRadius="lg"
          boxShadow="xl"
          width={{ base: "90%", md: "500px" }}
          mb={10} // Adjust as needed to manage the space
        >
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel htmlFor="isbn">ISBN</FormLabel>
              <Input
                id="isbn"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="date">Date of Production</FormLabel>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="author">Author</FormLabel>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="images">Images</FormLabel>
              <Input
                id="images"
                type="file"
                multiple
                onChange={handleImageUpload}
                accept="image/*"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="pdf">PDF</FormLabel>
              <Input
                id="pdf"
                type="file"
                onChange={handlePdfUpload}
                accept=".pdf"
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full" mt={4}>
              Submit
            </Button>
          </VStack>
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
};
export default AddBook;
