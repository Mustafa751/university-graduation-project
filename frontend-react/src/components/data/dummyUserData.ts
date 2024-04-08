// src/data/dummyUserData.ts
import { User } from '../interfaces/userInterfaces'; // Adjust the import path based on your actual file structure

export const dummyUser: User = {
  username: "JohnDoe",
  facultyNumber: "12345",
  email: "johndoe@example.com",
  books: [
    { id: 1, name: "The Great Gatsby", dateTaken: "2024-01-01", status: true },
    { id: 2, name: "To Kill a Mockingbird", dateTaken: "2024-02-01", status: false },
    { id: 3, name: "1984", dateTaken: "2024-03-01", status: false },
  ],
};
