import Image from "next/image";
import { useEffect, useState } from "react";
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
      <table>
        <tbody>
          <tr>
            <td className="play-cell" rowSpan={2}>
              <button
                className={`play-btn ${isPlaying ? "is-playing" : ""}`}
                onClick={togglePlay}
              ></button>
            </td>
            <td className="track-cell" colSpan={3}>
              <div className="active-track-info">
                <span className="active-title">{selectedMusic && trackTitle}</span>
                <span className="player-time">{formattedTime}</span>
              </div>

            </td>
          </tr>
          <tr>
            <td className="duration-cell">
              <input
                className="duration-controller"
                type="range"
                min="0"
                max={selectedMusic ? selectedMusic.duration() : 0}
                value={currentTime}
                onChange={handleSeekChange}
              ></input>
            </td>
            <td className="prev-cell">
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
            </td>
            <td className="next-cell">
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
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Player