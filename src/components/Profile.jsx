import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import instagramAPI from "../api/instagramAPI";
import { AuthContext } from "../context/AuthContext";
import PostCard from "../components/PostCard";
import "./Profile.css";

export default function Profile() {
  const { id } = useParams();
  const { user: authData, logout } = useContext(AuthContext);
  const loggedInUser = authData?.user;

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const targetId = id || loggedInUser?._id;
        if (!targetId) return;

        const res = await instagramAPI.get(`/users/${targetId}`);
        setProfile(res.data.user);
        setPosts(res.data.posts || []);
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };

    fetchProfile();
  }, [id, loggedInUser]);

  if (!profile) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h2>{profile.username}</h2>
        {!id && <button onClick={logout}>Logout</button>}
      </div>

      <div className="profile-stats">
        <span><b>{posts.length}</b> posts</span>
        <span><b>{profile.followers?.length || 0}</b> followers</span>
        <span><b>{profile.following?.length || 0}</b> following</span>
      </div>

      <div className="profile-posts">
        {posts.map((p) => (
          <PostCard key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}


