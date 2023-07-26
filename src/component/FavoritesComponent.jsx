import React, { useEffect, useState } from 'react';
import '../styles/SearchComponent.css';
import { useNavigate, useLocation } from "react-router-dom";


const FavoritesComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetchFavorites(token);
    }, []);

    const fetchFavorites = (token) => {
        fetch("https://travel-guide-backend-7e73c60545d8.herokuapp.com/star/getAll", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setFavorites(data);
            })
            .catch(error => {
                console.error("Favoriler alınırken bir hata oluştu:", error);
            });
    };

    const handleFavoriteClick = (event, rowId) => {
        event.stopPropagation();

        const token = localStorage.getItem("token");
        const isFavorite = favorites.some(favorite => favorite.id === rowId);

        if (isFavorite) {
            deleteFavorite(token, rowId);
            handleCardDelete(event, rowId)
        } else {
            addFavorite(token, rowId);
        }
    };

    const addFavorite = (token, rowId) => {
        fetch("https://travel-guide-backend-7e73c60545d8.herokuapp.com/star/favorites/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ id: rowId })
        })
            .then(response => response.json())
            .then(data => {
                console.log("Favori eklendi:", data);
                fetchFavorites(token); // Favorileri güncelle
            })
            .catch(error => {
                console.error("Favori eklenirken bir hata oluştu:", error);
            });
    };

    const deleteFavorite = (token, rowId) => {
        fetch("https://travel-guide-backend-7e73c60545d8.herokuapp.com/star/favorites/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ id: rowId })
        })
            .then(response => response.json())
            .then(data => {

                console.log("Favori silindi:", data);
                fetchFavorites(token); // Favorileri güncelle
            })
            .catch(error => {
                console.error("Favori silinirken bir hata oluştu:", error);
            });
    };

    const handleCardClick = (rowId, userComments, events, imageUrl) => {
        const state = {
            userComment: null,
            events: null,
            imageUrl: null
        };

        if (location.state && location.state.userComment && location.state.events && location.state.imageUrl) {
            state.userComment = location.state.userComment;
            state.events = location.state.events;
            state.imageUrl = location.state.imageUrl;
        } else {
            state.userComment = userComments;
            state.events = events;
            state.imageUrl = imageUrl;
        }

        navigate(`/details/${rowId}`, { state });
    };



    const handleCardDelete = (event, rowId) => {
        event.stopPropagation();
        const updatedFavorites = favorites.filter(favorite => favorite.id !== rowId);
        setFavorites(updatedFavorites);
    };

    return (
        <div className="search-container">
            <div id="result-container" className="container">
                {favorites.map(row => (
                    <div key={row.id} className="result-card" onClick={() => handleCardClick(row.destinationName, row.userComments, row.events, row.imageUrl)}>
                        <div className="result-image">
                            <img src={`/${row.imageUrl}`} alt={row.destinationName} />
                        </div>
                        <div className="result-details">
                            <h5 className="result-city">{row.destinationName}</h5>
                            <p className="result-money">Money: {row.estimatedCost}</p>
                            <span className={`favorite ${favorites.some(favorite => favorite.id === row.id) ? "active" : ""}`} onClick={(event) => handleFavoriteClick(event, row.id)}>
                                <i className="fas fa-star"></i>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoritesComponent;
