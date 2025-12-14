import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import instagramAPI from "../api/instagramAPI";
import "./PostDetail.css";

export default function PostDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await instagramAPI.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <p style={{ textAlign: "center", marginTop: "20px" }}>Loading post...</p>;
  if (!post) return <p style={{ textAlign: "center", marginTop: "20px" }}>Post not found.</p>;

  const hasLiked = post.likes.includes(user?._id);

  const toggleLike = async () => {
    try {
      const res = await instagramAPI.put(`/posts/${post._id}/like`);
      setPost((prev) => ({ ...prev, likes: res.data.likes }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const res = await instagramAPI.post(`/posts/${post._id}/comment`, { text: commentText });
      setPost((prev) => ({ ...prev, comments: res.data.comments }));
      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="post-detail-page">
      <div className="post-detail-card">
        <div className="post-image-section">
          {post.image && <img src={post.image} alt="Post" />}
        </div>

        <div className="post-info-section">
          <div className="post-user">
            <h4>{post.user.username}</h4>
          </div>

          <div className="post-actions">
            <button onClick={toggleLike}>
              {hasLiked ? "❤️ Liked" : "🤍 Like"} ({post.likes.length})
            </button>
          </div>

          <div className="post-caption">
            <b>{post.user.username}</b> {post.caption}
          </div>

          <div className="post-comments">
            {post.comments.map((c) => (
              <p key={c._id}>
                <b>{c.user.username}</b>: {c.text}
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
      </div>
    </div>
  );
}
