import {
  Flex,
  Heading,
  Button,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { FiUser, FiSun, FiMoon } from "react-icons/fi";
import { useAuth } from "../auth/AuthContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; // Correct import of useNavigate

function Navbar() {
  const { t, i18n } = useTranslation();
  const { isLoggedIn, userRole, logout } = useAuth(); // Removed login from destructuring
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate(); // Using useNavigate for navigation

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
            {/* Redirect to login page */}
            <Button
              mr="2"
              colorScheme="teal"
              onClick={() => navigate("/login")}
            >
              {t("navbar.login")}{" "}
              {/* Assuming your translations handle "Вход" */}
            </Button>
            {/* Redirect to register page */}
            <Button colorScheme="teal" onClick={() => navigate("/register")}>
              {t("navbar.register")}{" "}
              {/* Assuming your translations handle "Регистрация" */}
            </Button>
          </>
        ) : (
          <>
            <IconButton
              aria-label="User Profile"
              icon={<FiUser />}
              colorScheme="teal"
              variant="ghost"
              fontSize="20px"
              mr="2"
              onClick={() => navigate("/user-info")}
            />
            <Button
              mr="2"
              colorScheme="teal"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Button>
            {userRole === "admin" && (
              <Button
                mr="2"
                colorScheme="teal"
                onClick={() => navigate("/admin-panel")}
              >
                Admin Panel
              </Button>
            )}
            <IconButton
              aria-label="Logout"
              icon={<FiSun />}
              onClick={logout}
              colorScheme="teal"
              variant="ghost"
              fontSize="20px"
              mr="2"
            />
            <IconButton
              aria-label={`Toggle ${
                colorMode === "light" ? "Dark" : "Light"
              } Mode`}
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
    </Flex>
  );
}

export default Navbar;
