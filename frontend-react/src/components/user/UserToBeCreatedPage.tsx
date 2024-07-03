import { useEffect, useState } from "react";
import { Box, Flex, Container, Spinner, Text } from "@chakra-ui/react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import UserToBeCreatedTable from "./UserToBeCreatedTable";
import { UserToBeCreated } from "../interfaces/userInterfaces";
import { SendRequestOptions, sendRequest } from "../hooks/http";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const UserToBeCreatedPage = () => {
  const [users, setUsers] = useState<UserToBeCreated[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const requestOptions: SendRequestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await sendRequest<UserToBeCreated[]>(
          "http://localhost:8089/api/usersCreate",
          requestOptions,
          navigate,
          logout
        );
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [navigate, logout]);

  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box flex="1" py="4">
        <Container maxW="container.xl">
          {isLoading ? (
            <Flex justifyContent="center" alignItems="center" minHeight="60vh">
              <Spinner size="xl" />
            </Flex>
          ) : users.length > 0 ? (
            <UserToBeCreatedTable users={users} />
          ) : (
            <Text fontSize="xl" textAlign="center">
              No users to be created found.
            </Text>
          )}
        </Container>
      </Box>
      <Footer />
    </Flex>
  );
};

export default UserToBeCreatedPage;
