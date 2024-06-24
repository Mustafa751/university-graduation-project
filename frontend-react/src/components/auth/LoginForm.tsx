// src/components/LoginForm.tsx
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../auth/AuthContext"; // Make sure this path matches your file structure
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function LoginForm() {
  const { t } = useTranslation();
  const toast = useToast();
  const [formData, setFormData] = useState({ email: "", fakNumber: "" });
  const { login, logout } = useAuth();
  const navigate = useNavigate();
  const [logoutCalled, setLogoutCalled] = useState(false);

  useEffect(() => {
    if (!logoutCalled) {
      logout(); // Ensure the user is logged out when the component mounts
      setLogoutCalled(true);
    }
  }, [logout, logoutCalled]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(formData.email, formData.fakNumber)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error: Error) => {
        console.error("Login failed:", error);
        toast({
          title: t("loginForm.loginFailed"),
          description: t("loginForm.wrongCredentials"),
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      minW="80vw"
      mx="auto"
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        bg="gray.100"
        p="6"
        borderRadius="xl"
        w="600px"
        h="500px"
        mt="4"
      >
        <Heading as="h1" size="xl" color="teal.500" mb="4">
          {t("loginForm.title")}
        </Heading>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <FormControl id="email" isRequired mt="4">
            <FormLabel>{t("loginForm.emailLabel")}</FormLabel>
            <Input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={t("loginForm.emailPlaceholder")}
              variant="filled"
              bg="white"
              color="teal.800"
              inputMode="email"
              mb="4"
            />
          </FormControl>
          <FormControl id="fakNumber" isRequired>
            <FormLabel>{t("loginForm.fakNumberLabel")}</FormLabel>
            <Input
              type="text"
              name="fakNumber"
              value={formData.fakNumber}
              onChange={handleInputChange}
              placeholder={t("loginForm.fakNumberPlaceholder")}
              variant="filled"
              bg="white"
              color="teal.800"
              inputMode="numeric"
              mb="4"
            />
          </FormControl>
          <Flex justify="center" mt="4" w="100%">
            <Button type="submit" colorScheme="teal">
              {t("loginForm.submitButton")}
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
}

export default LoginForm;
