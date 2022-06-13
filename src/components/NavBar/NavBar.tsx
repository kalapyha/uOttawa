import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Link, useLocation } from "react-router-dom";
import { pathTransform } from "../../utils/helpers";
import { useGlobalContext } from "../../context/ContextProvider";

export default function NavBar(props: {
  isAuthenticated: boolean;
}): JSX.Element {
  const { pathname } = useLocation();

  //@ts-ignore context type
  const { logOutUser } = useGlobalContext();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {pathTransform(pathname)} Page
          </Typography>
          {props.isAuthenticated ? (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                sx={{ color: "white", borderColor: "white" }}
                onClick={logOutUser}
              >
                Logout
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Typography
                  variant="body2"
                  color="white"
                  sx={{ textTransform: "capitalize" }}
                >
                  Login
                </Typography>
              </Link>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ m: 2, bgcolor: "#fff" }}
              />
              <Link to="/register" style={{ textDecoration: "none" }}>
                <Typography
                  variant="body2"
                  color="white"
                  sx={{ textTransform: "capitalize" }}
                >
                  Sign Up
                </Typography>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
