import React, { useState, useEffect, useCallback } from "react";
import YouTube from "react-youtube";

const YouTubeReplayPlayer = ({ videoId, clips }) => {
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentClipIndex, setCurrentClipIndex] = useState(0);

  const onReady = (event) => {
    setPlayer(event.target);
  };

  const stopClips = useCallback(() => {
    player.pauseVideo();
    setIsPlaying(false);
    setCurrentClipIndex(0);
  }, [player]);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      player.seekTo(clips[currentClipIndex].start);
      player.playVideo();
      timer = setTimeout(() => {
        if (currentClipIndex + 1 === clips.length) {
          stopClips();
          return;
        }
        setCurrentClipIndex(currentClipIndex + 1);
      }, (clips[currentClipIndex].end - clips[currentClipIndex].start) * 1000);
    }
    return () => clearTimeout(timer);
  }, [currentClipIndex, isPlaying, clips, player, stopClips]);

  const playClips = () => {
    setIsPlaying(true);
  };

  return (
    <div>
      <YouTube videoId={videoId} onReady={onReady} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={playClips} disabled={isPlaying}>
          Play Clips
        </button>
        <button onClick={stopClips} disabled={!isPlaying}>
          Stop
        </button>
      </div>
      {clips.map(({ start, end }, index) => (
        <div key={index}>
          Clip {index + 1}: {start}s to {end}s
        </div>
      ))}
    </div>
  );
};

export default YouTubeReplayPlayer;
