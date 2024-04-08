import React from 'react';
import { Container, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import BooksTable from './BooksTable';
import PersonalInfo from './PersonalInfo';
import { User } from '../interfaces/userInterfaces'; // Adjust path as needed

interface UserInfoPageProps {
  user: User;
}

const UserInfoPage: React.FC<UserInfoPageProps> = ({ user }) => {
    return (
      <>
        <Container maxW="container.md" mt={8}>
          <Tabs isFitted variant="enclosed" colorScheme="purple">
            <TabList mb="1em">
              <Tab>Books</Tab>
              <Tab>Personal Info</Tab>
            </TabList>
            <TabPanels py="10px">
              <TabPanel>
                <BooksTable books={user.books} />
              </TabPanel>
              <TabPanel>
                <PersonalInfo
                  email={user.email}
                  username={user.username}
                  facultyNumber={user.facultyNumber}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </>
    );
  };
export default UserInfoPage;