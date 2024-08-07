import React from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { EmailIcon, StarIcon, PhoneIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { PersonalInfoProps } from "../interfaces/userInterfaces"; // Adjust the import as needed

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  email,
  phoneNumber,
  facultyNumber,
}) => {
  const { t } = useTranslation();
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.200");

  return (
    <VStack spacing={4} align="stretch">
      <Box
        bg={bgColor}
        p={{ base: 3, md: 5 }}
        borderRadius="lg"
        w="100%"
        maxW="600px"
        mx="auto"
      >
        <HStack spacing={4}>
          <Icon
            as={EmailIcon}
            color="purple.500"
            boxSize={{ base: "20px", md: "24px" }}
          />
          <Text
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="semibold"
            color={textColor}
          >
            {t("personalInfo.email")}: {email}
          </Text>
        </HStack>
      </Box>
      <Box
        bg={bgColor}
        p={{ base: 3, md: 5 }}
        borderRadius="lg"
        w="100%"
        maxW="600px"
        mx="auto"
      >
        <HStack spacing={4}>
          <Icon
            as={PhoneIcon}
            color="purple.500"
            boxSize={{ base: "20px", md: "24px" }}
          />
          <Text
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="semibold"
            color={textColor}
          >
            {t("personalInfo.phoneNumber")}: {phoneNumber}
          </Text>
        </HStack>
      </Box>
      <Box
        bg={bgColor}
        p={{ base: 3, md: 5 }}
        borderRadius="lg"
        w="100%"
        maxW="600px"
        mx="auto"
      >
        <HStack spacing={4}>
          <Icon
            as={StarIcon}
            color="purple.500"
            boxSize={{ base: "20px", md: "24px" }}
          />
          <Text
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="semibold"
            color={textColor}
          >
            {t("personalInfo.facultyNumber")}: {facultyNumber}
          </Text>
        </HStack>
      </Box>
    </VStack>
  );
};

export default PersonalInfo;
