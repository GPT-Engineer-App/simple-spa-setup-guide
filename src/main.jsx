import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Provider } from 'react-redux';
import { SupabaseProvider } from './integrations/supabase/index.js';
import store from './store';

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <SupabaseProvider>
          <App />
        </SupabaseProvider>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
