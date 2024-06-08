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
  Select,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  egn: string;
  gender: string;
  address: string;
  email: string;
  phoneNumber: string;
  category: string;
  education: string;
  faculty: string;
  specialty: string;
  course: string;
  fakNumber: string;
}

const RegisterForm: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    middleName: "",
    lastName: "",
    egn: "",
    gender: "",
    address: "",
    email: "",
    phoneNumber: "",
    category: "",
    education: "",
    faculty: "",
    specialty: "",
    course: "",
    fakNumber: "",
  });

  const [validity, setValidity] = useState({
    firstName: true,
    middleName: true,
    lastName: true,
    egn: true,
    gender: true,
    address: true,
    email: true,
    phoneNumber: true,
    category: true,
    education: true,
    faculty: true,
    specialty: true,
    course: true,
    fakNumber: true,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateInput(name, value);
  };

  const validateInput = (name: string, value: string) => {
    let isValid = true;
    if (name === "fakNumber") {
      isValid = /^\d+$/.test(value); // Simple numeric validation
    } else if (name === "egn") {
      isValid = /^\d{10}$/.test(value); // EGN should be 10 digits
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
            <FormControl id="firstName" isRequired>
              <FormLabel>{t("form.firstName")}</FormLabel>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder={t("form.enterFirstName")}
                variant="filled"
                bg="white"
                color="teal.800"
              />
            </FormControl>
            <FormControl id="middleName" isRequired>
              <FormLabel>{t("form.middleName")}</FormLabel>
              <Input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
                placeholder={t("form.enterMiddleName")}
                variant="filled"
                bg="white"
                color="teal.800"
              />
            </FormControl>
            <FormControl id="lastName" isRequired>
              <FormLabel>{t("form.lastName")}</FormLabel>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder={t("form.enterLastName")}
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
            <FormControl id="gender" isRequired>
              <FormLabel>{t("form.gender")}</FormLabel>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                placeholder={t("form.selectGender")}
                variant="filled"
                bg="white"
                color="teal.800"
              >
                <option value="male">{t("form.male")}</option>
                <option value="female">{t("form.female")}</option>
              </Select>
            </FormControl>
            <FormControl id="address" isRequired>
              <FormLabel>{t("form.address")}</FormLabel>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder={t("form.enterAddress")}
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
            <FormControl id="category" isRequired>
              <FormLabel>{t("form.category")}</FormLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder={t("form.selectCategory")}
                variant="filled"
                bg="white"
                color="teal.800"
              >
                <option value="bachelor">{t("form.bachelor")}</option>
                <option value="master">{t("form.master")}</option>
                <option value="phd">{t("form.phd")}</option>
                <option value="teacher">{t("form.teacher")}</option>
                <option value="employee">{t("form.employee")}</option>
                <option value="other">{t("form.other")}</option>
              </Select>
            </FormControl>
            <FormControl id="education" isRequired>
              <FormLabel>{t("form.education")}</FormLabel>
              <Input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                placeholder={t("form.enterEducation")}
                variant="filled"
                bg="white"
                color="teal.800"
              />
            </FormControl>
            <FormControl id="faculty" isRequired>
              <FormLabel>{t("form.faculty")}</FormLabel>
              <Input
                type="text"
                name="faculty"
                value={formData.faculty}
                onChange={handleInputChange}
                placeholder={t("form.enterFaculty")}
                variant="filled"
                bg="white"
                color="teal.800"
              />
            </FormControl>
            <FormControl id="specialty" isRequired>
              <FormLabel>{t("form.specialty")}</FormLabel>
              <Input
                type="text"
                name="specialty"
                value={formData.specialty}
                onChange={handleInputChange}
                placeholder={t("form.enterSpecialty")}
                variant="filled"
                bg="white"
                color="teal.800"
              />
            </FormControl>
            <FormControl id="course" isRequired>
              <FormLabel>{t("form.course")}</FormLabel>
              <Input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                placeholder={t("form.enterCourse")}
                variant="filled"
                bg="white"
                color="teal.800"
              />
            </FormControl>
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
