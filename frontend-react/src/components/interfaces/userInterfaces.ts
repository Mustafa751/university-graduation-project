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
  