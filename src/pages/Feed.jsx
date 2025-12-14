import React, { useEffect, useState, useContext } from "react";
import instagramAPI from "../api/instagramAPI";
import { AuthContext } from "../context/AuthContext";
import PostCard from "../components/PostCard";
import "./Feed.css";

export default function Feedd() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        if (!user) return;
        const res = await instagramAPI.get("/posts/feed"); // backend route for feed
        setPosts(res.data.posts || []);
      } catch (err) {
        console.error("Feed fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, [user]);

  if (loading) return <p style={{ textAlign: "center", marginTop: "20px" }}>Loading feed...</p>;
  if (!posts.length) return <p style={{ textAlign: "center", marginTop: "20px" }}>No posts to show.</p>;

  return (
    <div className="feed-page">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}








