import { useState } from "react";
import instagramAPI from "../api/instagramAPI.js";

export default function PostCard({ post }) {
  const [likes, setLikes] = useState(post.likes.length);

  const likePost = async () => {
    try {
      const res = await instagramAPI.post(`/posts/like/${post._id}`);
      setLikes(res.data.likes.length);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="post-card">
      <h4>{post.user.username}</h4>

      {post.image && <img src={post.image} alt="post" style={{ width: "100%" }} />}
      {post.video && (
        <video src={post.video} controls style={{ width: "100%" }} />
      )}

      <p>{post.caption}</p>
      <button onClick={likePost}>❤️ {likes}</button>

      <div className="comments">
        {post.comments.map((c) => (
          <p key={c._id}><b>{c.user.username}</b>: {c.text}</p>
        ))}
      </div>
    </div>
  );
}


