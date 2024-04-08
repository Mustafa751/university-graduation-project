/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, useState } from "react";
import {
  ChakraProvider,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

const App = () => {
  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);

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

    fetch("http://localhost:4000/books", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  function handleImageUpload(_event: ChangeEvent<HTMLInputElement>): void {
    throw new Error("Function not implemented.");
  }

  function handlePdfUpload(_event: ChangeEvent<HTMLInputElement>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <ChakraProvider>
      <Box maxW="md" mx="auto" mt={8} p={4} borderWidth="1px" borderRadius="lg">
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>ISBN</FormLabel>
            <Input value={isbn} onChange={(e) => setIsbn(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Date of Production</FormLabel>
            <Input value={date} onChange={(e) => setDate(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Author</FormLabel>
            <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Images</FormLabel>
            <Input
              type="file"
              multiple
              onChange={handleImageUpload}
              accept="image/*"
            />
          </FormControl>
          <FormControl>
            <FormLabel>PDF</FormLabel>
            <Input type="file" onChange={handlePdfUpload} accept=".pdf" />
          </FormControl>
          <Button type="submit" mt={4} colorScheme="blue">
            Submit
          </Button>
        </form>
      </Box>
    </ChakraProvider>
  );
};

export default App;
