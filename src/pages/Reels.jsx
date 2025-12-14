import { useState, useEffect, useContext } from "react";
import instagramAPI from "../api/instagramAPI";
import { AuthContext } from "../context/AuthContext";

export default function Reels() {
  const [videos, setVideos] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await instagramAPI.get("/posts/all"); // fetch all posts
      // filter only posts with video
      setVideos(res.data.filter(post => post.video));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="reels-container">
      {videos.map(post => (
        <div key={post._id} className="reel-card">
          <div className="reel-user">{post.user.username}</div>
          <video src={post.video} controls loop style={{ width: "100%" }} />
          <p>{post.caption}</p>
        </div>
      ))}
    </div>
  );
}


