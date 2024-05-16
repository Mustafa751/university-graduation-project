import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./auth/AuthContext";
import { I18nextProvider } from "react-i18next"; // Import TranslationProvider
import i18n from "../i18n"; // Import your i18n configuration
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/routes";
import { Provider } from "react-redux";
import store from "../store/store";
// Import ReactNode

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider>
          <AuthProvider>
            <I18nextProvider i18n={i18n}>
              <AppRoutes />
              {/* Render UserDetails directly */}
            </I18nextProvider>
          </AuthProvider>
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
