import { Flex, Text, Box } from "@chakra-ui/react";

function Footer() {
  return (
    <Flex justify="center" align="center" p="4" bg="teal.500" color="white">
      <Flex direction="column" align="center">
        <Box textAlign="center">
          <Text fontSize="sm" mb="2">
            Phone: +1 (234) 567-8901
          </Text>
          <Text fontSize="sm" mb="2">
            Email: contact@yourdomain.com
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Footer;
