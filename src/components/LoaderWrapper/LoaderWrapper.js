import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Loader } from '../../assets/icons/loader.svg';

const LoaderWrapper = ({ loading, children }) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "fixed",
          display: loading ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "var(--zindex-loader)",
        }}
      >
      <Loader />
      </div>
      {children}
    </div>
  );
};

LoaderWrapper.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default LoaderWrapper;
