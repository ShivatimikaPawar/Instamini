import React, { useRef } from "react";
import "./Reels.css";

export default function Reels() {
  const reels = [
    { id: 1, video: "/reel1.mp4", caption: "🔥 Reel One" },
    { id: 2, video: "/reel2.mp4", caption: "😎 Reel Two" },
    { id: 3, video: "/reel3.mp4", caption: "🎵 Reel Three" },
    { id: 4, video: "/reel4.mp4", caption: "✨ Reel Four" },
    { id: 5, video: "/reel5.mp4", caption: "🚀 Reel Five" },
    { id: 6, video: "/reel6.mp4", caption: "❤️ Reel Six" },
  ];

  const videoRefs = useRef([]);

  const handlePlayPause = (index) => {
    const video = videoRefs.current[index];
    if (video.paused) video.play();
    else video.pause();
  };

  return (
    <div className="reels-page">
      {reels.map((reel, index) => (
        <div className="reel-container" key={reel.id}>
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            src={reel.video}
            className="reel-video"
            loop
            muted
            autoPlay
            playsInline
            onClick={() => handlePlayPause(index)}
          />
          <div className="reel-overlay">
            <p>{reel.caption}</p>
            <div className="actions">
              ❤️<br />💬<br />↗
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}





