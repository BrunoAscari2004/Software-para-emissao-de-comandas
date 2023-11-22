import { ThemeProvider } from "@mui/material";
import Home from "./pages/Home";
import "./shared/styles/global.scss";
import { mainTheme } from "./MuiTheme";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <Toaster />
      <Home />
    </ThemeProvider>
  );
}

export default App;
