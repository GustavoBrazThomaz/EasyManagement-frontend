import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Appbar from "./components/Appbar/Appbar";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Appbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
