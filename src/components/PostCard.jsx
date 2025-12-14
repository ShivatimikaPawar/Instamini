import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import instagramAPI from "../api/instagramAPI";
import "./PostCard.css";

export default function PostCard({ post }) {
  const { user } = useContext(AuthContext);
  const [likes, setLikes] = useState(post.likes || []);
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState("");

  const hasLiked = likes.includes(user?._id);

  const toggleLike = async () => {
    try {
      const res = await instagramAPI.put(`/posts/${post._id}/like`);
      setLikes(res.data.likes);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const res = await instagramAPI.post(`/posts/${post._id}/comment`, {
        text: commentText,
      });
      setComments(res.data.comments);
      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <h4>{post.user.username}</h4>
      </div>

      {post.image && <img src={post.image} alt="Post" className="post-image" />}

      <div className="post-actions">
        <button onClick={toggleLike}>
          {hasLiked ? "❤️ Liked" : "🤍 Like"} ({likes.length})
        </button>
      </div>

      <div className="post-caption">
        <b>{post.user.username}</b> {post.caption}
      </div>

      <div className="post-comments">
        {comments.map((c) => (
          <p key={c._id}>
            <b>{c.user.username}:</b> {c.text}
          </p>
        ))}
      </div>

      <form className="comment-form" onSubmit={handleAddComment}>
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}



