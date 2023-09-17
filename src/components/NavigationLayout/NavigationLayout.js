import React, { useState } from 'react';
import NavigationMenu from './NavigationMenu';
import styles from './NavigationLayout.module.css';
import HamburgerIcon from '../Hamburger/Hamburger';
import SearchBar from '../SearchBar/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { searchProducts, sortByProperty } from '../../store/actions/productActions';
import { isMobileBrowser } from '../../utils/misc';
import { useLocation } from 'react-router-dom';

const NavigationLayout = React.forwardRef(({ children, onWishListClick, updatePaginationDataCB }, ref) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [menuVisible, setMenuVisible] = useState(false);
  const [sortOption, setSortOption] = useState("title");
  const [order, setOrder] = useState("desc");
  const [query, setQuery] = useState("");

  const wishlist = useSelector((state) => state.product.wishlist);
  const products = useSelector((state) => state.product.products);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const onSearch = async (skip) => {
    const res = await dispatch(searchProducts({query, limit: 20, skip}));
    updatePaginationDataCB(res, skip);
  }

  const getQueryString = () => query;

  // Expose the childFunction via the ref
  React.useImperativeHandle(ref, () => ({
    onSearch,
    getQueryString
  }));

  const onSearchQueryChange = (value, type) => {
    if(!type){
      setQuery(value);
    }else if(type === "sort"){
      setSortOption(value)
      dispatch(sortByProperty({sort: value, order}));
    }else if(type === "order"){
      setOrder(value)
      dispatch(sortByProperty({sort: sortOption, order: value}));
    }
  }

  return (
    <div className={styles['navigation-layout']}>
      {!isMobileBrowser() && <div className={styles['toggle-menu-button']}>
        <HamburgerIcon isOpen={menuVisible} onClick={toggleMenu} />
        {/* {accessToken && <UserAvatar profilePhotoUrl={avatar} name={userName || loginName} width="24px" />} */}
        <div onClick={onWishListClick} className={styles.wishlistBtn}>{wishlist.length > 0 ? <AiFillHeart/> : <AiOutlineHeart/>}</div>
      </div>}
      {menuVisible && <NavigationMenu user={null} onLogout={() => {}} />}
      <div className={styles['navigation-content-wrapper']}>
        {isMobileBrowser() && <div className={styles.menuHeartContainer}>
        <HamburgerIcon isOpen={menuVisible} onClick={toggleMenu} />
        <div onClick={onWishListClick} className={styles.wishlistBtn}>{wishlist.length > 0 ? <AiFillHeart/> : <AiOutlineHeart/>}</div>
          </div>}
        <div className={styles.navigationHeader}><p>Socon Ecommerce</p></div>
        {location.pathname === "/" && (<SearchBar 
          onSearchQueryChange={onSearchQueryChange} 
          searchParams={{query, order, sortOption}} 
          onSearch={onSearch} 
          products={products} 
          />)}
        <div className={styles['content']}>{children}</div>
      </div>
    </div>
  );
});

export default NavigationLayout;

