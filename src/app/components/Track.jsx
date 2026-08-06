import Image from "next/image";
import play from "public/images/icons/play.png";
import pause from "public/images/icons/pause.png";

const Track = ({
  music,
  trackTitle,
  duration,
  isPlaying,
  setIsPlaying,
  selectedMusic,
  selectTrack,
  trackNumber
}) => {

  const handleToggle = () => {
    if (!music) return;

    if (music.playing()) {
      music.pause();
      setIsPlaying(false);
      return;
    }

    selectTrack(music, trackTitle);
  }

  return (
    <>
      <td className="play-col">
        <div
          className={`track-play-btn ${selectedMusic === music && isPlaying ? "is-playing" : ""}`}
          onClick={handleToggle}
        ></div>
      </td>
      <td className="track-num-col">
        <div className="track-num">{trackNumber}.</div>
      </td>
      <td className="title-col">
        <div className="track-title">{trackTitle}</div>
        <span className="runtime">{duration}</span>
      </td>
    </>
  );
}

export default Track;