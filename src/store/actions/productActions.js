import makeApiRequest from "../../utils/makeApiRequest";
import { backendApi } from "../../utils/misc";
import { SET_PRODUCT, SET_PRODUCTS, SET_RELATED_PRODUCTS, SET_WISHLIST } from "../types";

export const fetchProducts =
  ({limit=10, skip=0 }) => async (dispatch, getState) => {
    
    const response = await makeApiRequest(
      "GET",
      backendApi,
      `products?limit=${limit}&skip=${skip}`,
      {},
    );

    if (response.error) {
        window.alert("Something went wrong!!!")
        return;
      }

    dispatch({
        type: SET_PRODUCTS,
        payload: response.response.products
    })
    return response.response
  };

export const fetchProductsOfCategory =
  (category) => async (dispatch, getState) => {
    
    const response = await makeApiRequest(
      "GET",
      backendApi,
      `products/category/${category}`,
      {},
    );

    if (response.error) {
        window.alert("Something went wrong!!!")
        return;
      }

    dispatch({
        type: SET_RELATED_PRODUCTS,
        payload: response.response.products
    })
    return response.response
  };

  export const fetchProduct =
  (id) => async (dispatch, getState) => {
    
    const response = await makeApiRequest(
      "GET",
      backendApi,
      `products/${id}`,
      {},
    );

    if (response.error) {
        window.alert("Something went wrong!!!")
        return;
    }
    console.log({response});
    dispatch({
      type: SET_PRODUCT,
      payload: response.response
    })
    return response.response
  };

  export const resetDisplayedProduct = () => async (dispatch, getState) => {
    dispatch({
      type: SET_PRODUCT,
      payload: {}
    })
  };

  export const resetProductsList = () => async (dispatch, getState) => {
    dispatch({
      type: SET_PRODUCTS,
      payload: []
    })
  };

  export const addtoWishList = ({id, title, thumbnail}) => async (dispatch, getState) => {
    const {
      product: { wishlist }
    } = getState();
        if(wishlist.find((obj) => obj.id === id)){
            return;
        }
        if(wishlist.length === 5){
            window.alert("Cannot add more than 5 products to favourite");
            return;
        }
        const stringifiedArray = JSON.stringify([...wishlist, {id, title, thumbnail}]);
        localStorage.setItem('wishlist', stringifiedArray);
        dispatch({
          type: SET_WISHLIST,
          payload: [...wishlist, {id, title, thumbnail}]
        })
  };

  export const removeFromWishlist = (id) => async (dispatch, getState) => {
    const {
      product: { wishlist }
    } = getState()
        const filteredArray = wishlist.filter((obj) => obj.id !== id);
        const stringifiedArray = JSON.stringify(filteredArray);
        localStorage.setItem('wishlist', stringifiedArray);
        dispatch({
          type: SET_WISHLIST,
          payload: filteredArray || []
        })
  };

  export const sortByProperty = ({sort, order}) => async (dispatch, getState) => {
    const {
      product: { products }
    } = getState()
        const sortedArray = products.slice();

        console.log({sortedArray, sort, order});

        if(sort === "title"){
          sortedArray.sort((a, b) => {
            if (order === 'asc') {
              return a.title.localeCompare(b.title);
            } else if (order === 'desc') {
              return b.title.localeCompare(a.title);
            }
            return 0;
          });
        }else if(sort === "price" || sort === "rating"){
          sortedArray.sort((a, b) => {
            if (order === 'asc') {
              return a[sort] > b[sort] ? 1 : -1;
            } else if (order === 'desc') {
              return b[sort] > a[sort] ? 1 : -1;
            }
            return 0;
          });
        }else{
          return;
        }
        console.log({sortedArray});
        dispatch({
          type: SET_PRODUCTS,
          payload: sortedArray || []
        })
  };

  export const searchProducts =
  ({query, limit=20, skip=0}) => async (dispatch, getState) => {
    
    const response = await makeApiRequest(
      "GET",
      backendApi,
      `products/search?q=${query}&limit=${limit}&skip=${skip}`,
      {},
    );

    if (response.error) {
        window.alert("Something went wrong!!!")
        return;
    }
    
    dispatch({
      type: SET_PRODUCTS,
      payload: response.response.products
    })
    return response.response
  };