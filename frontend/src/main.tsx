import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
const theme = createTheme({
  palette: {
    primary: { main: "#5869FC", dark: "#F3F3E0", light: "#F96E2A" },
    secondary: { main: "#fff", dark: "#060A06" },
  },
  typography: { fontFamily: "Poppins" },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
