import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Feed from "./pages/Feed.jsx";
import Profile from "./pages/Profile.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/home.jsx";
import Feedd from "./pages/Feed.jsx";
import SearchUsers from "./pages/SearchUsers.jsx";
import Reels from "./pages/Reels.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/SearchUsers" element={<SearchUsers />} />
        <Route path="/Feed" element={<Feedd />} />
        <Route path="/Reels" element={<Reels />} />
      </Routes>
    </>
  );
}

export default App;




