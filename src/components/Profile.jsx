import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import "./Profile.css";

export default function Profile() {
  const { user, updateProfilePic, logout } = useContext(AuthContext);
  const [name, setName] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [profilePic, setProfilePic] = useState(user?.profilePic || null);

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

  const handleLogout = () => {
    logout();
    window.close(); // close profile tab
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>My Profile</h2>

        <div className="profile-pic-wrapper">
          {profilePic ? (
            <img src={profilePic} alt="Profile" className="profile-pic" />
          ) : (
            <div className="profile-initial">{name?.charAt(0).toUpperCase()}</div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleProfileUpload}
          />
        </div>

        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email:</label>
        <input value={email} disabled />

        <label>Phone:</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} />

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
