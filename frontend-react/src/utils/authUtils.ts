import { User } from "../components/interfaces/userInterfaces";

// Example utility function
export const isAuthenticated = (user: User): boolean => {
    return !!user;
};

// Any other utility functions or constants can be added here
