import React, { useState, useEffect } from "react";
import {NavLink, Redirect} from "react-router-dom";

import headerStyles from '../../css/header.module.css';
import { useAuth } from "../../Utilities/context/auth";

function Header() {
  const { setAuthTokens } = useAuth();
  const [logginOut, setlogginOut] = useState(false);

  function logOut() {
    setAuthTokens("");
    setlogginOut(true);
  }

  if (logginOut) {
    return <Redirect to="/auth" />;
  }
  
  return (
    <div className={headerStyles.navBar}>
      <p className={headerStyles.navHeader}>My Recipe</p>
      <NavLink to="/" className={headerStyles.navItem}>Discover</NavLink>
      <NavLink to="/my-recipes" className={headerStyles.navItem}>My Recipies</NavLink>
      <button onClick={logOut} className={headerStyles.navItem}>Logout</button>
    </div>
  );
}

export default Header;
