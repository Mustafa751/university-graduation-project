import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import BooksTable from "./BooksTable";
import PersonalInfo from "./PersonalInfo";
import { Book } from "../interfaces/userInterfaces";
import { SendRequestOptions, sendRequest } from "../hooks/http";
import { useAuth } from "../auth/AuthContext";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useTranslation } from "react-i18next";

const UserInfoPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const user = useSelector((state: RootState) => state.user.user);
  const { logout } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoadingBooks, setIsLoadingBooks] = useState<boolean>(false);

  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoadingBooks(true);
      const requestOptions: SendRequestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const data = await sendRequest<Book[]>(
          `http://localhost:8089/api/users/${userId}/books`,
          requestOptions,
          navigate,
          logout
        );
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setIsLoadingBooks(false);
      }
    };

    if (userId) fetchBooks();
  }, [userId, logout, navigate]);

  if (!user) return <div>{t("loading")}</div>;

  return (
    <Container maxW="container.md" mt={8}>
      <Tabs isFitted variant="enclosed" colorScheme="purple">
        <TabList mb="1em">
          <Tab>{t("userInfo.books")}</Tab>
          <Tab>{t("userInfo.personalInfo")}</Tab>
        </TabList>
        <TabPanels py="10px">
          <TabPanel>
            {isLoadingBooks ? (
              <div>{t("userInfo.loadingBooks")}</div>
            ) : (
              <BooksTable books={books} />
            )}
          </TabPanel>
          <TabPanel>
            <PersonalInfo
              email={user.email}
              phoneNumber={user.phoneNumber}
              facultyNumber={user.facultyNumber}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default UserInfoPage;
