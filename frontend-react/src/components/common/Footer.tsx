// src/common/Footer.tsx
import { Flex, Text, Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <Flex justify="center" align="center" p="4" bg="teal.500" color="white">
      <Flex direction="column" align="center">
        <Box textAlign="center">
          <Text fontSize="sm" mb="2">
            {t("footer.phone")}: +1 (234) 567-8901
          </Text>
          <Text fontSize="sm" mb="2">
            {t("footer.email")}: contact@yourdomain.com
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Footer;
