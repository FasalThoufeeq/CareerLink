import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecruiterRoute from "./Routes/RecruiterRoute";
import SeekerRoute from "./Routes/SeekerRoute";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./Components/ErrorBoundary";
import PageNotFound from "./Components/pageNotFound";
const theme = createTheme();

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ErrorBoundary
          fallbackRender={ErrorFallback}
          onReset={() => alert("Error boundary reset")}
        >
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/recruiter/*" element={<RecruiterRoute />} />
              <Route path="/*" element={<SeekerRoute />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </ThemeProvider>
    </>
  );
}

export default App;
