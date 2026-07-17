import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import Track from "./Track";
import Player from "./Player";

const formatDuration = (seconds) => {
  if (!seconds && seconds !== 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const MusicBox = ({trackList}) => {
  const [duration, setDuration] = useState({});
  const [howls, setHowls] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState();
  const [trackTitle, setTrackTitle] = useState("");

  const howlsRef = useRef({});
  const retriesRef = useRef({});

  useEffect(() => {
    const isInitialLoad = Object.keys(howlsRef.current).length === 0;
    const currentUrls = new Set(trackList.map((track) => track.url));
    const maxRetries = 3;

    Object.keys(howlsRef.current).forEach((url) => {
      if (currentUrls.has(url)) return;

      howlsRef.current[url].unload();
      delete howlsRef.current[url];
      delete retriesRef.current[url];
    });

    const createHowl = (url) => {
      const howl = new Howl({
        src: [url],
        html5: true,
        onload: () => {
          setDuration((prev) => ({ ...prev, [url]: howl.duration() }));
        },
        onloaderror: (_id, error) => {
          const attempt = (retriesRef.current[url] || 0) + 1;
          retriesRef.current[url] = attempt;

          if (attempt <= maxRetries) {
            console.warn(`Retrying audio load (${attempt}/${maxRetries}) for ${url}:`, error);
            setTimeout(() => {
              howlsRef.current[url] = createHowl(url);
              setHowls({ ...howlsRef.current });
            }, 500 * attempt);
          } else {
            console.error(`Failed to load audio duration for ${url} after ${maxRetries} retries:`, error);
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
      setTrackTitle(trackList[0].title);
    }
  }, [trackList]);

  return (
    <div className="music-box">
      <ul>
        {trackList.map((track, i) =>(
          <li key={track.title + i}>
            <Track
              trackTitle={track.title}
              music={howls[track.url]}
              duration={formatDuration(duration[track.url])}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              selectedMusic={selectedMusic}
              setSelectedMusic={setSelectedMusic}
              setTrackTitle={setTrackTitle}
            />
          </li>
        ))}
      </ul>
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        selectedMusic={selectedMusic}
        trackTitle={trackTitle}
      />
    </div>
  );
}

export default MusicBox;