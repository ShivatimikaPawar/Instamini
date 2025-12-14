import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instagramAPI from "../api/instagramAPI";

export default function CreatePost() {
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [caption, setCaption] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await instagramAPI.post("/posts", { image, video, caption });
      navigate("/home"); // redirect to home
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "300px" }}>
        <h2>Create Post</h2>
        <input type="text" placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} />
        <input type="text" placeholder="Video URL" value={video} onChange={e => setVideo(e.target.value)} />
        <input type="text" placeholder="Caption" value={caption} onChange={e => setCaption(e.target.value)} />
        <button type="submit" style={{ marginTop: "10px" }}>Post</button>
      </form>
    </div>
  );
}






