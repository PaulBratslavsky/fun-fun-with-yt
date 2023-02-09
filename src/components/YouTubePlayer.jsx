import React, { useState } from "react";
import YouTube from "react-youtube";
import YouTubeReplayPlayer from "./YouTubeReplayPlayer";

const YouTubePlayer = ({ videoId }) => {
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [clipStart, setClipStart] = useState(null);
  const [clips, setClips] = useState([]);
  const [replay, setReplay] = useState(false);
  const onReady = (event) => {
    setPlayer(event.target);
  };

  const playVideo = () => {
    player.playVideo();
    setIsPlaying(true);
  };

  const pauseVideo = () => {
    player.pauseVideo();
    setIsPlaying(false);
  };

  const restartVideo = () => {
    player.seekTo(0);
    player.playVideo();
    setIsPlaying(true);
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

  const togglePlayAllClips = () => {
    alert("This feature is not yet implemented. Sorry!");
    // Code to play all clips in a new video player window goes here
    setReplay((prevState) => !prevState);
  };

  return (
    <div>
      <button onClick={togglePlayAllClips}>{ replay ? "Full Video" : "Clips"}</button>
      {replay ? (
        <YouTubeReplayPlayer videoId={videoId} clips={clips} />
      ) : (
        <>
          <YouTube videoId={videoId} onReady={onReady} />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={playVideo} disabled={isPlaying}>
              Play
            </button>
            <button onClick={pauseVideo} disabled={!isPlaying}>
              Pause
            </button>
            <button onClick={restartVideo}>Restart</button>
            <button onClick={seekForward}>Seek Forward</button>
            <button onClick={seekBack}>Seek Back</button>
            <button onClick={setClip}>
              {clipStart === null ? "Set Start Time" : "Set End Time"}
            </button>
          </div>
          {clips.length > 0 && (
            <div>
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
        </>
      )}
    </div>
  );
};

export default YouTubePlayer;
