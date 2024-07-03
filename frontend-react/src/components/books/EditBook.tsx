import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Box,
  NumberInput,
  NumberInputField,
  useColorModeValue,
  useToast,
  Textarea,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { sendRequest } from "../hooks/http";
import { BookKnowledgeArea, BookDetails } from "../interfaces/userInterfaces";
import { topics } from "../topics"; // Import topics from the new file
import { useTranslation } from "react-i18next";

const EditBook = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const toast = useToast();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [, setBook] = useState<BookDetails | null>(null);

  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [otherImages, setOtherImages] = useState<FileList | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);
  const [inventoryNumber, setInventoryNumber] = useState("");
  const [signature, setSignature] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [parallelTitle, setParallelTitle] = useState("");
  const [edition, setEdition] = useState("");
  const [placeOfPublication, setPlaceOfPublication] = useState("");
  const [publisher, setPublisher] = useState("");
  const [language, setLanguage] = useState("");
  const [sourceTitle, setSourceTitle] = useState("");
  const [volume, setVolume] = useState("");
  const [issueNumber, setIssueNumber] = useState("");
  const [pages, setPages] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [notes, setNotes] = useState("");
  const [price, setPrice] = useState("");
  const [keywords, setKeywords] = useState("");
  const [classificationIndex, setClassificationIndex] = useState("");
  const [knowledgeArea, setKnowledgeArea] = useState<BookKnowledgeArea>(
    BookKnowledgeArea.Book
  );
  const [documentType, setDocumentType] = useState<BookKnowledgeArea>(
    BookKnowledgeArea.Book
  );
  const [topic, setTopic] = useState(""); // New state for topic
  const [barcode, setBarcode] = useState(""); // New state for barcode
  const [locationInLibrary, setLocationInLibrary] = useState(""); // New state for location in library

  useEffect(() => {
    const fetchBook = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const data = await sendRequest<BookDetails>(
          `http://localhost:8081/api/books/${id}`,
          requestOptions,
          navigate,
          logout
        );
        setBook(data);
        setIsbn(data.isbn);
        setTitle(data.name);
        setDate(new Date(data.productionDate).toISOString().split("T")[0]);
        setAuthor(data.author);
        setDescription(data.description);
        setQuantity(data.quantity.toString());
        setSubtitle(data.subtitle);
        setParallelTitle(data.parallelTitle);
        setEdition(data.edition);
        setPlaceOfPublication(data.placeOfPublication);
        setPublisher(data.publisher);
        setLanguage(data.language);
        setSourceTitle(data.sourceTitle);
        setVolume(data.volume);
        setIssueNumber(data.issueNumber);
        setPages(data.pages);
        setPublicationYear(data.publicationYear);
        setNotes(data.notes);
        setPrice(data.price);
        setKeywords(data.keywords);
        setClassificationIndex(data.classificationIndex);
        setKnowledgeArea(data.knowledgeArea);
        setDocumentType(data.documentType);
        setInventoryNumber(data.inventoryNumber);
        setSignature(data.signature);
        setTopic(data.topic);
        setBarcode(data.barcode);
        setLocationInLibrary(data.locationInLibrary);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };
    fetchBook();
  }, [id, navigate, logout]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("isbn", isbn);
    formData.append("title", title);
    formData.append("date", date);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("subtitle", subtitle);
    formData.append("parallelTitle", parallelTitle);
    formData.append("edition", edition);
    formData.append("placeOfPublication", placeOfPublication);
    formData.append("publisher", publisher);
    formData.append("language", language);
    formData.append("sourceTitle", sourceTitle);
    formData.append("volume", volume);
    formData.append("issueNumber", issueNumber);
    formData.append("pages", pages);
    formData.append("publicationYear", publicationYear);
    formData.append("notes", notes);
    formData.append("price", price);
    formData.append("keywords", keywords);
    formData.append("classificationIndex", classificationIndex);
    formData.append("knowledgeArea", knowledgeArea);
    formData.append("documentType", documentType);
    formData.append("inventoryNumber", inventoryNumber);
    formData.append("signature", signature);
    formData.append("topic", topic);
    formData.append("barcode", barcode);
    formData.append("locationInLibrary", locationInLibrary);

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

    const requestOptions = {
      method: "PUT",
      body: formData,
    };

    sendRequest<Response>(
      `http://localhost:8081/api/books/${id}`,
      requestOptions,
      navigate,
      logout
    )
      .then((response: Response) => {
        if (response.ok) {
          toast({
            title: t("editBook.updateSuccessful"),
            description: t("editBook.bookUpdatedSuccessfully"),
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        } else {
          alert(t("editBook.updateFailed"));

          response.text().then((text) => console.error(text)); // Log error message from the server
        }
      })
      .catch((error) => {
        console.error(t("editBook.networkOrOtherError"), error);
      });
  };

  const handleFileUpload = (
    event: ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ): void => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleMultipleFilesUpload = (
    event: ChangeEvent<HTMLInputElement>,
    setFiles: React.Dispatch<React.SetStateAction<FileList | null>>
  ): void => {
    setFiles(event.target.files);
  };

  const formBgColor = useColorModeValue("gray.50", "gray.700");
  const inputBgColor = useColorModeValue("white", "gray.800");

  return (
    <Flex direction="column" minHeight="100vh">
      <Flex direction="column" align="center" justify="center" flex="1" pt={10}>
        <Text fontSize="2xl" fontWeight="bold" mb={5}>
          {t("editBook.title")}
        </Text>
        <Box
          as="form"
          onSubmit={handleSubmit}
          bg={formBgColor}
          p={8}
          borderRadius="lg"
          boxShadow="xl"
          width={{ base: "90%", md: "800px" }}
        >
          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
            <FormControl>
              <FormLabel htmlFor="isbn">{t("editBook.isbn")}</FormLabel>
              <Input
                id="isbn"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="barcode">{t("editBook.barcode")}</FormLabel>
              <Input
                id="barcode"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="title">{t("editBook.titleLabel")}</FormLabel>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="inventoryNumber">
                {t("editBook.inventoryNumber")}
              </FormLabel>
              <Input
                id="inventoryNumber"
                value={inventoryNumber}
                onChange={(e) => setInventoryNumber(e.target.value)}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="signature">
                {t("editBook.signature")}
              </FormLabel>
              <Input
                id="signature"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="date">
                {t("editBook.dateOfProduction")}
              </FormLabel>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="author">{t("editBook.author")}</FormLabel>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="subtitle">{t("editBook.subtitle")}</FormLabel>
              <Input
                id="subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="parallelTitle">
                {t("editBook.parallelTitle")}
              </FormLabel>
              <Input
                id="parallelTitle"
                value={parallelTitle}
                onChange={(e) => setParallelTitle(e.target.value)}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="edition">{t("editBook.edition")}</FormLabel>
              <Input
                id="edition"
                value={edition}
                onChange={(e) => setEdition(e.target.value)}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="placeOfPublication">
                {t("editBook.placeOfPublication")}
              </FormLabel>
              <Input
                id="placeOfPublication"
                value={placeOfPublication}
                onChange={(e) => setPlaceOfPublication(e.target.value)}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="publisher">
                {t("editBook.publisher")}
              </FormLabel>
              <Input
                id="publisher"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="language">{t("editBook.language")}</FormLabel>
              <Input
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="sourceTitle">
                {t("editBook.sourceTitle")}
              </FormLabel>
              <Input
                id="sourceTitle"
                value={sourceTitle}
                onChange={(e) => setSourceTitle(e.target.value)}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="volume">{t("editBook.volume")}</FormLabel>
              <Input
                id="volume"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="issueNumber">
                {t("editBook.issueNumber")}
              </FormLabel>
              <Input
                id="issueNumber"
                value={issueNumber}
                onChange={(e) => setIssueNumber(e.target.value)}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="pages">{t("editBook.pages")}</FormLabel>
              <Input
                id="pages"
                value={pages}
                onChange={(e) => setPages(e.target.value)}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="publicationYear">
                {t("editBook.publicationYear")}
              </FormLabel>
              <Input
                id="publicationYear"
                value={publicationYear}
                onChange={(e) => setPublicationYear(e.target.value)}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="notes">{t("editBook.notes")}</FormLabel>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="price">{t("editBook.price")}</FormLabel>
              <Input
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="keywords">{t("editBook.keywords")}</FormLabel>
              <Input
                id="keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="classificationIndex">
                {t("editBook.classificationIndex")}
              </FormLabel>
              <Input
                id="classificationIndex"
                value={classificationIndex}
                onChange={(e) => setClassificationIndex(e.target.value)}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="knowledgeArea">
                {t("editBook.knowledgeArea")}
              </FormLabel>
              <Select
                id="knowledgeArea"
                value={knowledgeArea}
                onChange={(e) =>
                  setKnowledgeArea(e.target.value as BookKnowledgeArea)
                }
                bg={inputBgColor}
              >
                {Object.values(BookKnowledgeArea).map((area) => (
                  <option key={area} value={area}>
                    {t(`addBook.${area.toLowerCase()}`)}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="documentType">
                {t("editBook.documentType")}
              </FormLabel>
              <Select
                id="documentType"
                value={documentType}
                onChange={(e) =>
                  setDocumentType(e.target.value as BookKnowledgeArea)
                }
                bg={inputBgColor}
              >
                {Object.values(BookKnowledgeArea).map((type) => (
                  <option key={type} value={type}>
                    {t(`addBook.${type.toLowerCase()}`)}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="topic">{t("editBook.topics")}</FormLabel>
              <Select
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                bg={inputBgColor}
              >
                {topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="quantity">{t("editBook.quantity")}</FormLabel>
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
              <FormLabel htmlFor="description">
                {t("editBook.description")}
              </FormLabel>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="locationInLibrary">
                {t("editBook.locationInLibrary")}
              </FormLabel>
              <Input
                id="locationInLibrary"
                value={locationInLibrary}
                onChange={(e) => setLocationInLibrary(e.target.value)}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="mainImage">
                {t("editBook.mainImage")}
              </FormLabel>
              <Input
                id="mainImage"
                type="file"
                onChange={(event) => handleFileUpload(event, setMainImage)}
                accept="image/*"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="otherImages">
                {t("editBook.otherImages")}
              </FormLabel>
              <Input
                id="otherImages"
                type="file"
                multiple
                onChange={(event) =>
                  handleMultipleFilesUpload(event, setOtherImages)
                }
                accept="image/*"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="pdf">{t("editBook.pdf")}</FormLabel>
              <Input
                id="pdf"
                type="file"
                onChange={(event) => handleFileUpload(event, setPdf)}
                accept=".pdf"
              />
            </FormControl>
          </SimpleGrid>
          <Button type="submit" colorScheme="teal" width="full" mt={4}>
            {t("editBook.saveChanges")}
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default EditBook;
