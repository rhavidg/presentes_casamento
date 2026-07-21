import React, { useEffect, useRef, useState } from "react";
import "./MusicPlayer.css";

function MusicPlayer() {
  const audioRef = useRef(null);
  const startedRef = useRef(false);

  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    const startMusic = async () => {
      if (!audio || startedRef.current || !audio.paused) return;

      startedRef.current = true;

      try {
        await audio.play();
      } catch (err) {
        startedRef.current = false;
        console.log("Erro ao tocar música:", err);
      }
    };

    window.addEventListener("click", startMusic, { once: true });
    window.addEventListener("scroll", startMusic, { once: true });

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);

      window.removeEventListener("click", startMusic);
      window.removeEventListener("scroll", startMusic);
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch (err) {
      console.log("Erro ao controlar música:", err);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="musica.mp3" type="audio/mpeg" />
      </audio>

      <div className="music-player-mini">
        <button className="play-button" onClick={toggleMusic}>
          {playing ? "⏸" : "▶"}
        </button>

        <span className="music-name">Morganna & Rafael</span>
      </div>
    </>
  );
}

export default MusicPlayer;
