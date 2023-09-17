import React, { useEffect, useState } from 'react';
import styles from  './SplashScreen.module.css';
import { ReactComponent as Loader } from '../../assets/icons/loader.svg';

const Splash = () => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return visible ? (
    <div className={styles["splash-screen"]}>
      <Loader/>
      <p>Socon Ecommerce</p>
    </div>
  ) : null;
}

export default Splash;
