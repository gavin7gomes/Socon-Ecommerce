import React from 'react';
import style from './NavigationLayout.module.css';
import UserMenu from './UserMenu';
function NavigationMenu({user, onLogout}) {
  return (
    <nav className={style.navigationMenu}>
      {user?.accessToken && <UserMenu user={user} onLogout={onLogout} />}
      <ul>
        <li><a href="#products" className={style.active}>Products</a></li>
        <li>
          <a className={style.disabledLink} href="#code">Cart</a> 
          <span className={style.comingSoon}>Coming soon</span>
        </li>
        <li>
          <a className={style.disabledLink} href="#pr">Account</a>
          <span className={style.comingSoon}>Coming soon</span>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationMenu;

