import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: "#B83280",
    dark: "#1A202C",
    lightgray: "#2D3748",
  },
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: "#1A202C",
        color: "rgba(255, 255, 255, 0.92)",
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
