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

  useEffect(() => {
    const isInitialLoad = Object.keys(howlsRef.current).length === 0;

    trackList.forEach(({ url }) => {
      if (howlsRef.current[url]) return;

      const howl = new Howl({
        src: [url],
        html5: true,
        onload: () => {
          setDuration((prev) => ({ ...prev, [url]: howl.duration() }));
        },
      });

      howlsRef.current[url] = howl;
    });

    setHowls({ ...howlsRef.current });

    if (isInitialLoad && trackList[0]) {
      setSelectedMusic(howlsRef.current[trackList[0].url]);
    }

    return () => {
      Object.values(howlsRef.current).forEach((howl) => howl.unload());
      howlsRef.current = {};
    };
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
              setTrackDetail={setTrackTitle}
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