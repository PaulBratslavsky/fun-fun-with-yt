import React, { useState, useEffect, useCallback } from "react";
import YouTube from "react-youtube";

const YouTubePlayer = ({ videoId }) => {
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [clipStart, setClipStart] = useState(null);
  const [clips, setClips] = useState([]);
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

  const playVideo = () => {
    player.playVideo();
    // setIsPlaying(true);
  };

  const pauseVideo = () => {
    player.pauseVideo();
    // setIsPlaying(false);
  };

  const restartVideo = () => {
    player.seekTo(0);
    player.playVideo();
  };

  const setClip = () => {
    if (clipStart === null) {
      setClipStart(player.getCurrentTime());
    } else {
      setClips([...clips, { start: clipStart, end: player.getCurrentTime() }]);
      setClipStart(null);
    }
  };

  const seekForward = () => {
    player.seekTo(player.getCurrentTime() + 5, true);
  };

  const seekBack = () => {
    player.seekTo(player.getCurrentTime() - 5, true);
  };

  return (
    <div>
      <YouTube videoId={videoId} onReady={onReady} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={playVideo} disabled={isPlaying}>
          Play
        </button>
        <button onClick={pauseVideo}>Pause</button>
        <button onClick={restartVideo}>Restart</button>
        <button onClick={seekForward}>Seek Forward</button>
        <button onClick={seekBack}>Seek Back</button>
        <button onClick={setClip}>
          {clipStart === null ? "Set Start Time" : "Set End Time"}
        </button>
      </div>
      {clips.length > 0 && (
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={playClips} disabled={isPlaying}>
              Play Clips
            </button>
            <button onClick={stopClips}>Stop</button>
          </div>
          <h3>Clips:</h3>
          <ul>
            {clips.map((clip, index) => (
              <li key={index} onClick={() => player.seekTo(clip.start)}>
                Clip {index + 1}: {clip.start} - {clip.end}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default YouTubePlayer;
