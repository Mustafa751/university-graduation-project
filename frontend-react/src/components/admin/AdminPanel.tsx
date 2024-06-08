import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Box,
  useColorModeValue,
  Container,
  Text,
  Button,
  Tooltip,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { AdminPanelProps } from "../interfaces/userInterfaces";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import { SendRequestOptions, sendRequest } from "../hooks/http";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<AdminPanelProps[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<AdminPanelProps[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const bg = useColorModeValue("white", "gray.800"); // Adapting based on theme
  const color = useColorModeValue("gray.600", "white");
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const requestOptions: SendRequestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const data = await sendRequest<AdminPanelProps[]>(
          "http://localhost:8089/api/users/summary",
          requestOptions,
          navigate,
          logout
        );
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [logout]);

  useEffect(() => {
    const results = users.filter((user) =>
      user.facultyNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  return (
    <Flex direction="column" minHeight="100vh">
      <Navbar />
      <Box flex="1" py="6">
        <Container maxWidth="container.xl">
          <Text fontSize="xl" mb="4" fontWeight="bold" color={color}>
            User Management
          </Text>
          <Flex justify="flex-end" mb="4">
            <InputGroup maxWidth="400px">
              <Input
                placeholder="Search by Faculty Number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <InputRightElement children={<SearchIcon color="gray.500" />} />
            </InputGroup>
          </Flex>
          <TableContainer bg={bg} borderRadius="lg" boxShadow="base" p="4">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Email</Th>
                  <Th>Faculty Number</Th>
                  <Th>Phone Number</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredUsers.map((user) => (
                  <Tr key={user.id}>
                    <Td>{user.email}</Td>
                    <Td>{user.facultyNumber}</Td>
                    <Td>{user.phoneNumber}</Td>
                    <Td>
                      <Tooltip
                        label="View Unreturned Books"
                        aria-label="View Unreturned Books"
                      >
                        <Button
                          size="sm"
                          colorScheme="teal"
                          onClick={() => navigate(`/user-books/${user.id}`)}
                        >
                          View Books
                        </Button>
                      </Tooltip>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
      <Footer />
    </Flex>
  );
};

export default AdminPanel;
