import React, { useEffect, useState } from 'react';
import '../styles/SearchComponent.css';
import { useNavigate, useLocation } from 'react-router-dom';
import makeApiRequest from '../api/makeApiRequest';

const CreatedByUserList = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [favorites, setFavorites] = useState([]);
    const [filter, setFilter] = useState('COMPLETED'); // Default olarak COMPLETED seçili
    const [pendingCount, setPendingCount] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);
    const [approvedCount, setApprovedCount] = useState(0);
    const [allCount, setAllCount] = useState(0);

    useEffect(() => {
        fetchData(filter);
        makeApiRequest('https://travel-guide-backend-7e73c60545d8.herokuapp.com/travel_destination/created_by_user_list_count', 'GET')
            .then(response => {
                console.log('API isteği tamamlandı:', response.data);
                setPendingCount(response.data.pendingCount == 0 ? 0 : response.data.pendingCount);
                setCompletedCount(response.data.completedCount == 0 ? 0 : response.data.completedCount);
                setApprovedCount(response.data.approvedCount == 0 ? 0 : response.data.approvedCount);
                setAllCount(response.data.allCount);
            })
            .catch(error => {
                console.error('Favoriler alınırken bir hata oluştu:', error);
            });

    }, []);

    const fetchData = (status) => {
        const filterParams = status ? `?status=${status}` : '';

        console.log('API isteği yapılıyor...');
        makeApiRequest(`https://travel-guide-backend-7e73c60545d8.herokuapp.com/travel_destination/created_by_user_list${filterParams}`, 'GET')
            .then(response => {
                console.log('API isteği tamamlandı:', response.data);
                setFavorites(response.data);
            })
            .catch(error => {
                console.error('Favoriler alınırken bir hata oluştu:', error);
            });
    };

    const handleFilterClick = (status) => {
        if (filter !== status) {
            setFilter(status);
            fetchData(status);
        }
    };

    const handleCardClick = (rowId, id) => {
        const state = {
            id: null,
            imageUrl: null
        };

        if (location.state && location.state.id) {
            state.id = location.state.id;
        } else {
            state.id = id;
        }

        navigate(`/details/${rowId}`, { state });
    };

    return (
        <div className="search-container">
            <div id="result-container" className="container">
                <div className="filter-options">
                    <button
                        style={filter === '' ? { backgroundColor: '#555', color: '#fff' } : null}
                        className="filter-option"
                        onClick={() => handleFilterClick('')}
                    >
                        Hamısı ({allCount})
                    </button>
                    <button
                        style={filter === 'COMPLETED' ? { backgroundColor: '#555', color: '#fff' } : null}
                        className="filter-option"
                        onClick={() => handleFilterClick('COMPLETED')}
                    >
                        İcra Edilib ({completedCount})
                    </button>
                    <button
                        style={filter === 'PENDING' ? { backgroundColor: '#555', color: '#fff' } : null}
                        className="filter-option"
                        onClick={() => handleFilterClick('PENDING')}
                    >
                        Gözləmədə ({pendingCount})
                    </button>
                    <button
                        style={filter === 'APPROVED' ? { backgroundColor: '#555', color: '#fff' } : null}
                        className="filter-option"
                        onClick={() => handleFilterClick('APPROVED')}
                    >
                        Ləğv Edilib ({approvedCount})
                    </button>
                </div>
                <div>
                    {favorites.map(row => (
                        <div
                            key={row.id}
                            className="result-card"
                            onClick={() => handleCardClick(row.destinationName, row.id)}
                        >
                            <div className="result-image">
                                <img src={`https://travel-guide-backend-7e73c60545d8.herokuapp.com/image/${row.id}/${row.imageUrl}`} alt={row.destinationName} />
                            </div>
                            <div className="result-details">
                                <h5 className="result-city">
                                    {row.description} - {row.destinationName}
                                </h5>
                                <p className="result-money">Money: {row.estimatedCost}</p>
                                <p className="result-city">Status: {row.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CreatedByUserList;



// import React, { useEffect, useState } from 'react';
// import '../styles/SearchComponent.css';
// import { useNavigate, useLocation } from "react-router-dom";


// const CreatedByUserList = () => {
//     const navigate = useNavigate();
//     const location = useLocation();

//     const [favorites, setFavorites] = useState([]);
//     const [filter, setFilter] = useState('');

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         fetchFavorites(token);
//     }, []);

//     const fetchFavorites = (token) => {
//         fetch("https://travel-guide-backend-7e73c60545d8.herokuapp.com/travel_destination/created_by_user_list", {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`
//             }
//         })
//             .then(response => response.json())
//             .then(data => {
//                 setFavorites(data);
//             })
//             .catch(error => {
//                 console.error("Favoriler alınırken bir hata oluştu:", error);
//             });
//     };

//     const countFavorites = (status) => {
//         return favorites.filter(favorite => favorite.status === status).length;
//     };

//     const handleCardClick = (rowId, userComments, events, imageUrl) => {
//         const state = {
//             userComment: null,
//             events: null,
//             imageUrl: null
//         };

//         if (location.state && location.state.userComment && location.state.events && location.state.imageUrl) {
//             state.userComment = location.state.userComment;
//             state.events = location.state.events;
//             state.imageUrl = location.state.imageUrl;
//         } else {
//             state.userComment = userComments;
//             state.events = events;
//             state.imageUrl = imageUrl;
//         }

//         navigate(`/details/${rowId}`, { state });
//     };

//     return (
//         <div className="search-container">
//             <div id="result-container" className="container">
//                 <div className="filter-options">
//                     <button className={`filter-option ${filter === '' ? 'active' : ''}`} onClick={() => setFilter('')}>
//                         All ({favorites.length})
//                     </button>
//                     <button className={`filter-option ${filter === 'PENDING' ? 'active' : ''}`} onClick={() => setFilter('PENDING')}>
//                         PENDING ({countFavorites('PENDING')})
//                     </button>
//                     <button className={`filter-option ${filter === 'COMPLETED' ? 'active' : ''}`} onClick={() => setFilter('COMPLETED')}>
//                         ICRA EDILIB ({countFavorites('COMPLETED')})
//                     </button>
//                     <button className={`filter-option ${filter === 'APPROVED' ? 'active' : ''}`} onClick={() => setFilter('LEGV_ EDILIB')}>
//                         LEGV EDILIB ({countFavorites('APPROVED')})
//                     </button>
//                 </div>
//                 {favorites.filter(favorite => filter === '' || favorite.status === filter).map((row, index) => (
//                     <div key={row.id} className="result-card" onClick={() => handleCardClick(row.places, row.userComments, row.events, row.imageUrl)}>
//                         <div className="result-image">
//                             <img src={`/${row.imageUrl}`} alt={row.places} />
//                         </div>
//                         <div className="result-details">
//                             <h5 className="result-city">{row.keyId.value} - {row.places}</h5>
//                             <p className="result-money">Money: {row.manyForTravel}</p>
//                             <p className="result-city">Status: {row.status}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default CreatedByUserList;



// import React, { useEffect, useState } from 'react';
// import '../styles/SearchComponent.css';
// import { useNavigate, useLocation } from "react-router-dom";


// const CreatedByUserList = () => {
//     const navigate = useNavigate();
//     const location = useLocation();

//     const [favorites, setFavorites] = useState([]);

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         fetchFavorites(token);
//     }, []);

//     const fetchFavorites = (token) => {
//         fetch("https://travel-guide-backend-7e73c60545d8.herokuapp.com/travel_destination/created_by_user_list", {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`
//             }
//         })
//             .then(response => response.json())
//             .then(data => {
//                 setFavorites(data);
//             })
//             .catch(error => {
//                 console.error("Favoriler alınırken bir hata oluştu:", error);
//             });
//     };

//     const handleCardClick = (rowId, userComments, events, imageUrl) => {
//         const state = {
//             userComment: null,
//             events: null,
//             imageUrl: null
//         };

//         if (location.state && location.state.userComment && location.state.events && location.state.imageUrl) {
//             state.userComment = location.state.userComment;
//             state.events = location.state.events;
//             state.imageUrl = location.state.imageUrl;
//         } else {
//             state.userComment = userComments;
//             state.events = events;
//             state.imageUrl = imageUrl;
//         }

//         navigate(`/details/${rowId}`, { state });
//     };

//     return (
//         <div className="search-container">
//             <div id="result-container" className="container">
//                 {favorites.map(row => (
//                     <div key={row.id} className="result-card" onClick={() => handleCardClick(row.places, row.userComments, row.events, row.imageUrl)}>
//                         <div className="result-image">
//                             <img src={`/${row.imageUrl}`} alt={row.places} />
//                         </div>
//                         <div className="result-details">
//                             <h5 className="result-city">{row.keyId.value} - {row.places}</h5>
//                             <p className="result-money">Money: {row.manyForTravel}</p>
//                             <p className="result-city">Status: {row.status}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default CreatedByUserList;
