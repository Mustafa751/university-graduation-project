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
  NumberInput,
  NumberInputField,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { sendRequest } from "../hooks/http";

const AddBook = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [otherImages, setOtherImages] = useState<FileList | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("isbn", isbn);
    formData.append("title", title);
    formData.append("date", date);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("quantity", quantity);
    if (mainImage) {
      formData.append("mainImage", mainImage);
    }
    if (otherImages) {
      for (let i = 0; i < otherImages.length; i++) {
        formData.append("images", otherImages[i]);
      }
    }
    if (pdf) {
      formData.append("pdf", pdf);
    }

    // Note: Do not JSON.stringify(formData)
    const requestOptions = {
      method: "POST",
      body: formData, // Directly use formData here
    };

    sendRequest<Response>(
      "http://localhost:8081/api/books",
      requestOptions,
      navigate,
      logout
    )
      .then((response: Response) => {
        if (response.ok) {
          toast({
            title: "upload successful",
            description: "uploaded successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        } else {
          alert("Failed to add book");

          response.text().then((text) => console.error(text)); // Log error message from the server
        }
      })
      .catch((error) => {
        console.error("Network or other error:", error);
      });
  };

  const handleMainImageUpload = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.files && event.target.files[0]) {
      setMainImage(event.target.files[0]);
    }
  };

  const handleOtherImagesUpload = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setOtherImages(event.target.files);
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
            <FormControl isRequired>
              <FormLabel htmlFor="quantity">Quantity</FormLabel>
              <NumberInput min={1}>
                <NumberInputField
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  bg={inputBgColor}
                />
              </NumberInput>
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
              <FormLabel htmlFor="mainImage">Main Image</FormLabel>
              <Input
                id="mainImage"
                type="file"
                onChange={handleMainImageUpload}
                accept="image/*"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="otherImages">Other Images</FormLabel>
              <Input
                id="otherImages"
                type="file"
                multiple
                onChange={handleOtherImagesUpload}
                accept="image/*"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="pdf">PDF</FormLabel>
              <Input
                id="pdf"
                type="file"
                onChange={(e) => setPdf(e.target.files && e.target.files[0])}
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
