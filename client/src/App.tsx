import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./pages/home";
import { About } from "./pages/about";
import { SignIn } from "./pages/signin";
import { SignUp } from "./pages/signup";
import { Dashobard } from "./pages/dashboard";
import { Projects } from "./pages/projects";
import { Header } from "./components/header";
import { FooterCom } from "./components/footer";
import PrivateRoute from "./components/private-route";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashobard />} />
        </Route>
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <FooterCom />
    </BrowserRouter>
  );
}

export default App;
