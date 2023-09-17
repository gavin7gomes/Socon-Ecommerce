import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ImageViewer.module.css';

const ImageViewer = ({ imageUrls }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className={styles.imageViewer}>
      <div className={styles.mainImageContainer}>
        <img src={imageUrls[currentImageIndex]} alt={`${currentImageIndex + 1}`} />
      </div>
      <div className={styles.thumbnailContainer}>
        {imageUrls.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Thumbnail ${index + 1}`}
            className={currentImageIndex === index ? styles.selectedThumbnail : styles.thumbnail}
            onClick={() => selectImage(index)}
          />
        ))}
      </div>
    </div>
  );
};

ImageViewer.propTypes = {
  imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageViewer;
