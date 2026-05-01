import { useContext, useState, useEffect } from "react"
import userContext from "../context/userContext"
import { NavLink, Link } from 'react-router-dom';
import "../assets/style/nav.css"
const Nav = () => {
  const { user, saveUser } = useContext(userContext)

  const handleLogOut = (e) => {
    saveUser(null)
    localStorage.clear()

  }
  if (user) {
    if(user.role == 'Restaurant Owner'){
      return (
    <nav>
      <NavLink to="/profile">profile</NavLink>
      <NavLink to="/newItem">Add Menu Item</NavLink>

      <Link onClick={handleLogOut} className="logout-btn" to='/'>
                Log Out
              </Link>
    </nav>
  );
    }else if(user.role == 'Buyer'){
      return (
    <nav>
      <NavLink to="/dashboard">Dashboard</NavLink>

      <NavLink to="/profile">profile</NavLink>
      <Link onClick={handleLogOut} className="logout-btn" to='/'>
                Log Out
              </Link>
    </nav>
  );
    }
  }else {
    return (
      <nav>
        <NavLink to="/auth/login">Login</NavLink>
        <NavLink to="/auth/register">Register</NavLink>

      </nav>
    )
  }
}

export default Nav;
