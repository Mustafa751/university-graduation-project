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

function LoginForm() {
  const toast = useToast();
  const [formData, setFormData] = useState({ fakNumber: "", egn: "" });
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
    login(formData.fakNumber, formData.egn)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error: Error) => {
        console.error("Login failed:", error);
        toast({
          title: "Login Failed",
          description: "Wrong username or password",
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
          Вход
        </Heading>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <FormControl id="fakNumber" isRequired mt="4">
            <FormLabel>Фак Номер</FormLabel>
            <Input
              type="text"
              name="fakNumber"
              value={formData.fakNumber}
              onChange={handleInputChange}
              placeholder="Фак Номер"
              variant="filled"
              bg="white"
              color="teal.800"
              inputMode="numeric"
              mb="4"
            />
          </FormControl>
          <FormControl id="egn" isRequired>
            <FormLabel>ЕГН</FormLabel>
            <Input
              type="text"
              name="egn"
              value={formData.egn}
              onChange={handleInputChange}
              placeholder="ЕГН"
              variant="filled"
              bg="white"
              color="teal.800"
              inputMode="numeric"
              mb="4"
            />
          </FormControl>
          <Flex justify="center" mt="4" w="100%">
            <Button type="submit" colorScheme="teal">
              Влизане
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
}

export default LoginForm;
