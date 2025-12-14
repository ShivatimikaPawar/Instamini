import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import instagramAPI from "../api/instagramAPI.js";
import { AuthContext } from "../context/AuthContext.jsx";
import PostCard from "../components/PostCard.jsx";
import "./Profile.css";

export default function Profile() {
  const { id } = useParams();
  const { user, logout, updateProfilePic } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState(false);
  const [editing, setEditing] = useState(false); 
  const [editForm, setEditForm] = useState({ username: "", phone: "" });
  const [activeTab, setActiveTab] = useState("posts"); // Posts/Reels/Tagged

  const isCurrentUser = !id || id === user?._id;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const targetId = id || user?._id;
        const res = await instagramAPI.get(`/users/${targetId}`);
        const fetchedUser = res.data.user;
        setProfile(fetchedUser);
        setPosts(res.data.posts || []);

        // Check if current user follows this profile
        if(user && targetId !== user._id) {
          setFollowing(fetchedUser.followers.includes(user._id));
        }

        if(isCurrentUser){
          setEditForm({
            username: fetchedUser.username,
            phone: fetchedUser.phone || ""
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [id, user]);

  // Follow/Unfollow toggle
  const toggleFollow = async () => {
    try {
      await instagramAPI.post(`/users/${following ? "unfollow" : "follow"}/${profile._id}`);
      setFollowing(!following);

      // Update follower count locally
      setProfile(prev => ({
        ...prev,
        followers: following 
          ? prev.followers.filter(f => f !== user._id)
          : [...(prev.followers || []), user._id]
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = { ...editForm };
      const res = await instagramAPI.put(`/users/${user._id}`, formData);
      setProfile(res.data.user);
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const handleProfileUpload = async (e) => {
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        await instagramAPI.put(`/users/${user._id}/profilePic`, { profilePic: reader.result });
        setProfile(prev => ({ ...prev, profilePic: reader.result }));
        updateProfilePic?.(reader.result);
      } catch(err){
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

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-left">
          {profile.profilePic ? (
            <img src={profile.profilePic} alt="Profile" className="profile-pic" />
          ) : (
            <div className="profile-initial" style={{ backgroundColor: randomBgColor(profile.username) }}>
              {profile.username?.charAt(0)?.toUpperCase()}
            </div>
          )}
          {isCurrentUser && editing && <input type="file" onChange={handleProfileUpload} />}
        </div>

        <div className="profile-right">
          <div className="profile-top">
            <h2>{profile.username || user?.username}</h2>


            {isCurrentUser && !editing && (
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            )}
          </div>

          <div className="profile-stats">
            <span><b>{posts.length}</b> posts</span>
            <span><b>{profile.followers?.length || 0}</b> followers</span>
            <span><b>{profile.following?.length || 0}</b> following</span>
          </div>

          {isCurrentUser && editing && (
            <form className="edit-form" onSubmit={handleEditSubmit}>
              <input
                type="text"
                placeholder="Username"
                value={editForm.username}
                onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Phone"
                value={editForm.phone}
                onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
              />
              <button type="submit" className="follow-btn">Save</button>
            </form>
          )}
        </div>
      </div>

      {/* Tabs for Posts / Reels / Tagged */}
      <div className="profile-tabs">
        <button
          className={activeTab === "posts" ? "active" : ""}
          onClick={() => setActiveTab("posts")}
        >
          Posts
        </button>
        <button
          className={activeTab === "reels" ? "active" : ""}
          onClick={() => setActiveTab("reels")}
        >
          Reels
        </button>
        <button
          className={activeTab === "tagged" ? "active" : ""}
          onClick={() => setActiveTab("tagged")}
        >
          Tagged
        </button>
      </div>

      <div className="profile-posts">
        {activeTab === "posts" && posts.map((p) => <PostCard key={p._id} post={p} />)}
        {activeTab === "reels" && <p style={{ textAlign: "center", marginTop: "20px" }}>No reels yet.</p>}
        {activeTab === "tagged" && <p style={{ textAlign: "center", marginTop: "20px" }}>No tagged posts.</p>}
      </div>
    </div>
  );
}




