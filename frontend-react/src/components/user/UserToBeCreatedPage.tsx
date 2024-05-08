import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import UserToBeCreatedTable from "./UserToBeCreatedTable";
import { UserToBeCreated } from "../interfaces/userInterfaces";

const UserToBeCreatedPage = () => {
  const [users, setUsers] = useState<UserToBeCreated[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:8089/api/usersCreate");
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

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
