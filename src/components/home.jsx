import React, { useRef, useState, useEffect } from "react";
import "./Home.css";

export default function Home() {
  const reels = [
    { id: 1, url: "/reel1.mp4", caption: "Funny cat!" },
    { id: 2, url: "/reel2.mp4", caption: "Cool dance" },
    { id: 3, url: "/reel3.mp4", caption: "Amazing trick" },
    { id: 4, url: "/reel4.mp4", caption: "Nature vibes" },
    { id: 5, url: "/reel5.mp4", caption: "Tech review" },
    { id: 6, url: "/reel6.mp4", caption: "Travel diary" },
    { id: 7, url: "/reel7.mp4", caption: "Food recipe" },
  ];

  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const handleScroll = () => {
      const videos = container.querySelectorAll("video");
      videos.forEach((video, index) => {
        const rect = video.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          video.play();
          setActiveIndex(index);
        } else {
          video.pause();
        }
      });
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLike = (id) => alert(`Liked video ${id}`);
  const handleComment = (id) => {
    const comment = prompt("Enter your comment:");
    if (comment) alert(`Comment on video ${id}: ${comment}`);
  };

  return (
    <div className="reels-feed" ref={containerRef}>
      {reels.map((reel) => (
        <div key={reel.id} className="reel-container">
          <video
            src={reel.url}
            className="reel-video"
            loop
            muted
            playsInline
          />
          <div className="reel-overlay">
            <p className="reel-caption">{reel.caption}</p>
            <div className="reel-actions">
              <button onClick={() => handleLike(reel.id)}>❤️ Like</button>
              <button onClick={() => handleComment(reel.id)}>💬 Comment</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}