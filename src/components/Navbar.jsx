import React, { useContext, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import Toggle from "./Toggle";
import "./Navbar.css";

export default function Navbar() {
  const { user, updateProfilePic } = useContext(AuthContext);
  const [profilePic, setProfilePic] = useState(user?.profilePic || null);
  const navigate = useNavigate();

  const postInputRef = useRef(null);

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfilePic(reader.result);
      updateProfilePic?.(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handlePostClick = () => {
    postInputRef.current.click();
  };

  const handlePostUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        await fetch("http://localhost:5000/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            image: file.type.startsWith("image/") ? reader.result : "",
            video: file.type.startsWith("video/") ? reader.result : "",
            caption: "",
          }),
        });
        alert("Post uploaded!");
        navigate("/reels");
      } catch (err) {
        console.error(err);
      }
    };
    reader.readAsDataURL(file);
  };

  const randomBgColor = (username = "U") => {
    const colors = [
      "#f28b82","#fbbc04","#fff475","#ccff90","#a7ffeb",
      "#cbf0f8","#aecbfa","#d7aefb","#fdcfe8"
    ];
    return colors[username.charCodeAt(0) % colors.length];
  };

  const openProfile = () => navigate("/profile");

  return (
    <nav className="navbar desktop-navbar">
      <div className="nav-logo">
        <Link to="/" className="logo">
          <span className="full-logo">InstaMini</span>
          <img src="/mini.png" alt="InstaMini" className="mini-logo" />
        </Link>
      </div>

      <div className="nav-links">
        <Link to="/home" className="nav-link">
          <img src="/home.png" alt="Home" className="link-icon" /> Home
        </Link>

        <Link to="/search" className="nav-link">
          <img src="/search.png" alt="Search" className="link-icon" /> Search
        </Link>

        {/* + Post link like others */}
        {user && (
          <div className="nav-link" onClick={handlePostClick}>
            <span className="link-icon">+</span> Post
          </div>
        )}
        <input
          type="file"
          accept="image/*,video/*"
          ref={postInputRef}
          style={{ display: "none" }}
          onChange={handlePostUpload}
        />

        <Link to="/reels" className="nav-link">
          <img src="/reels.png" alt="Reels" className="link-icon" /> Reels
        </Link>

        <Link to="/messages" className="nav-link">
          <img src="/messages.png" alt="Messages" className="link-icon" /> Messages
        </Link>

        {user && (
          <div
            className="profile-wrapper"
            onClick={openProfile}
            style={{ cursor: "pointer" }}
          >
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="profile-icon" />
            ) : (
              <div
                className="profile-initial"
                style={{ backgroundColor: randomBgColor(user?.username) }}
              >
                {user?.username?.charAt(0).toUpperCase()}
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleProfileUpload}
            />
          </div>
        )}

        {!user && <Link to="/login">Login</Link>}
      </div>

      <div className="nav-toggle">
        <Toggle />
      </div>
    </nav>
  );
}








