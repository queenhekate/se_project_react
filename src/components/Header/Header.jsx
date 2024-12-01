import { Link } from "react-router-dom";
import React from "react";
import "./Header.css";
import logo from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";

function Header({
  handleAddClick,
  weatherData,
  openRegisterModal,
  openLoginModal,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const isLoggedIn = currentUser && currentUser.name;

  const getInitial = (name) => {
    if (name) {
      return name[0].toUpperCase();
    }
    return "?";
  };

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" alt="Logo" src={logo} />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {isLoggedIn ? (
        <div className="header__user-container">
          <div className="header__mobile-view">
            <button
              className="header__menu-icon"
              type="button"
              onClick={toggleMobileMenu}
            />
          </div>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__link">
            <p className="header__username">{currentUser.name}</p>
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt="Profile avatar"
                className="header__avatar"
              />
            ) : (
              <div className="header__placeholder">
                {getInitial(currentUser.name)}
              </div>
            )}
          </Link>
        </div>
      ) : (
        <div className="header__guest-nav">
          <button
            onClick={openRegisterModal}
            type="button"
            className="header__signup"
          >
            Sign Up
          </button>
          <button
            type="button"
            className="header__signin"
            onClick={openLoginModal}
          >
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
