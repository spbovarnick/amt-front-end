import Image from "next/image";
import { Howler } from "howler";
import { useEffect, useState } from "react";

import play from "public/images/icons/play.png";
import pause from "public/images/icons/pause.png";
import next from "public/images/icons/next.png"
import previous from "public/images/icons/previous.png"

const Player = ({
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  isPlaying,
  selectedMusic,
  setIsPlaying,
  trackTitle
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [trackedMusic, setTrackedMusic] = useState(selectedMusic);

  if (selectedMusic !== trackedMusic) {
    setTrackedMusic(selectedMusic);
    setCurrentTime(0);
  }

  useEffect(() => {
    let timerInterval;

    if (selectedMusic) {
      const updateTimer = () => {
        const seekTimer = Math.round(selectedMusic.seek());
        setCurrentTime(seekTimer);
      }
      timerInterval = setInterval(updateTimer, 1000);
    }

    return () => {
      clearInterval(timerInterval);
    }
  }, [selectedMusic])

  const togglePlay = () => {
    if (!selectedMusic) return;

    if (isPlaying) {
      selectedMusic.pause();
      setIsPlaying(false);
    } else {
      selectedMusic.play();
      setIsPlaying(true);
    }
  }

  const handleVolumeChange = (e) => {
    Howler.volume(parseInt(e.target.value, 10) / 100);
  }

  const handleSeekChange = (e) => {
    let seekTime = 0;
    seekTime = parseInt(e.target.value, 10);
    setCurrentTime(seekTime);
    selectedMusic.seek(seekTime);
  }

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  const formattedTime = formatTime(currentTime)

  return (
    <div className="player">
      <div className="player-inner">
        <div className="active-title">{selectedMusic && trackTitle}</div>
        <div className="music-control-center">
          <label
            htmlFor="durationController"
          >Duration</label>
          <input
            className="duration-controller"
            type="range"
            min="0"
            max={selectedMusic ? selectedMusic.duration() : 0}
            value={currentTime}
            onChange={handleSeekChange}
          ></input>
          <div>{formattedTime}</div>
          <button
            className="howl-prev-btn"
            onClick={onPrevious}
            disabled={!hasPrevious}
          >
            <Image
              src={previous}
              width={20}
              height={20}
              alt="Previous track"
            />
          </button>
          <button
            className="play-btn"
            onClick={togglePlay}
          >
            <Image
              src={isPlaying ? pause : play}
              width={20}
              height={20}
              alt="Play button"
            />
          </button>
          <button
            className="howl-next-btn"
            onClick={onNext}
            disabled={!hasNext}
          >
            <Image
              src={next}
              width={20}
              height={20}
              alt="Next track"
            />
          </button>
          <label htmlFor="volumeController">Volume</label>
          <input
            className="volume-controller"
            onChange={handleVolumeChange}
            name="volumeController"
            type="range"
            max="100"
            defaultValue="100"
          ></input>
        </div>
      </div>
    </div>
  );
}

export default Player