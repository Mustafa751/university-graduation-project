import {
  Flex,
  Heading,
  Button,
  IconButton,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FiUser, FiSun, FiMoon, FiMenu } from "react-icons/fi";
import { useAuth } from "../auth/AuthContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function Navbar() {
  const { t, i18n } = useTranslation();
  const { logout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const { isLoggedIn, userRole, userId } = useSelector(
    (state: RootState) => state.user
  );

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Flex
      justify="space-between"
      align="center"
      p="4"
      bg="teal.500"
      color="white"
      wrap="wrap"
    >
      <Heading as="h1" size="lg">
        {t("navbar.title")}
      </Heading>
      <Flex ml="auto" alignItems="center">
        <Flex display={{ base: "none", md: "flex" }} alignItems="center">
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
              {(userRole?.toLowerCase() === "admin" ||
                userRole?.toLowerCase() === "operator") && (
                <>
                  <Button
                    mr="2"
                    colorScheme="teal"
                    onClick={() => navigate("/admin-panel")}
                  >
                    {t("navbar.adminPanel")}
                  </Button>
                  <Button
                    mr="2"
                    colorScheme="teal"
                    onClick={() => navigate("/statistics")}
                  >
                    {t("navbar.statistics")}
                  </Button>
                  <Button
                    mr="2"
                    colorScheme="teal"
                    onClick={() => navigate("/rent-out")}
                  >
                    {t("navbar.rentOut")}
                  </Button>
                  <Button
                    mr="2"
                    colorScheme="teal"
                    onClick={() => navigate("/add-book")}
                  >
                    {t("navbar.addBooks")}
                  </Button>
                  <Button
                    mr="2"
                    colorScheme="teal"
                    onClick={() => navigate("/edit-books")}
                  >
                    {t("navbar.editBooks")}
                  </Button>
                </>
              )}
              <IconButton
                aria-label={t("navbar.userProfile")}
                icon={<FiUser />}
                colorScheme="teal"
                variant="ghost"
                fontSize="20px"
                mr="2"
                onClick={() => navigate(`/user-info/${userId}`)}
              />
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
        <Flex display={{ base: "flex", md: "none" }} alignItems="center">
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FiMenu />}
              variant="outline"
              aria-label="Options"
            />
            <MenuList>
              {!isLoggedIn ? (
                <>
                  <MenuItem onClick={() => navigate("/login")}>
                    {t("navbar.login")}
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/register")}>
                    {t("navbar.register")}
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={() => navigate(`/user-info/${userId}`)}>
                    {t("navbar.userProfile")}
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/dashboard")}>
                    {t("navbar.dashboard")}
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/usersToBeCreated")}>
                    {t("navbar.usersToBeCreated")}
                  </MenuItem>
                  {(userRole?.toLowerCase() === "admin" ||
                    userRole?.toLowerCase() === "operator") && (
                    <>
                      <MenuItem onClick={() => navigate("/admin-panel")}>
                        {t("navbar.adminPanel")}
                      </MenuItem>
                      <MenuItem onClick={() => navigate("/statistics")}>
                        {t("navbar.statistics")}
                      </MenuItem>
                      <MenuItem onClick={() => navigate("/rent-out")}>
                        {t("navbar.rentOut")}
                      </MenuItem>
                      <MenuItem onClick={() => navigate("/add-book")}>
                        {t("navbar.addBooks")}
                      </MenuItem>
                      <MenuItem onClick={() => navigate("/edit-books")}>
                        {t("navbar.editBooks")}
                      </MenuItem>
                    </>
                  )}
                  <MenuItem onClick={logout}>{t("navbar.logout")}</MenuItem>
                  <MenuItem onClick={toggleColorMode}>
                    {t(
                      `navbar.toggle${
                        colorMode === "light" ? "Dark" : "Light"
                      }Mode`
                    )}
                  </MenuItem>
                </>
              )}
              <MenuItem onClick={() => changeLanguage("bg")}>BG</MenuItem>
              <MenuItem onClick={() => changeLanguage("en")}>EN</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Navbar;
