// src/interfaces/userInterfaces.ts
export interface Book {
  id: number;
  name: string;
  dateTaken: string;
  status: boolean;
}

export enum BookKnowledgeArea{
  Book = "Book",
  Article = "Article",
  Periodic = "Periodic",
  Reader = "Reader",
}

export interface User {
  id: number;
  email: string;
  phoneNumber: string;
  facultyNumber: string;
  username: string;
  role: string;
}
export interface UserResponse {
  user: User;
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
  author: string;
  quantity: number;
  mainImage: string;
  price: string;
  knowledgeArea: string;
  language: string;
}

export interface BookDetails {
  productionDate: string | number | Date;
  id: string;
  isbn: string;
  name: string;
  title: string;
  date: string;
  author: string;
  description: string;
  quantity: string;
  subtitle: string;
  parallelTitle: string;
  edition: string;
  placeOfPublication: string;
  publisher: string;
  language: string;
  sourceTitle: string;
  volume: string;
  inventoryNumber: string;
  signature: string; // New field
  issueNumber: string;
  pages: string;
  publicationYear: string;
  notes: string;
  price: string;
  keywords: string;
  classificationIndex: string;
  knowledgeArea: BookKnowledgeArea;
  documentType: BookKnowledgeArea;
  mainImage: string; // Assuming this is a base64 string
  otherImages: string[]; // Assuming these are base64 strings
  pdf: string; // Assuming this is a base64 string
}


export interface AdminPanelProps {
  id: number;
  email: string;
  facultyNumber: string;
  phoneNumber: string;
}
