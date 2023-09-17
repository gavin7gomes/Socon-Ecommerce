import React, { useEffect, useRef, useState } from 'react'
import LoaderWrapper from '../../components/LoaderWrapper/LoaderWrapper';
import NavigationLayout from '../../components/NavigationLayout/NavigationLayout';
import { useDispatch, useSelector } from 'react-redux';
import { addtoWishList, fetchProducts, removeFromWishlist, resetProductsList } from '../../store/actions/productActions';
import ProductCard from '../../components/ProductCard/ProductCard';
import style from "./ProductPage.module.css"
import { useNavigate } from 'react-router-dom';
import withPagination from '../../components/PaginationHOC/withPagination';
import WishlistModal from '../../components/Popups/WishListModal';

const ProductsPage = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const navRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(20);
    const [skip, setSkip] = useState(0);
    const [showWishlistModal, setShowWishlistModal] = useState(false);

    const products = useSelector((state) => state.product.products);
    const wishlist = useSelector((state) => state.product.wishlist);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const res = await dispatch(fetchProducts({limit, skip}));
            props.fetchItemsCount(res?.total, res?.limit, onPageChangeCallback);
            setLoading(false);
        }
        fetchData()

        return () => {
            dispatch(resetProductsList())
        }
    }, [])

    const onPageChangeCallback = async (page) => {
        const skip = (page-1)*limit;
        let res;
        setLoading(true);
        console.log({hh: navRef.current.getQueryString()});
        if(navRef.current && navRef.current.getQueryString()){
                await navRef.current.onSearch(skip)
        }else{
            res = await dispatch(fetchProducts({limit, skip}));
            props.fetchItemsCount(res?.total, limit, onPageChangeCallback);
        }
        setLoading(false);
    }

    const updateFetchItemsCountCallback = (res, skip) => {
        props.fetchItemsCount(res?.total, limit, onPageChangeCallback, !skip);
    }

    const onProductClick = (id) => {
        navigate(`/product/${id}`)
    }

    const showWishlist = () => {
        setShowWishlistModal(true);
    }

    const removeWishlistItem = (id) => {
        dispatch(removeFromWishlist(id))
    }

  return (
    <LoaderWrapper loading={loading}>
        <WishlistModal
            isOpen={showWishlistModal} 
            onClose={() => setShowWishlistModal(false)} 
            wishlistItems={wishlist} 
            removeWishlistItem={removeWishlistItem} 
        />
        <NavigationLayout
            onWishListClick={showWishlist}
            ref={navRef}
            updatePaginationDataCB={updateFetchItemsCountCallback}
        >
        <div className={style.productPageContainer}>
        {products.map((product, index) => (
            <div className={style.productCardContainer} key={index}>
                <ProductCard 
                    key={index} {...product} 
                    onProductClick={() => onProductClick(product.id)} 
                    onAddToWishlist={() => dispatch(addtoWishList({id: product.id, title: product.title, thumbnail: product.thumbnail}))} 
                    onRemoveFromWishlist={() => dispatch(removeFromWishlist(product.id))}
                    wishListItems={wishlist}
                />
            </div>
        ))}
        </div>
        </NavigationLayout>
    </LoaderWrapper>
  )
}

export default withPagination(ProductsPage)