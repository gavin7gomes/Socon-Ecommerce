import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import styles from './ProductCard.module.css';
import PropTypes from 'prop-types';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { roundDownToNearestHalfOrWhole } from '../../utils/misc';


const ProductCard = ({
  id,  
  title,
  brand,
  description,
  discountPercentage,
  price,
  rating,
  stock,
  thumbnail,
  onProductClick,
  onAddToWishlist,
  onRemoveFromWishlist,
  wishListItems
}) => {
  const roundedRating = useMemo(() => roundDownToNearestHalfOrWhole(rating), [rating]);
  const discountedPrice = (price * (100 - discountPercentage)) / 100;
  const divRef = useRef(null);
  const [divWidth, setDivWidth] = useState(0);

  const checkIfProductInWishList = (i) => {
    if(wishListItems.find((obj) => obj.id === i)){
        return true;
    }else{
        return false;
    }
  }

  const onHeartClick = () => {
    if(checkIfProductInWishList(id)){
        onRemoveFromWishlist();
    }else{
        onAddToWishlist();
    }
  }

    const handleResize = () => {
      if (divRef.current) {
      const newWidth = divRef.current.offsetWidth;
      setDivWidth(newWidth);
      }
  };

  useLayoutEffect(() => {
      window.addEventListener('resize', handleResize);

      if (divRef.current) {
      setDivWidth(divRef.current.offsetWidth);
      }

      return () => {
      window.removeEventListener('resize', handleResize);
      };
  }, []);

  return (
    <div className={styles.productCard} ref={divRef} style={{
      display: divWidth < 330 ? 'block' : "flex"
    }}>
      <div className={styles.thumbnail}>
        <img className={styles.thumbnailImg} src={thumbnail} alt={title} onClick={onProductClick} />
      </div>
      <div className={styles.details}>
        <span className={styles.heart} onClick={onHeartClick}>{checkIfProductInWishList(id) ? <AiFillHeart /> : <AiOutlineHeart />}</span>
        <h3 className={styles.title} title={title} onClick={onProductClick}>{title}</h3>
        <p className={styles.brand}>{brand}</p>
        <p className={styles.description} title={description}>{description}</p>
        <div className={styles.price}>
          <span className={styles.discountedPrice}>₹{discountedPrice.toFixed(2)}</span>
          <span className={styles.originalPrice}>₹{price.toFixed(2)}</span>
        </div>
        <div className={styles.rating}>
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index} className={styles.star}>
              {index + 1 <= roundedRating ? (
                <FaStar />
              ) : index + 0.5 === roundedRating ? (
                <FaStarHalfAlt />
              ) : (
                <FaRegStar />
              )}
            </span>
          ))}
        </div>
        <p className={styles.stock}>{stock} in stock</p>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
    title: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    discountPercentage: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    onProductClick: PropTypes.func,
    onAddToWishlist: PropTypes.func,
    onRemoveFromWishlist: PropTypes.func,
    wishListItems: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired
      })).isRequired,
  };
  
  ProductCard.defaultProps = {
    onProductClick: () => {},
  };

export default ProductCard;
