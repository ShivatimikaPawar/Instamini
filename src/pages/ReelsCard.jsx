import React from "react";
import "./ReelsCard.css";

export default function ReelsCard({ reel }) {
  return (
    <div className="reel-card">
      <video
        src={reel.video}
        controls
        loop
        muted
        className="reel-video"
      />
      <div className="reel-caption">
        <b>{reel.user.username}</b>: {reel.caption}
      </div>
    </div>
  );
}

