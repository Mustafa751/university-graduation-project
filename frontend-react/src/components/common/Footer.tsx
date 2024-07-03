import { Flex, Text, Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <Flex
      justify="center"
      align="center"
      p="4"
      bg="teal.500"
      color="white"
      direction={{ base: "column", md: "row" }}
    >
      <Box textAlign={{ base: "center", md: "left" }}>
        <Text fontSize="sm" mb={{ base: "2", md: "0" }} mr={{ md: "4" }}>
          {t("footer.phone")}: +1 (234) 567-8901
        </Text>
      </Box>
      <Box textAlign={{ base: "center", md: "left" }}>
        <Text fontSize="sm" mb={{ base: "2", md: "0" }}>
          {t("footer.email")}: contact@yourdomain.com
        </Text>
      </Box>
    </Flex>
  );
}

export default Footer;
