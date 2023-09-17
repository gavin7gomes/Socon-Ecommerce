import React from "react";

const ProductsPage = React.lazy(() =>
  import("../../screens/ProductsPage/ProductsPage")
);
const SingleProductPage = React.lazy(() =>
  import("../../screens/ProductsPage/SingleProductPage")
);

export const screenNames = {
  products: "/",
  singleProduct: "/product/:product_id"
};

export const routes = {
  [screenNames.products]: {
    component: <ProductsPage />,
    displayName: "Products",
  },
  [screenNames.singleProduct]: {
    component: <SingleProductPage />,
    displayName: "Product",
  },
};
