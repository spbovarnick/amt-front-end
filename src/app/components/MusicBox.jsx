import { useEffect, useRef, useState } from "react";
import { Howl, Howler } from "howler";
import Track from "./Track";
import Player from "./Player";

const formatDuration = (seconds) => {
  if (!seconds && seconds !== 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const MusicBox = ({trackList}) => {
  const [howls, setHowls] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState();
  const [trackTitle, setTrackTitle] = useState("");
  const [trackArtist, setTrackArtist] = useState("");
  const [trackAlbum, setTrackAlbum] = useState("");

  const howlsRef = useRef({});
  const retriesRef = useRef({});
  const retryTimeoutsRef = useRef({});

  useEffect(() => {
    const isInitialLoad = Object.keys(howlsRef.current).length === 0;
    const currentUrls = new Set(trackList.map((track) => track.url));
    const maxRetries = 3;

    Object.keys(howlsRef.current).forEach((url) => {
      if (currentUrls.has(url)) return;

      howlsRef.current[url].unload();
      delete howlsRef.current[url];
      delete retriesRef.current[url];
      clearTimeout(retryTimeoutsRef.current[url]);
    });

    const createHowl = (url) => {
      const howl = new Howl({
        src: [url],
        html5: true,
        preload: false,
        onloaderror: (_id, error) => {
          const attempt = (retriesRef.current[url] || 0) + 1;
          retriesRef.current[url] = attempt;

          if (attempt <= maxRetries) {
            console.warn(`Retrying audio load (${attempt}/${maxRetries}) for ${url}:`, error);
            retryTimeoutsRef.current[url] = setTimeout(() => {
              howlsRef.current[url] = createHowl(url);
              setHowls({ ...howlsRef.current });
            }, 500 * attempt);
          } else {
            console.error(`Failed to load audio for ${url} after ${maxRetries} retries:`, error);
          }
        },
      });

      return howl;
    };

    trackList.forEach(({ url }) => {
      if (howlsRef.current[url]) return;

      howlsRef.current[url] = createHowl(url);
    });

    setHowls({ ...howlsRef.current });

    if (isInitialLoad && trackList[0]) {
      setSelectedMusic(howlsRef.current[trackList[0].url]);
      setTrackTitle(trackList[0].title ? trackList[0].title : trackList[0].filename);
      setTrackAlbum(trackList[0].album);
      setTrackArtist(trackList[0].artist);
    }
  }, [trackList]);

  useEffect(() => {
    return () => {
      Object.values(retryTimeoutsRef.current).forEach(id => {
        clearTimeout(id)
      })
      Howler.unload();
    };
  }, [])

  const selectTrack = (music, title, album, artist) => {
    if (!music) return;

    selectedMusic?.playing() && selectedMusic.pause();
    if (selectedMusic !== music) music.seek(0);
    music.play();
    setSelectedMusic(music);
    setIsPlaying(true);
    setTrackTitle(title);
    setTrackAlbum(album);
    setTrackArtist(artist);
  };

  const currentIndex = trackList.findIndex((track) => howls[track.url] === selectedMusic);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < trackList.length - 1;

  const onPrevious = () => {
    const track = trackList[currentIndex - 1];
    const title = track.title ? track.title : track.filename
    selectTrack(howls[track.url], title , track.album, track.artist);
  };

  const onNext = () => {
    const track = trackList[currentIndex + 1];
    const title = track.title ? track.title : track.filename
    selectTrack(howls[track.url], title, track.album, track.artist);
  };

  return (
    <div className="music-box">
      <div className="album-info">
        <div className="artist-name-hl">{selectedMusic && trackArtist}</div>
        <div className="album-title-hl">{selectedMusic && trackAlbum}</div>
      </div>
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        selectedMusic={selectedMusic}
        trackTitle={trackTitle}
        onPrevious={onPrevious}
        onNext={onNext}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
      />
      <table className="track-table">
        <tbody>
        {trackList.map((track, i) =>(
          <tr className="track-row" key={`${track.title || track.filename}-${i}`}>
            <Track
              trackTitle={track.title ? track.title : track.filename}
              music={howls[track.url]}
              album={track.album ? track.album : ""}
              track={track}
              artist={track.artist ? track.artist : ""}
              duration={formatDuration(track.duration)}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              selectedMusic={selectedMusic}
              selectTrack={selectTrack}
              trackNumber={i+1}
            />
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default MusicBox;