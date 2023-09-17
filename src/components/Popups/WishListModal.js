import React from 'react';
import styles from './WishlistModal.module.css';

const WishlistModal = ({ isOpen, onClose, wishlistItems, removeWishlistItem }) => {
  return (
    <div className={`${styles.modal} ${isOpen ? styles.show : ''}`}>
      <div className={styles['modal-dialog']}>
        <div className={styles['modal-content']}>
          <div className={styles['modal-header']}>
            <h5 className={styles['modal-title']}>Favourite</h5>
            <button type="button" className={styles.close} onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className={styles['modal-body']}>
            <ul>
              {wishlistItems.length > 0 ? wishlistItems.map((item) => (
                <li key={item.id} className={styles['wishlist-item']}>
                  <img src={item.thumbnail} alt={item.title} />
                  <p>{item.title}</p>
                  <button
                    className={styles['remove-button']}
                    onClick={() => removeWishlistItem(item.id)}
                  >
                    X
                  </button>
                </li>
              )) : <p>List is Empty :| </p>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistModal;
