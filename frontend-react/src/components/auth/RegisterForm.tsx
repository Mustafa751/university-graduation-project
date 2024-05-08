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
  phoneNumber: string;
}

const RegisterForm: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    fakNumber: "",
    egn: "",
    email: "",
    phoneNumber: "",
  });

  const [validity, setValidity] = useState({
    fakNumber: true,
    egn: true,
    email: true,
    phoneNumber: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateInput(name, value);
  };

  const validateInput = (name: string, value: string) => {
    let isValid = true;
    if (name === "fakNumber") {
      isValid = /^\d+$/.test(value); // Simple numeric validation
    } else if (name === "egn") {
      isValid = true; // EGN should be 10 digits
    } else if (name === "email") {
      isValid = /\S+@\S+\.\S+/.test(value); // Simple email format check
    } else if (name === "phoneNumber") {
      isValid = /^\d+$/.test(value); // Simple numeric validation
    }
    setValidity({ ...validity, [name]: isValid });
  };

  const isFormValid = () => {
    return Object.values(validity).every((value) => value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("Please ensure all fields are correctly filled and valid.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8089/api/usersCreate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("User created successfully");
        alert("User created successfully");
      } else {
        throw new Error("Something went wrong with the request");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert("Failed to create user: " + error.message);
        console.error("Failed to create user:", error);
      } else {
        console.error("An unexpected error occurred:", error);
        alert("An unexpected error occurred");
      }
    }
  };

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
              />
            </FormControl>
            <FormControl id="phoneNumber" isRequired>
              <FormLabel>{t("form.phoneNumber")}</FormLabel>
              <Input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder={t("form.enterPhoneNumber")}
                variant="filled"
                bg="white"
                color="teal.800"
              />
            </FormControl>
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
