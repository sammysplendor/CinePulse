import styles from "./TrailerModal.module.css";
import { X } from "lucide-react";
import { useState } from "react";

const TrailerModal = ({ trailerKey, trailerURL, onClose }) => {
  const [error, setError] = useState(false);

  if (!trailerURL) return null;

  const youtubeWatchLink = `https://www.youtube.com/watch?v=${trailerKey}`;

  return (
    <div className={styles.trailerModal} onClick={onClose}>
      <div className={styles.videoWrapper} onClick={(e) => e.stopPropagation()}>
        <X className={styles.closeBtn} onClick={onClose} />

        {!error ? (
          <iframe
            key={trailerURL}
            width="100%"
            src={`${trailerURL}`}
            title="Trailer"
            frameBorder="0"
            onError={() => setError(true)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className={styles.fallback}>
            <p>Video cannot play here</p>

            <a
              href={youtubeWatchLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.youtubeBtn}
            >
              Watch on YouTube
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrailerModal;
