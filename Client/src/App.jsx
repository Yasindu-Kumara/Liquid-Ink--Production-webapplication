import react from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#304ffe", // A strong blue tone, representing professionalism and stability.
        light: "#536dfe", // A lighter version of blue for contrasts and highlights.
        dark: "#3d5afe", // A deeper blue for darker elements.
      },
      secondary: {
        main: "#FFB400", // A bold amber color for accents and interactive elements.
        light: "#FFE082", // Lighter amber to add a subtle, bright contrast.
      },
      error: {
        main: "#D32F2F", // A rich red for error states and warnings.
      },
      gray: {
        main: "#2C2C2C", // Neutral gray for background or card elements.
        light: "#F5F5F5", // Soft white-gray for minimalistic sections.
      },
      textColours: {
        contentPrimary: "#333333", // A strong neutral gray for primary text.
        contentSecondary: "#666666", // A slightly lighter tone for secondary text.
        contentTertiary: "#999999", // A lighter gray for tertiary text or less important details.
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          </Routes>
          </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
