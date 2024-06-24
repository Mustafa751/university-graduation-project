// src/common/Navbar.tsx
import React from "react";
import {
  Flex,
  Heading,
  Button,
  IconButton,
  useColorMode,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { FiUser, FiSun, FiMoon, FiCamera } from "react-icons/fi";
import { useAuth } from "../auth/AuthContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import QrScannerComponent from "../qrscanner/QrScannerComponent";

function Navbar() {
  const { t, i18n } = useTranslation();
  const { logout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const { isLoggedIn, userRole, userId } = useSelector(
    (state: RootState) => state.user
  );
  console.log("Navbar state:", { isLoggedIn, userRole, userId });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Flex justify="space-between" p="4" bg="teal.500" color="white">
      <Heading as="h1" size="lg">
        {t("navbar.title")}
      </Heading>
      <Flex alignItems="center">
        {!isLoggedIn ? (
          <>
            <Button
              mr="2"
              colorScheme="teal"
              onClick={() => navigate("/login")}
            >
              {t("navbar.login")}
            </Button>
            <Button colorScheme="teal" onClick={() => navigate("/register")}>
              {t("navbar.register")}
            </Button>
          </>
        ) : (
          <>
            <IconButton
              aria-label={t("navbar.userProfile")}
              icon={<FiUser />}
              colorScheme="teal"
              variant="ghost"
              fontSize="20px"
              mr="2"
              onClick={() => navigate(`/user-info/${userId}`)}
            />
            <Button
              mr="2"
              colorScheme="teal"
              onClick={() => navigate("/dashboard")}
            >
              {t("navbar.dashboard")}
            </Button>
            <Button
              mr="2"
              colorScheme="teal"
              onClick={() => navigate("/usersToBeCreated")}
            >
              {t("navbar.usersToBeCreated")}
            </Button>
            {userRole?.toLowerCase() === "admin" && (
              <>
                <Button
                  mr="2"
                  colorScheme="teal"
                  onClick={() => navigate("/admin-panel")}
                >
                  {t("navbar.adminPanel")}
                </Button>
                <IconButton
                  aria-label={t("navbar.scanQRCode")}
                  icon={<FiCamera />}
                  onClick={onOpen}
                  colorScheme="teal"
                  variant="ghost"
                  fontSize="20px"
                  mr="2"
                  display={{ base: "block", md: "none" }} // Show only on mobile
                />
              </>
            )}
            <IconButton
              aria-label={t("navbar.logout")}
              icon={<FiSun />}
              onClick={logout}
              colorScheme="teal"
              variant="ghost"
              fontSize="20px"
              mr="2"
            />
            <IconButton
              aria-label={t(
                `navbar.toggle${colorMode === "light" ? "Dark" : "Light"}Mode`
              )}
              icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
              onClick={toggleColorMode}
              colorScheme="teal"
              variant="ghost"
              fontSize="20px"
              mr="2"
            />
          </>
        )}
        <Button
          onClick={() => changeLanguage("bg")}
          colorScheme="teal"
          variant="ghost"
        >
          BG
        </Button>
        <Button
          onClick={() => changeLanguage("en")}
          colorScheme="teal"
          variant="ghost"
        >
          EN
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("navbar.scanQRCode")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <QrScannerComponent onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default Navbar;
