import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Navbar from "./components/Navbar";
import MyBlogsScreen from "./screens/MyBlogsScreen";
import BlogForm from "./components/BlogForm";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/myblogs" element={<MyBlogsScreen />} />
          <Route path="/blogForm/:blogId" element={<BlogForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
