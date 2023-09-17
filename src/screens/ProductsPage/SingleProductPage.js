import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addtoWishList, fetchProduct, fetchProductsOfCategory, removeFromWishlist, resetDisplayedProduct } from '../../store/actions/productActions';
import LoaderWrapper from '../../components/LoaderWrapper/LoaderWrapper';
import NavigationLayout from '../../components/NavigationLayout/NavigationLayout';
import ImageViewer from '../../components/ImageViewer/ImageViewer';
import styles from "./SingleProductPage.module.css"
import { getRandomItemsFromArray, roundDownToNearestHalfOrWhole } from '../../utils/misc';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import ProductCard from '../../components/ProductCard/ProductCard';
import WishlistModal from '../../components/Popups/WishListModal';

const SingleProductPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { product_id } = useParams();

    const [loading, setLoading] = useState(false);
    const [showWishlistModal, setShowWishlistModal] = useState(false);

    const product = useSelector((state) => state.product.displayedProduct);
    const products = useSelector((state) => state.product.relatedProducts);
    const wishlist = useSelector((state) => state.product.wishlist);

    useEffect(() => {
        fetchAProduct(product_id);

        return () => {
            dispatch(resetDisplayedProduct());
        }
    }, [product_id])

    const fetchAProduct = async (id) => {
        setLoading(true);
        const res = await dispatch(fetchProduct(id))
        if(res) dispatch(fetchProductsOfCategory(res.category))
        setLoading(false);
    }

    const onProductClick = (id) => {
        navigate(`/product/${id}`)
    }

    const checkIfProductInWishList = (id) => {
        if(wishlist.find((obj) => obj.id === id)){
            return true;
        }else{
            return false;
        }
    }

    const showWishlist = () => {
        setShowWishlistModal(true);
    }

    const removeWishlistItem = (id) => {
        dispatch(removeFromWishlist(id))
    }

    const addToFavourite = ({id, title, thumbnail}) => {
        dispatch(addtoWishList({id, title, thumbnail}))
    }

    const backToList = () => {
        navigate(`/`);
    }

    const roundedRating = useMemo(() => roundDownToNearestHalfOrWhole(product.rating), [product.rating]);
    const discountedPrice = (product.price * (100 - product?.discountPercentage)) / 100;
    const randomFiveProducts = useMemo(() => getRandomItemsFromArray(products, 5), [products]);
  return (
    <LoaderWrapper loading={loading}>
        <WishlistModal isOpen={showWishlistModal} onClose={() => setShowWishlistModal(false)} wishlistItems={wishlist} removeWishlistItem={removeWishlistItem} />
        <NavigationLayout
            searchParams={{}} 
            onSearchQueryChange={() => {}}
            onWishListClick={showWishlist}
            onSearch={() => {}}>
                <div className={styles.backBtnContainer} onClick={backToList}><IoArrowBackCircleSharp /><span className={styles.backBtnText}>Back to List</span></div>
                <div className={styles.productDetails} id="#productDetails">
                    <div className={styles.imageContainer}>
                    {product?.images?.length > 0 && <ImageViewer imageUrls={product.images} />}
                    </div>
                    {Object.keys(product).length > 0 && <div className={styles.detailsContainer}>
                        <h1 className={styles.title}>{product.title}</h1>
                        <p className={styles.brand}>Brand: {product.brand}</p>
                        <p className={styles.description}>{product.description}</p>
                        <div className={styles.price}>
                            <span className={styles.discountedPrice}>₹{discountedPrice.toFixed(2)}</span>
                            <span className={styles.originalPrice}>₹{product.price.toFixed(2)}</span>
                        </div>
                        <p className={styles.rating}>Rating: {Array.from({ length: 5 }, (_, index) => (
                                <span key={index} className={styles.star}>
                                {index + 1 <= roundedRating ? (
                                    <FaStar />
                                ) : index + 0.5 === roundedRating ? (
                                    <FaStarHalfAlt />
                                ) : (
                                    <FaRegStar />
                                )}
                                </span>
                            ))}</p>
                        <p className={styles.stock}>In Stock: {product.stock} units</p>
                        <p className={styles.category}>Category: {product.category}</p>
                        <button onClick={() => checkIfProductInWishList(product.id) ? showWishlist() : addToFavourite({id: product.id, title: product.title, thumbnail: product.thumbnail})} 
                        className={styles.wishlistButton}
                        >
                            {checkIfProductInWishList(product.id) ? "See Wishlist" : "Add to favourite"}
                        </button>   
                    </div>}
                </div>
                <div>
                    <h2>Related Products</h2>
                    <div className={styles.productPageContainer}>
        {randomFiveProducts.map((product, index) => (
            <div className={styles.productCardContainer}>
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
                </div>
        </NavigationLayout>
    </LoaderWrapper>
    
  )
}

export default SingleProductPage;