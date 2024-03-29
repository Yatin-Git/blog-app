import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Services from "./pages/Services";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Privateroute from "./components/Privateroute";
import Userdashboard from "./pages/user-routes/Userdashboard";
import ProfileInfo from "./pages/user-routes/ProfileInfo";
import PostPage from "./pages/PostPage";
import UserProvider from "./context/UserProvider";
import Categories from "./pages/Categories";

function App() {
  return (
    <UserProvider>
    <BrowserRouter>
      <ToastContainer position="bottom-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/posts/:postId" element={<PostPage />} />
        <Route path="/categories/:categoryId" element={<Categories />} />
        <Route path="/user" element={<Privateroute />}>
          <Route path="dashboard" element={<Userdashboard />} />
          <Route path="profile-info" element={<ProfileInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
