// src/interfaces/userInterfaces.ts
export interface User {
    username: string;
    facultyNumber: string;
    email: string;
    books: Book[];
  }
  
  export interface Book {
    id: number;
    name: string;
    dateTaken: string;
    status: boolean;
  }
  
  export interface PersonalInfoProps {
    email: string;
    username: string;
    facultyNumber: string;
  }

  export interface AdminPanelProps {
    id: number;
  username: string;
  email: string;
  facultyNumber: string;
  }

  export interface AuthContextType {
    isLoggedIn: boolean;
    userRole: string | null; // Added userRole to context
    login: (username: string, password: string) => Promise<void>; 
    logout: () => void;
  }

  export interface UserToBeCreated {
    id: string;
    fakNumber: string;
    egn: string;
    email: string;
    phoneNumber: string;
  }
  export enum Roles {
    STUDENT = "STUDENT",
    TEACHER = "TEACHER",
    ADMIN = "ADMIN"
}
  