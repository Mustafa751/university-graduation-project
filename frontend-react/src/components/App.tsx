import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./auth/AuthContext";
import { I18nextProvider } from "react-i18next"; // Import TranslationProvider
import i18n from "../i18n"; // Import your i18n configuration
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/routes";
import { Provider } from "react-redux";
import { store, persistor } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
// Import ReactNode

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  );
}

export default App;
