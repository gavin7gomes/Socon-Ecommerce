import { produce } from "immer";
import { SET_PRODUCTS, SET_PRODUCT, SET_WISHLIST, SET_RELATED_PRODUCTS } from "../types";

const initialState = {
    products: [],
    displayedProduct: {},
    wishlist: [],
    relatedProducts: []
  };
  
const productReducer = produce((state, action) => {
    switch (action.type) {
      case SET_PRODUCTS: {
        return {
          ...state,
          products: action.payload
        };
      }
      case SET_PRODUCT: {
        return {
          ...state,
          displayedProduct: action.payload
        };
      }
      case SET_WISHLIST: {
        return {
          ...state,
          wishlist: action.payload
        };
      }
      case SET_RELATED_PRODUCTS: {
        return {
          ...state,
          relatedProducts: action.payload
        };
      }
      default: {
        return state;
      }
    }
  }, initialState);

export default productReducer;

  