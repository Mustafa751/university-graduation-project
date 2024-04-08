import React from 'react';
import { Box, Text, VStack, HStack, useColorModeValue, Icon } from '@chakra-ui/react';
import { EmailIcon, ChatIcon, StarIcon } from '@chakra-ui/icons';
import { PersonalInfoProps } from '../interfaces/userInterfaces'; // Define this interface or adjust the import as needed

const PersonalInfo: React.FC<PersonalInfoProps> = ({
    email,
    username,
    facultyNumber,
  }) => {
    const bgColor = useColorModeValue("gray.100", "gray.700");
    const textColor = useColorModeValue("gray.600", "gray.200");
  
    return (
      <VStack spacing={4} align="stretch">
        <Box bg={bgColor} p={5} borderRadius="lg">
          <HStack spacing={4}>
            <Icon as={EmailIcon} color="purple.500" boxSize="24px" />
            <Text fontSize="lg" fontWeight="semibold" color={textColor}>
              Email: {email}
            </Text>
          </HStack>
        </Box>
        <Box bg={bgColor} p={5} borderRadius="lg">
          <HStack spacing={4}>
            <Icon as={ChatIcon} color="purple.500" boxSize="24px" />
            <Text fontSize="lg" fontWeight="semibold" color={textColor}>
              Username: {username}
            </Text>
          </HStack>
        </Box>
        <Box bg={bgColor} p={5} borderRadius="lg">
          <HStack spacing={4}>
            <Icon as={StarIcon} color="purple.500" boxSize="24px" />
            <Text fontSize="lg" fontWeight="semibold" color={textColor}>
              Faculty Number: {facultyNumber}
            </Text>
          </HStack>
        </Box>
      </VStack>
    );
  };
export default PersonalInfo;