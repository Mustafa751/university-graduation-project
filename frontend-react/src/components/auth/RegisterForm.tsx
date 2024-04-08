import React, { useState } from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  VStack,
  Box,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface FormData {
  fakNumber: string;
  egn: string;
  email: string;
}

const RegisterForm: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    fakNumber: "",
    egn: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateInput(name, value);
  };

  const validateInput = (name: string, value: string) => {
    // Basic validation for demonstration purposes
    let isValid = true; // Assuming all inputs are initially valid

    // You can add more specific validation rules here based on the input name
    if (name === "invoiceNumber") {
      isValid = /^[0-9]{8}$/.test(value);
    } else if (name === "personalId") {
      isValid = /^[0-9]{10}$/.test(value);
    } else if (name === "email") {
      isValid = /\S+@\S+\.\S+/.test(value);
    }

    // Set the validity state for the input
    // For simplicity, assuming all inputs are valid initially
    setValidity({ ...validity, [name]: isValid });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check if any field is left empty
    for (const field in formData) {
      if (!formData[field as keyof FormData]) {
        alert("Please fill out all fields");
        return;
      }
    }
    // Here you can handle form submission, for example, send the data to an API
    console.log(formData);
  };

  const isFormValid = () => {
    // Check if all fields are valid based on the validity object
    // For simplicity, assuming all fields are valid initially
    return Object.values(validity).every((value) => value === true);
  };

  const [validity, setValidity] = useState({
    invoiceNumber: false,
    personalId: false,
    email: false,
  });

  return (
    <Flex direction="column" align="center" justify="center" h="100vh">
      <VStack spacing="4" bg="gray.100" p="6" borderRadius="xl">
        <Heading as="h1" size="xl" color="teal.500">
          {t("form.welcome")}
        </Heading>
        <Heading as="h2" size="lg" color="teal.400">
          {t("form.fillDetails")}
        </Heading>
        <Box w="md">
          <form onSubmit={handleSubmit}>
            <FormControl id="fakNumber" isRequired>
              <FormLabel>{t("form.fakNumber")}</FormLabel>
              <Input
                type="text"
                name="fakNumber"
                value={formData.fakNumber}
                onChange={handleInputChange}
                placeholder={t("form.enterFakNumber")}
                variant="filled"
                bg="white"
                color="teal.800"
                inputMode="numeric" // Restrict input to numeric values
              />
            </FormControl>
            <FormControl id="egn" isRequired>
              <FormLabel>{t("form.egn")}</FormLabel>
              <Input
                type="text"
                name="egn"
                value={formData.egn}
                onChange={handleInputChange}
                placeholder={t("form.enterEgn")}
                variant="filled"
                bg="white"
                color="teal.800"
                inputMode="numeric" // Restrict input to numeric values
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>{t("form.email")}</FormLabel>
              <Input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t("form.enterEmail")}
                variant="filled"
                bg="white"
                color="teal.800"
                inputMode="numeric" // Restrict input to numeric values
              />
            </FormControl>
            {/* Other form fields */}
            <Button
              type="submit"
              colorScheme="teal"
              mt="4"
              disabled={!isFormValid()}
              alignSelf="center"
            >
              {t("form.submit")}
            </Button>
          </form>
        </Box>
      </VStack>
    </Flex>
  );
};

export default RegisterForm;
