import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes, screenNames } from './routes';
import { ReactComponent as Loaderr } from '../../assets/icons/loader.svg';
import { useDispatch } from 'react-redux';
import { SET_WISHLIST } from '../../store/types';

const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const stringifiedWishlist = localStorage.getItem("wishlist") || "[]";
    const wishlist = JSON.parse(stringifiedWishlist);
    dispatch({
      type: SET_WISHLIST,
      payload: wishlist
    })
  }, [dispatch])
  
  const Loader = () => (
    <div style={style.loaderContainer}>
      <Loaderr />
    </div>
  )
  return (
    <Router>
      <Suspense fallback={<Loader/>}>
      <Routes>
              {Object.values(screenNames).map((path, index) => (
                <Route
                  exact
                  key={index}
                  path={path}
                  element={routes[path].component}
                />
              ))}
        </Routes>
      </Suspense>
    </Router>
  );
};

const style = {
  loaderContainer: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "var(--zindex-loader)",
  }
}

export default AppRouter;
