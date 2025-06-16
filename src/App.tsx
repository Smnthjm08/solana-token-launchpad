import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import TokenLaunchpad from "./components/token-launchpad";
import Appbar from "./components/appbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Appbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/token-launchpad" element={<TokenLaunchpad />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
