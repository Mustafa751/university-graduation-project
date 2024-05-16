// src/interfaces/userInterfaces.ts
export interface Book {
  id: number;
  name: string;
  dateTaken: string;
  status: boolean;
}

export interface User {
  id: number;
  email: string;
  phoneNumber: string;
  facultyNumber: string;
  username: string;
  role: string;
}

export interface PersonalInfoProps {
  email: string;
  phoneNumber: string;
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
    userRole: string | null;
    userId: number | null;
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

export interface BookData {
  id: number;
  name: string;
  quantity: number;
  mainImage: string; // This will now hold the Base64 string
}


export interface AdminPanelProps {
  id: number;
  email: string;
  facultyNumber: string;
  phoneNumber: string;
}

  