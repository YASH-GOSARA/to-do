import React from "react";
import { ChakraProvider } from "@chakra-ui/provider";
import App from "./App";
import ReactDOM from "react-dom";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";

ReactDOM.render(
  <ChakraProvider resetCSS={true}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </ChakraProvider>,
  document.getElementById("root")
);
