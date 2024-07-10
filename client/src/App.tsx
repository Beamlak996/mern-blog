import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Home } from "./pages/home"
import { About } from "./pages/about"
import { SignIn } from "./pages/signin"
import { SignUp } from "./pages/signup"
import { Dashobard } from "./pages/dashboard"
import { Projects } from "./pages/projects"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashobard />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
