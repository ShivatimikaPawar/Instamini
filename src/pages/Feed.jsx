import { useState, useEffect, useContext } from "react";
import instagramAPI from "../api/instagramAPI";
import { AuthContext } from "../context/AuthContext";
import PostCard from "../components/PostCard";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await instagramAPI.get("/posts/all"); // fetch all posts
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="main-content" style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h2>Home Feed</h2>
      {posts.map(post => <PostCard key={post._id} post={post} />)}
    </div>
  );
}






