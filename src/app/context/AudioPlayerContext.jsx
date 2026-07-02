'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const AudioPlayerContext = createContext(null);

export const AudioPlayerProvider = ({ children }) => {
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playNow = useCallback((tracks) => {
    setQueue(tracks);
    setCurrentIndex(0);
    setIsPlaying(true);
  }, []);

  const addToQueue = useCallback((tracks) => {
    setQueue(prev => [...prev, ...tracks]);
  }, []);

  const next = useCallback((queueLength) => {
    setCurrentIndex(prev => Math.min(prev + 1, queueLength - 1));
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  return (
    <AudioPlayerContext value={{ queue, currentIndex, isPlaying, playNow, addToQueue, next, prev, togglePlay }}>
      {children}
    </AudioPlayerContext>
  );
};

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) throw new Error('useAudioPlayer must be used within AudioPlayerProvider');
  return context;
};
