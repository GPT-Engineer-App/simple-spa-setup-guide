import { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
const Index = lazy(() => import("./pages/Index.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const Blog = lazy(() => import("./pages/Blog.jsx"));
const CreateEditPost = lazy(() => import("./pages/CreateEditPost.jsx"));
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/new" element={<CreateEditPost />} />
          <Route path="/blog/edit/:id" element={<CreateEditPost />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;