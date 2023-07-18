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
import ImageGallery from './img/ImageGallery';
import NotificationTest from './notification/NotificationTest';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Sayfa yeniden yüklendiğinde oturumu kontrol et
    const token = localStorage.getItem('token');
    // localStorage.removeItem("token");
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
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/search" element={<SearchComponent />} />
        <Route path="/favorites" element={<FavoritesComponent />} />
        <Route path="/details/:id" element={<DetailsComponent />} />
        <Route path="/custom_card" element={<CustomCard />} />
        <Route path="/my_cards" element={<CreatedByUserList />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/imgDeneme" element={<ImageGallery />} />
        <Route path="/testNotification" element={<NotificationTest />} />
      </Routes>
    </div>
  );
};

export default App;
