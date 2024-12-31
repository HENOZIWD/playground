'use client';

import ControlPanel from '@/components/controlPanel/component';
import styles from './style.module.css';
import { useRef, useState } from 'react';

interface VideoPlayerProps {
  src: string;
  type: string;
}

export default function VideoPlayer({ src, type }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [controlShow, setControlShow] = useState(false);

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

  const handleControlShow = (state: boolean) => {
    setControlShow(state);
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={() => handleControlShow(true)}
      onMouseLeave={() => handleControlShow(false)}
    >
      <video
        className={styles.video}
        onClick={handleVideoPlay}
        ref={videoRef}
      >
        <source src={src} type={`video/${type}`} />
      </video>
      <ControlPanel
        show={controlShow}
        videoRef={videoRef}
      />
    </div>
  );
}
