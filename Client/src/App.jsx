import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecruiterRoute from "./Routes/RecruiterRoute";
import SeekerRoute from "./Routes/SeekerRoute";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/recruiter/*" element={<RecruiterRoute/>} />
          <Route path="/*" element={<SeekerRoute/>} />
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
