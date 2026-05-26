import React, { useEffect, useRef, useState } from 'react';
import './MusicPlayer.css';

function MusicPlayer() {
  const audioRef = useRef(null);

  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const startMusic = async () => {
      try {
        await audioRef.current.play();
        setPlaying(true);

        window.removeEventListener('scroll', startMusic);
        window.removeEventListener('click', startMusic);
      } catch (err) {
        console.log('Erro ao tocar música:', err);
      }
    };

    window.addEventListener('scroll', startMusic);
    window.addEventListener('click', startMusic);

    return () => {
      window.removeEventListener('scroll', startMusic);
      window.removeEventListener('click', startMusic);
    };
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      await audioRef.current.play();
      setPlaying(true);
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/i_got_you.mp3" type="audio/mpeg" />
      </audio>

      <div className="music-player-mini">
        <button className="play-button" onClick={toggleMusic}>
          {playing ? '⏸' : '▶'}
        </button>

        <span className="music-name">Morganna & Rafael</span>
      </div>
    </>
  );
}

export default MusicPlayer;
