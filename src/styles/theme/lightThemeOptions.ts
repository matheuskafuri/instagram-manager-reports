import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
      light: "#0277bd",
    },
    secondary: {
      main: "#ff5722",
    },
    background: {
      paper: "#fff",
      default: "#fafafa",
    },
    error: {
      main: red.A400,
      dark: red[900],
    },
    text: {
      primary: "#02182B",
      secondary: "#fafafa",
    },
  },
});

export default theme;
