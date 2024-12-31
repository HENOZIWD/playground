import { RefObject } from 'react';
import styles from './style.module.css';

interface ControlPanelProps {
  show: boolean;
  videoRef: RefObject<HTMLVideoElement | null>;
}

export default function ControlPanel({ show, videoRef }: ControlPanelProps) {
  const handleVideoPlay = () => {
    if (!videoRef.current) {
      return;
    }

    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current.play();
    }
    else {
      videoRef.current.pause();
    }
  };

  const handleVideoVolume = (dir: string) => {
    if (!videoRef.current) {
      return;
    }

    if (dir === '+') {
      videoRef.current.volume = Math.min(1, videoRef.current.volume + 0.05);
    }
    else {
      videoRef.current.volume = Math.max(0, videoRef.current.volume - 0.05);
    }

    videoRef.current.volume = Math.round(videoRef.current.volume * 100) / 100;
  };

  return (
    <ul className={`${show ? '' : styles.hidden} ${styles.container}`}>
      <li><button onClick={handleVideoPlay}>play / pause</button></li>
      <li><button onClick={() => handleVideoVolume('+')}>volume up</button></li>
      <li><button onClick={() => handleVideoVolume('-')}>volume down</button></li>
    </ul>
  );
}
