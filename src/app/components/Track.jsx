const Track = ({
  music,
  trackTitle,
  album,
  artist,
  duration,
  isPlaying,
  setIsPlaying,
  selectedMusic,
  selectTrack,
  trackNumber,
}) => {

  const handleToggle = () => {
    if (!music) return;

    if (music.playing()) {
      music.pause();
      setIsPlaying(false);
      return;
    }

    selectTrack(music, trackTitle, album, artist);
  }

  return (
    <>
      <td className="play-col">
        <div
          className={`track-play-btn ${selectedMusic === music && isPlaying ? "is-playing" : ""}`}
          onClick={handleToggle}
        ></div>
      </td>
      {/* holding track number for now in case asked to return it */}
      {/* <td className="track-num-col">
        <div className="track-num">{trackNumber}.</div>
      </td> */}
      <td
        className="title-col"
        onClick={handleToggle}
      >
        <span className="track-title">{trackTitle}</span>
        <span className="runtime">{duration}</span>
      </td>
    </>
  );
}

export default Track;