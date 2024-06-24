import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Container,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useColorModeValue,
} from "@chakra-ui/react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import { SendRequestOptions, sendRequest } from "../hooks/http";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export interface User {
  id: number;
  email: string;
  phoneNumber: string;
  facultyNumber: string;
  username: string;
  role: Roles;
}

export enum Roles {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  ADMIN = "ADMIN",
}

const Statistics: React.FC = () => {
  const { t } = useTranslation();
  const [, setUsers] = useState<User[]>([]);
  const [userCount, setUserCount] = useState(0);
  const [roleCounts, setRoleCounts] = useState<Record<Roles, number>>({
    [Roles.STUDENT]: 0,
    [Roles.TEACHER]: 0,
    [Roles.ADMIN]: 0,
  });
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
        const data = await sendRequest<User[]>(
          "http://localhost:8089/api/users/getUserStatistics",
          requestOptions,
          navigate,
          logout
        );
        setUsers(data);
        setUserCount(data.length);
        const roleCounts = data.reduce(
          (acc, user) => {
            acc[user.role]++;
            return acc;
          },
          { [Roles.STUDENT]: 0, [Roles.TEACHER]: 0, [Roles.ADMIN]: 0 }
        );
        setRoleCounts(roleCounts);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [logout, navigate]);

  return (
    <Flex direction="column" minHeight="100vh">
      <Navbar />
      <Box flex="1" py="6">
        <Container maxWidth="container.xl">
          <Text fontSize="xl" mb="4" fontWeight="bold" color={color}>
            {t("statistics.userStatistics")}
          </Text>
          <TableContainer bg={bg} borderRadius="lg" boxShadow="base" p="4">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>{t("statistics.totalUsers")}</Th>
                  <Th>{t("statistics.students")}</Th>
                  <Th>{t("statistics.teachers")}</Th>
                  <Th>{t("statistics.admins")}</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{userCount}</Td>
                  <Td>{roleCounts[Roles.STUDENT]}</Td>
                  <Td>{roleCounts[Roles.TEACHER]}</Td>
                  <Td>{roleCounts[Roles.ADMIN]}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
      <Footer />
    </Flex>
  );
};

export default Statistics;
