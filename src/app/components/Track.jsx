import Image from "next/image";
import play from "public/images/icons/play.png"

const Track = ({}) => {

  return (
    <div className="audio-track">
      <div className="track-play-btn-wrapper">
        <button className="track-play-btn">
          <Image
            src={play}
            width={20}
            height={20}
            alt="Play button"
          />
        </button>
      </div>
      <div className="track-title-wrapper">
        <div className="track-title">
          Track Title
        </div>
      </div>
    </div>
  );
}

export default Track;