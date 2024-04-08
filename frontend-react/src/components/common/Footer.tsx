import { Flex, Link, Text, IconButton } from "@chakra-ui/react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <Flex justify="center" align="center" p="4" bg="teal.500" color="white">
      <Flex direction="column" align="center">
        <Text fontSize="sm" mb="2">
          {t("footer.copyright")}
        </Text>
        <Flex>
          <IconButton
            aria-label="GitHub"
            icon={<FiGithub />}
            colorScheme="whiteAlpha"
            variant="ghost"
            fontSize="20px"
            mr="2"
            as={Link}
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          />
          <IconButton
            aria-label="LinkedIn"
            icon={<FiLinkedin />}
            colorScheme="whiteAlpha"
            variant="ghost"
            fontSize="20px"
            as={Link}
            href="https://www.linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Footer;
