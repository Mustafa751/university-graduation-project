import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import UserInfoPage from "./UserInfoPage";

const UserDetails = () => {
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Navbar />
      {/* Ensure UserInfoPage and other content expand to fill available space, pushing the Footer down */}
      <Box flex="1" py="4">
        <UserInfoPage />
      </Box>
      <Footer />
    </Flex>
  );
};

export default UserDetails;
