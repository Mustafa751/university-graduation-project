import {
  Flex,
  Heading,
  Button,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { FiUser, FiSun, FiMoon } from "react-icons/fi";
import { useAuth } from "./AuthContext";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { t, i18n } = useTranslation();
  const { isLoggedIn, login, logout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();

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
            <Button mr="2" colorScheme="teal" onClick={login}>
              {t("navbar.login")}
            </Button>
            <Button colorScheme="teal">{t("navbar.register")}</Button>
          </>
        ) : (
          <IconButton
            aria-label="User Profile"
            icon={<FiUser />}
            colorScheme="teal"
            variant="ghost"
            fontSize="20px"
            mr="2"
            onClick={logout}
          />
        )}

        <IconButton
          aria-label={`Toggle ${colorMode === "light" ? "Dark" : "Light"} Mode`}
          icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
          onClick={toggleColorMode}
          colorScheme="teal"
          variant="ghost"
          fontSize="20px"
          mr="2"
        />

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
    </Flex>
  );
}

export default Navbar;
