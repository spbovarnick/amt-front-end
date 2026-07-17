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
  setSelectedMusic,
  setTrackTitle,
}) => {

  const handleToggle = () => {
    if (!music) return;

    setTrackTitle(trackTitle);

    if (music.playing()) {
      music.pause();
      setIsPlaying(false);
      return;
    }
    selectedMusic?.playing() && selectedMusic.pause();
    if (selectedMusic !== music) music.seek(0);
    music.play();
    setSelectedMusic(music);
    setIsPlaying(true);
  }

  return (
    <div className="audio-track">
      <div className="track-play-btn-wrapper">
        <button
          className="track-play-btn"
          onClick={handleToggle}
        >
          { selectedMusic === music && isPlaying ?
            <Image
              src={pause}
              width={20}
              height={20}
              alt="Play button"
            />
            :
            <Image
              src={play}
              width={20}
              height={20}
              alt="Play button"
            />
          }
        </button>
      </div>
      <div className="track-title-wrapper">
        <div className="track-title">
          {trackTitle}
        </div>
      </div>
      <div className="track-length">
        {duration}
      </div>
    </div>
  );
}

export default Track;