// src/components/AdminPanel.tsx
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
import { useTranslation } from "react-i18next";

const AdminPanel: React.FC = () => {
  const { t } = useTranslation();
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
  }, [logout, navigate]);

  useEffect(() => {
    const results = users.filter((user) =>
      user.facultyNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  const handleDeleteUser = async (userId: number) => {
    const requestOptions: SendRequestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await sendRequest<{ success: boolean }>(
        `http://localhost:8089/api/users/delete-user?userId=${userId}`,
        requestOptions,
        navigate,
        logout
      );

      if (response.success) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        setFilteredUsers((prevFilteredUsers) =>
          prevFilteredUsers.filter((user) => user.id !== userId)
        );
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Flex direction="column" minHeight="100vh">
      <Navbar />
      <Box flex="1" py="6">
        <Container maxWidth="container.xl">
          <Text fontSize="xl" mb="4" fontWeight="bold" color={color}>
            {t('navbar.userManagement')}
          </Text>
          <Flex justify="flex-end" mb="4">
            <InputGroup maxWidth="400px">
              <Input
                placeholder={t('form.searchFacultyNumber')}
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
                  <Th>{t('form.email')}</Th>
                  <Th>{t('form.fakNumber')}</Th>
                  <Th>{t('form.phoneNumber')}</Th>
                  <Th>{t('form.actions')}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredUsers.map((user) => (
                  <Tr key={user.id}>
                    <Td>{user.email}</Td>
                    <Td>{user.facultyNumber}</Td>
                    <Td>{user.phoneNumber}</Td>
                    <Td>
                      <Flex gap="2">
                        <Tooltip
                          label={t('form.viewBooks')}
                          aria-label={t('form.viewBooks')}
                        >
                          <Button
                            size="sm"
                            colorScheme="teal"
                            onClick={() => navigate(`/user-books/${user.id}`)}
                          >
                            {t('form.viewBooks')}
                          </Button>
                        </Tooltip>
                        <Tooltip label={t('form.deleteUser')} aria-label={t('form.deleteUser')}>
                          <Button
                            size="sm"
                            colorScheme="red"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            {t('form.deleteUser')}
                          </Button>
                        </Tooltip>
                      </Flex>
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
