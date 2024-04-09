import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./auth/AuthContext";
import { I18nextProvider } from "react-i18next"; // Import TranslationProvider
import i18n from "../i18n"; // Import your i18n configuration
import AddBook from "./books/AddBook";
// Import ReactNode

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <I18nextProvider i18n={i18n}>
          {/* Render UserDetails directly */}
          <AddBook />
        </I18nextProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
