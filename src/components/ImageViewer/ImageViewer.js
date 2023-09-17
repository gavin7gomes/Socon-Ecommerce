import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './ImageViewer.module.css';

const ImageViewer = ({ imageUrls }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
    );
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowRight') {
        nextImage();
      } else if (event.key === 'ArrowLeft') {
        prevImage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className={styles.imageViewer}>
      <div className={styles.mainImageContainer}>
        <img src={imageUrls[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} />
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
