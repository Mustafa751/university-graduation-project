import { useState, ChangeEvent, FormEvent } from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
} from "@chakra-ui/react";

interface FormData {
  fakNumber: string;
  egn: string;
}

function MyForm() {
  const [formData, setFormData] = useState<FormData>({
    fakNumber: "",
    egn: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
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

export default MyForm;
