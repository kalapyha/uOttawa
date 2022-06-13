import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import NavBar from "./components/NavBar/NavBar";
import Reset from "./components/Reset/Reset";
import Portal from "./components/Portal/Portal";
import MFA from "./components/MFA/MFA";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useGlobalContext } from "./context/ContextProvider";
import { blue } from "@mui/material/colors";

function App() {
  //@ts-ignore
  const { isAuthenticated } = useGlobalContext();

  const theme = createTheme({
    palette: {
      primary: {
        main: "#8F001A",
      },
      secondary: {
        main: blue[700],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/reset" element={<Reset />} />
          {/* Should be like this oauth?identity=SOME_IDENTITY_STRING but I'm not sure about the identity params... */}
          <Route path="/portal" element={<Portal />} />
          <Route path="/auth/mfa" element={<MFA />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
