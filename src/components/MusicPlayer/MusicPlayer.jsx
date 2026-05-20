import React, { useEffect, useRef, useState } from 'react';
import './MusicPlayer.css';

function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const musicInfo = {
    title: 'SoundHelix Song 1',
    artist: 'SoundHelix',
    album: 'Demo Tracks',
  };

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

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

  const toggleMusic = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setPlaying(true);
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const percentage = clickPosition / progressBar.clientWidth;
    audioRef.current.currentTime = percentage * duration;
  };

  return (
    <>
      <audio ref={audioRef} loop autoPlay={false}>
        <source
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          type="audio/mpeg"
        />
      </audio>

      <div className={`music-player-floating ${minimized ? 'minimized' : ''}`}>
        <div className="player-header">
          <div className="player-info">
            <div className="music-icon">🎵</div>
            {!minimized && (
              <div className="music-details">
                <div className="music-title">{musicInfo.title}</div>
                <div className="music-artist">{musicInfo.artist}</div>
              </div>
            )}
          </div>
          <div className="header-controls">
            <button
              className="control-btn minimize-btn"
              onClick={() => setMinimized(!minimized)}
              title={minimized ? 'Maximizar' : 'Minimizar'}
            >
              {minimized ? '+' : '−'}
            </button>
          </div>
        </div>

        {!minimized && (
          <div className="player-body">
            <div className="progress-container">
              <div className="progress-bar" onClick={handleProgressClick}>
                <div
                  className="progress-fill"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <div className="time-info">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="player-controls">
              <button className="control-btn play-btn" onClick={toggleMusic}>
                {playing ? '⏸' : '▶'}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MusicPlayer;
