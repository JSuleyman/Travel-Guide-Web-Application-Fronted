import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./index.css";
import makeApiRequest from "../../api/makeApiRequest";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = ({ onLogout }) => {
  const [notifications, setNotifications] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const navigate = useNavigate();

  const handleLogout = () => {
    makeApiRequest(
      "https://travel-guide-main-de97df9e068d.herokuapp.com/api/v1/auth/logout",
      "POST"
    )
      .then((response) => {
        localStorage.removeItem("token");
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");
        onLogout();
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchNotifications = async () => {
    // try {
    //   const response = await makeApiRequest(
    //     "https://travel-guide-main-de97df9e068d.herokuapp.com/notification",
    //     "GET"
    //   );
    //   console.log("API isteği tamamlandı:", response.data);
    //   setNotifications(response.data);
    // } catch (error) {
    //   console.error("Favoriler alınırken bir hata oluştu:", error);
    // }
  };
  // useEffect(() => {
  //   // Make initial API call upon login
  //   fetchNotifications();

  //   // Set interval to fetch notifications every 3 seconds
  //   const interval = setInterval(fetchNotifications, 3000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  // const toggleNotification = () => {
  //   setShowNotification((prevState) => {
  //     if (prevState) {
  //       makeApiRequest(
  //         "https://travel-guide-main-de97df9e068d.herokuapp.com/notification",
  //         "POST"
  //       )
  //         .then((response) => {
  //           fetchNotifications();
  //           console.log("API isteği tamamlandı:", response.data);
  //         })
  //         .catch((error) => {
  //           console.error("API isteği sırasında bir hata oluştu:", error);
  //         });
  //     }
  //     return !prevState;
  //   });
  // };


  return (
    <div className="nav-bar-container-light">
      <div className="username-container">
        <span className="username">
          {firstName} {lastName}
        </span>
      </div>

      <ul className="middle-items">

        <li className="list-item">
          <NavLink
            to="/search"
            className="link-light"
            activeClassName="selected"
          >
            Axtar
          </NavLink>
        </li>

        <li className="list-item">
          <NavLink
            to="/favorites"
            className="link-light"
            activeClassName="selected"
          >
            Sevimlilər
          </NavLink>
        </li>

        <li className="list-item">
          <NavLink
            to="/custom_card"
            className="link-light"
            activeClassName="selected"
          >
            Xüsusi kart yarat
          </NavLink>
        </li>

        <li className="list-item">
          <NavLink
            to="/my_cards"
            className="link-light"
            activeClassName="selected"
          >
            Yaratdıqlarım
          </NavLink>
        </li>

        <li className="list-item">
          <NavLink
            to="/wallet_management"
            className="link-light"
            activeClassName="selected"
          >
            Maliyyə Nəzarəti
          </NavLink>
        </li>

        <li className="list-item">
          <NavLink
            to="/question"
            className="link-light"
            activeClassName="selected"
          >
            Səyahət planı tərtib edin 
          </NavLink>
        </li>

        <li className="list-item">
          <NavLink
            to="/my_profile"
            className="link-light"
            activeClassName="selected"
          >
            Profil
          </NavLink>
        </li>

        <li className="list-item" onClick={handleLogout}>
          <Link className="link-light">Çıxış</Link>
        </li>
        
      </ul>

      <div className="notification-container">
        {/* <button className="notification-button" onClick={toggleNotification}> */}
        <button className="notification-button">
          Bildirimlər ({notifications.length})
        </button>
        {showNotification && (
          <div className="notification-box">
            {notifications.length === 0 ? (
              <div className="empty-notification">No new notifications</div>
            ) : (
              notifications.map((notification) => (
                <div key={notification.destinationName} className="notification-item">
                  <div className="notification-header">
                    <div className="notification-destination">{notification.destinationName} ({notification.userFirstNameAndLastName})</div>
                    <div className="notification-time">{notification.time}</div>
                  </div>
                  <div className="notification-comment">{notification.comment}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDropdown;



// import { Link } from "react-router-dom";
// import './index.css'
// import makeApiRequest from "../../api/makeApiRequest";
// import { useNavigate } from "react-router-dom";

// const ProfileDropdown = ({ onLogout }) => {
//   const [notifications, setNotifications] = useState([]);
//   const firstName = localStorage.getItem("firstName");
//   const lastName = localStorage.getItem("lastName");
//   const navigate = useNavigate();

//   const handleLogout = () => {

//     makeApiRequest('https://travel-guide-main-de97df9e068d.herokuapp.com/api/v1/auth/logout', 'POST')
//       .then(response => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("firstName");
//         localStorage.removeItem("lastName");
//         onLogout();
//         navigate("/");
//       })
//       .catch(error => {
//         console.log(error);
//       });

//   };

//   useEffect(() => {
//     const fetchNotifications = async () => {
//         makeApiRequest('https://travel-guide-main-de97df9e068d.herokuapp.com/notification', 'GET')
//             .then(response => {
//                 console.log('API isteği tamamlandı:', response.data);
//                 setNotifications(response.data);
//             })
//             .catch(error => {
//                 console.error('Favoriler alınırken bir hata oluştu:', error);
//             });
//     };

//     const interval = setInterval(fetchNotifications, 5000); // Her 5 saniyede bir bildirimleri kontrol et

//     return () => {
//         clearInterval(interval);
//     };
// }, []);


//   return (
//     <div className="nav-bar-container-light">
//       <div className="username-container">
//         <span className="username">
//           {firstName} {lastName}
//         </span>
//       </div>

//       <ul className="middle-items">
//         <li className="list-item">
//           <Link to="/search" className="link-light">
//             Search
//           </Link>
//         </li>
//         <li className="list-item">
//           <Link to="/favorites" className="link-light">
//             Favorites
//           </Link>
//         </li>
//         <li className="list-item">
//           <Link to="/custom_card" className="link-light">
//             Custom Card
//           </Link>
//         </li>
//         <li className="list-item">
//           <Link to="/my_cards" className="link-light">
//             Created By Me
//           </Link>
//         </li>
//         <li className="list-item" onClick={handleLogout}>
//           <Link className="link-light">
//             Logout
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );

// };

// export default ProfileDropdown;
