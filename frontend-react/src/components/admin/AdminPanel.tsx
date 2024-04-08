// src/components/admin/AdminPanel.tsx
import React from "react";
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
} from "@chakra-ui/react";
import { AdminPanelProps } from "../interfaces/userInterfaces";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

// Example mock data - replace with actual data fetching
const mockUsers: AdminPanelProps[] = [
  {
    id: 1,
    username: "JaneDoe",
    email: "jane@example.com",
    facultyNumber: "F123456",
  },
  {
    id: 2,
    username: "JohnDoe",
    email: "john@example.com",
    facultyNumber: "F654321",
  },
  // Add more users as needed for demonstration
];

const AdminPanel: React.FC = () => {
  const bg = useColorModeValue("white", "gray.800"); // Adapting based on theme
  const color = useColorModeValue("gray.600", "white");

  return (
    <Flex direction="column" minHeight="100vh">
      <Navbar />
      <Box flex="1" py="6">
        <Container maxWidth="container.xl">
          <Text fontSize="xl" mb="4" fontWeight="bold" color={color}>
            User Management
          </Text>
          <TableContainer bg={bg} borderRadius="lg" boxShadow="base" p="4">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Username</Th>
                  <Th>Email</Th>
                  <Th>Faculty Number</Th>
                </Tr>
              </Thead>
              <Tbody>
                {mockUsers.map((user) => (
                  <Tr key={user.id}>
                    <Td>{user.username}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.facultyNumber}</Td>
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
