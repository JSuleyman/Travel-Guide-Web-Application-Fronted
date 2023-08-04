import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProfileDropdown from './component/Navbar/ProfileDropdown';
import SearchComponent from './component/SearchComponent';
import FavoritesComponent from './component/FavoritesComponent';
import Login from './pages/Login';
import DetailsComponent from './component/details/DetailsComponent';
import CustomCard from './component/custom_card/CustomCard';
import CreatedByUserList from './pages/CreatedByUserList';
import Register from './pages/Register';

import UserProfile from './component/profile/UserProfile';
import ChangePassword from './component/profile/password/ChangePassword';
import ChangeFullName from './component/profile/fullname/ChangeFullName';
import IconList from './component/custom_card/IconList';
import VerifyComponent from './component/login_register/VerifyComponent';
import Verify from './pages/Verify';
import Test from './component/login_register/RepeadVerified';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div>
      {loggedIn && <ProfileDropdown onLogout={handleLogout} />}
      <Routes>
        {!loggedIn && <Route path="/" element={<Login onLogin={handleLogin} />} />}
        {loggedIn && <Route path="/search" element={<SearchComponent />} />}
        {loggedIn && <Route path="/favorites" element={<FavoritesComponent />} />}
        {loggedIn && <Route path="/details/:id" element={<DetailsComponent />} />}
        {loggedIn && <Route path="/custom_card" element={<CustomCard />} />}
        {loggedIn && <Route path="/my_cards" element={<CreatedByUserList />} />}
        {!loggedIn && <Route path="/signup" element={<Register />} />}
        {!loggedIn && <Route path="/verify" element={<Verify />} />}
        {loggedIn && <Route path="/my_profile" element={<UserProfile />} />}
        {loggedIn && <Route path="/change_password" element={<ChangePassword />} />}
        {loggedIn && <Route path="/change_full_name" element={<ChangeFullName />} />}
      </Routes>
    </div>
  );
};

export default App;

