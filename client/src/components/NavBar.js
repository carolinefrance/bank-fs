import React, { useContext } from 'react';
import { UserContext } from '../App';
// import { NavbarItem } from './NavbarItem'; <-- error, never used
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './styles/NavBar.css';
import LogoutButton from './LogoutButton';

export function NavBar ({loggedInUser, logOut}) {
  const navigate = useNavigate();
  const ctx = useContext(UserContext);
  function handleLogOut() {
    logOut();
    navigate("/");
  }

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-custom">
        <NavLink className="navbar-brand" to="/"><img src={`${process.env.PUBLIC_URL}/images/image-bank-logo-night.png`} alt="UpstateBridge Bank" className="logo-image" /></NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" exact to="/">Home</NavLink>
              </li>
              { !loggedInUser ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="active" to="/create-account">Create Account</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="active" to="/login">Log In</NavLink>
                  </li>
                </>
              ) : (
                <>
                <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="active" to="/transaction">Transaction</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="active" to="/transfer">Transfer</NavLink>
                  </li>
                  
                  { loggedInUser.isEmployee && (
                  <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="active" to="/all-data">All Data</NavLink>
                  </li>
                  )}
                  { loggedInUser.isGoogle? (
                    <LogoutButton logOut={logOut} loggedInUser={loggedInUser}/>
                  ) : (
                  <li className="nav-item"><span className="nav-link" onClick={handleLogOut}>{loggedInUser.name} | Logout</span></li>
                  )}
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    );
}

/*
<li className="nav-item">
                    <NavLink className="nav-link" activeClassName="active" to="/withdraw">Withdraw</NavLink>
                  </li>
*/