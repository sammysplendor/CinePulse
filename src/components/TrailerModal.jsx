import styles from "./TrailerModal.module.css";
import { X } from "lucide-react";

const TrailerModal = ({ trailerURL, onClose }) => {
  if (!trailerURL) return null;

  return (
    <div className={styles.trailerModal} onClick={onClose}>
      <div className={styles.videoWrapper} onClick={(e) => e.stopPropagation()}>
        <X className={styles.closeBtn} onClick={onClose} />

        <iframe
          key={trailerURL}
          width="100%"
          src={`${trailerURL}`}
          title="Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default TrailerModal;
