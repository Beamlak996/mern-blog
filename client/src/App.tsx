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
import AdminPrivateRoute from "./components/admin-private-route";
import { CreatePost } from "./pages/create-post";
import { UpdatePost } from "./pages/update-post";
import { PostPage } from "./components/post-page";

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
        <Route element={<AdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path={`/update-post/:postId`} element={<UpdatePost />} />
        </Route>
        <Route path="/projects" element={<Projects />} />
        <Route path="/post/:postSlug" element={<PostPage />} />
      </Routes>
      <FooterCom />
    </BrowserRouter>
  );
}

export default App;
