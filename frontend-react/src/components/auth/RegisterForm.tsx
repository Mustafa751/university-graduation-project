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
  IconButton,
  FormErrorMessage,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  email: string;
  phoneNumber: string;
  category: string;
  faculty: string;
  specialty: string;
  course: string;
  fakNumber: string;
  addresses: string[];
}

const RegisterForm: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    email: "",
    phoneNumber: "",
    category: "",
    faculty: "",
    specialty: "",
    course: "",
    fakNumber: "",
    addresses: [""],
  });

  const [validity, setValidity] = useState({
    firstName: true,
    middleName: true,
    lastName: true,
    gender: true,
    email: true,
    phoneNumber: true,
    category: true,
    faculty: true,
    specialty: true,
    course: true,
    fakNumber: true,
    addresses: [true],
  });

  const [errorMessages, setErrorMessages] = useState({
    email: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("address")) {
      const index = parseInt(name.split("-")[1], 10);
      const updatedAddresses = [...formData.addresses];
      updatedAddresses[index] = value;
      setFormData({ ...formData, addresses: updatedAddresses });
      validateInput(name, value, index);
    } else {
      setFormData({ ...formData, [name]: value });
      validateInput(name, value);
    }
  };

  const validateInput = (name: string, value: string, index?: number) => {
    let isValid = true;
    let errorMessage = "";

    if (name === "fakNumber") {
      isValid = /^\d+$/.test(value); // Simple numeric validation
    } else if (name === "email") {
      isValid = /\S+@onlineedu\.tu-varna\.bg$/.test(value); // Email domain validation
      if (!isValid) {
        errorMessage = t("form.invalidEmailDomain");
      }
    } else if (name === "phoneNumber") {
      isValid = /^\d+$/.test(value); // Simple numeric validation
    } else if (name.startsWith("address") && index !== undefined) {
      isValid = value.trim() !== ""; // Ensure address is not empty
      const updatedValidity = [...validity.addresses];
      updatedValidity[index] = isValid;
      setValidity({ ...validity, addresses: updatedValidity });
      return;
    }

    setValidity({ ...validity, [name]: isValid });
    if (name === "email") {
      setErrorMessages({ ...errorMessages, email: errorMessage });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8089/api/usersCreate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log(t("form.userCreated"));
        alert(t("form.userCreated"));
      } else {
        throw new Error(t("form.requestFailed"));
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(t("form.creationFailed") + error.message);
        console.error(t("form.creationFailed"), error);
      } else {
        console.error(t("form.unexpectedError"), error);
        alert(t("form.unexpectedError"));
      }
    }
  };

  const handleAddAddress = () => {
    setFormData({ ...formData, addresses: [...formData.addresses, ""] });
    setValidity({ ...validity, addresses: [...validity.addresses, true] });
  };

  const handleRemoveAddress = (index: number) => {
    const updatedAddresses = formData.addresses.filter((_, i) => i !== index);
    const updatedValidity = validity.addresses.filter((_, i) => i !== index);
    setFormData({ ...formData, addresses: updatedAddresses });
    setValidity({ ...validity, addresses: updatedValidity });
  };

  return (
    <Flex direction="column" align="center" justify="center" minH="100vh" p="4">
      <VStack
        spacing="4"
        bg="gray.100"
        p="6"
        borderRadius="xl"
        w={{ base: "full", md: "md" }}
      >
        <Heading as="h1" size="xl" color="teal.500" textAlign="center">
          {t("form.welcome")}
        </Heading>
        <Heading as="h2" size="lg" color="teal.400" textAlign="center">
          {t("form.fillDetails")}
        </Heading>
        <Box w="full">
          <form onSubmit={handleSubmit}>
            <FormControl
              id="firstName"
              isRequired
              isInvalid={!validity.firstName}
            >
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
            <FormControl
              id="middleName"
              isRequired
              isInvalid={!validity.middleName}
            >
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
            <FormControl
              id="lastName"
              isRequired
              isInvalid={!validity.lastName}
            >
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
            <FormControl id="gender" isRequired isInvalid={!validity.gender}>
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
            {formData.addresses.map((address, index) => (
              <FormControl
                id={`address-${index}`}
                isRequired
                isInvalid={!validity.addresses[index]}
                key={index}
              >
                <FormLabel>
                  {t("form.address")} {index + 1}
                </FormLabel>
                <Input
                  type="text"
                  name={`address-${index}`}
                  value={address}
                  onChange={handleInputChange}
                  placeholder={t("form.enterAddress")}
                  variant="filled"
                  bg="white"
                  color="teal.800"
                />
                {index > 0 && (
                  <IconButton
                    aria-label={t("form.removeAddress")}
                    icon={<CloseIcon />}
                    size="sm"
                    mt="2"
                    onClick={() => handleRemoveAddress(index)}
                  />
                )}
              </FormControl>
            ))}
            <Button
              onClick={handleAddAddress}
              leftIcon={<AddIcon />}
              colorScheme="teal"
              mt="2"
              w="full"
            >
              {t("form.addAddress")}
            </Button>
            <FormControl id="email" isRequired isInvalid={!validity.email}>
              <FormLabel>{t("form.email")}</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t("form.enterEmail")}
                variant="filled"
                bg="white"
                color="teal.800"
              />
              {!validity.email && (
                <FormErrorMessage>{errorMessages.email}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              id="phoneNumber"
              isRequired
              isInvalid={!validity.phoneNumber}
            >
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
            <FormControl
              id="category"
              isRequired
              isInvalid={!validity.category}
            >
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
            <FormControl id="faculty" isRequired isInvalid={!validity.faculty}>
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
            <FormControl
              id="specialty"
              isRequired
              isInvalid={!validity.specialty}
            >
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
            <FormControl id="course" isRequired isInvalid={!validity.course}>
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
            <FormControl
              id="fakNumber"
              isRequired
              isInvalid={!validity.fakNumber}
            >
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
            <Button type="submit" colorScheme="teal" mt="4" w="full">
              {t("form.submit")}
            </Button>
          </form>
        </Box>
      </VStack>
    </Flex>
  );
};

export default RegisterForm;
