import React, { useState } from "react";
import { Link } from "react-router-dom";
import './index.css'
import makeApiRequest from "../../api/makeApiRequest";

const ProfileDropdown = ({ onLogout }) => {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");

  const handleLogout = () => {

    makeApiRequest('https://heroku-deneme-backend-5f73e229a56a.herokuapp.com/api/v1/auth/logout', 'POST')
      .then(response => {
        localStorage.removeItem("token");
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");
        onLogout();
      })
      .catch(error => {
        console.log(error);
      });

  };


  return (
    <div className="nav-bar-container-light">
      <div className="username-container">
        <span className="username">
          {firstName} {lastName}
        </span>
      </div>

      <ul className="middle-items">
        <li className="list-item">
          <Link to="/search" className="link-light">
            Search
          </Link>
        </li>
        <li className="list-item">
          <Link to="/favorites" className="link-light">
            Favorites
          </Link>
        </li>
        <li className="list-item">
          <Link to="/custom_card" className="link-light">
            Custom Card
          </Link>
        </li>
        <li className="list-item">
          <Link to="/my_cards" className="link-light">
            Created By Me
          </Link>
        </li>
        <li className="list-item" onClick={handleLogout}>
          <Link to="/" className="link-light">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );

};

export default ProfileDropdown;
