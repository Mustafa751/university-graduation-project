import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import UserToBeCreatedTable from "./UserToBeCreatedTable";
import { UserToBeCreated } from "../interfaces/userInterfaces";
import { SendRequestOptions, sendRequest } from "../hooks/http";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const UserToBeCreatedPage = () => {
  const [users, setUsers] = useState<UserToBeCreated[]>([]);
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
      }
    };

    fetchUsers();
  }, [navigate, logout]);

  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box flex="1" py="4">
        <UserToBeCreatedTable users={users} />
      </Box>
      <Footer />
    </Flex>
  );
};

export default UserToBeCreatedPage;
