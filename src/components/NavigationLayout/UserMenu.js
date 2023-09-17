import React from 'react';
import style from "./NavigationLayout.module.css"

function UserMenu({ user, onLogout }) {
  return (
    <div>
        <div className={style["user-menu"]}>
      <img className={style["user-avatar"]} src={user.avatar} alt={`${user.name}'s Avatar`} />
      <div className={style["user-info"]}>
        <h3 className={style["user-name"]}>{user.userName}</h3>
        <p className={style["user-email"]}>{user.loginName}</p>
        <p className={style["user-email"]}>{user.email}</p>
        <p className={style["user-bio"]}>{user.bio}</p>
        <p className={style["user-company"]}>{user.company}</p>
      </div>
    </div>
    <button className={style["logout-button"]} onClick={onLogout}>Log Out</button>
    </div>
  );
}

export default UserMenu;
