// import React, { useEffect, useState } from 'react';
// import '../styles/SearchComponent.css';
// import $ from 'jquery';
// import { useNavigate, useLocation } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFire, faUtensils, faPlane, faCamera, faMusic, faThumbsUp, faStar } from '@fortawesome/free-solid-svg-icons';
// import ReactDOM from 'react-dom';


// const SearchComponent = () => {
//     const navigate = useNavigate();
//     const location = useLocation();

//     const [results, setResults] = useState([]);
//     const [isStar, setIsStar] = useState(false);

//     const renderIcon = (iconName) => {
//         switch (iconName) {
//             case 'Ateş':
//                 return <FontAwesomeIcon icon={faFire} />;
//             case 'Yemek':
//                 return <FontAwesomeIcon icon={faUtensils} />;
//             case 'Seyahat':
//                 return <FontAwesomeIcon icon={faPlane} />;
//             case 'Kamera':
//                 return <FontAwesomeIcon icon={faCamera} />;
//             case 'Müzik':
//                 return <FontAwesomeIcon icon={faMusic} />;
//             default:
//                 return null;
//         }
//     }

//     useEffect(() => {
//         $.ajax({
//             type: "GET",
//             url: "https://travel-guide-main-de97df9e068d.herokuapp.com/travel_place/getAll",
//             headers: {
//                 "Authorization": "Bearer " + localStorage.getItem("token")
//             },
//             success: function (response) {
//                 var selectbox = $("#search-select");
//                 selectbox.empty(); // Selectbox'ı temizle

//                 // API yanıtındaki verileri selectbox'a ekle
//                 response.forEach(function (city) {
//                     var option = $("<option></option>").attr("value", city.category).text(city.description);
//                     selectbox.append(option);
//                 });
//             },
//             error: function (error) {
//                 console.log(error);
//             }
//         });
//     }, []);

//     const handleCardClick = (rowId, id) => {
//         const state = {
//             id: null,
//         };

//         if (location.state && location.state.id) {
//             state.id = location.state.id;
//         } else {
//             state.id = id;
//         }

//         navigate(`/details/${rowId}`, { state });
//     };

//     function checkFavoriteStatus(rowId) {
//         // Favori durumunu kontrol etmek için backend API'yi çağır
//         const token = localStorage.getItem("token");

//         fetch(`https://travel-guide-main-de97df9e068d.herokuapp.com/star/favorites/check/${rowId}`, {
//             headers: {
//                 "Authorization": `Bearer ${token}`
//             }
//         })
//             .then(response => response.json())
//             .then(data => {
//                 debugger
//                 if (data) {
//                     setIsStar(true)
//                     // favoriteIcon.classList.add("active");
//                 }
//             })
//             .catch(error => {
//                 console.error("Favori durumu kontrol edilirken bir hata oluştu:", error);
//             });
//     }


//     function addFavorite(rowId) {
//         // Favori ekleme API isteği yap
//         const token = localStorage.getItem("token");

//         fetch("https://travel-guide-main-de97df9e068d.herokuapp.com/star/favorites/add", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`
//             },
//             body: JSON.stringify({ id: rowId })
//         })
//             .then(response => response.json())
//             .then(data => {
//                 setIsStar(true);
//                 console.log("Favori eklendi:", data);
//             })
//             .catch(error => {
//                 console.error("Favori eklenirken bir hata oluştu:", error);
//             });
//     }


//     function deleteFavorite(rowId) {
//         // Favori silme API isteği yap
//         const token = localStorage.getItem("token");

//         fetch("https://travel-guide-main-de97df9e068d.herokuapp.com/star/favorites/delete", {
//             method: "DELETE",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`
//             },
//             body: JSON.stringify({ id: rowId })
//         })
//             .then(response => response.json())
//             .then(data => {
//                 console.log("Favori silindi:", data);
//                 setIsStar(false)
//             })
//             .catch(error => {
//                 console.error("Favori silinirken bir hata oluştu:", error);
//             });
//     }


//     function checkLikeStatus(likeIcon, rowId) {
//         // Favori durumunu kontrol etmek için backend API'yi çağır
//         const token = localStorage.getItem("token");

//         fetch(`https://travel-guide-main-de97df9e068d.herokuapp.com/like_btn/check/${rowId}`, {
//             headers: {
//                 "Authorization": `Bearer ${token}`
//             }
//         })
//             .then(response => response.json())
//             .then(data => {
//                 if (data) {
//                     likeIcon.classList.add("activeLike");
//                 }
//             })
//             .catch(error => {
//                 console.error("Favori durumu kontrol edilirken bir hata oluştu:", error);
//             });
//     }


//     function addLike(rowId) {
//         // Like ekleme API isteği yap
//         const token = localStorage.getItem("token");

//         fetch("https://travel-guide-main-de97df9e068d.herokuapp.com/like_btn/add", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`
//             },
//             body: JSON.stringify({ id: rowId })
//         })
//             .then(response => response.json())
//             .then(data => {
//                 console.log("Like eklendi:", data);
//                 const updatedLikeCount = data;

//                 // HTML üzerindeki likeCount değerini güncelle
//                 const likeCountElement = document.querySelector(`[data-row-id="${rowId}"]`);
//                 likeCountElement.innerHTML = `<i class="fas fa-thumbs-up"></i> ${updatedLikeCount}`;
//             })
//             .catch(error => {
//                 console.error("Like eklenirken bir hata oluştu:", error);
//             });
//     }

//     const testClick = () => {
//         const token = localStorage.getItem("token");
//         const selectedOption = document.getElementById("search-select").value;
//         // HTTP GET isteği yap
//         fetch(`https://travel-guide-main-de97df9e068d.herokuapp.com/travel_destination/get?key=${selectedOption}`, {
//             headers: {
//                 "Authorization": `Bearer ${token}`
//             }
//         })
//             .then(response => response.json())
//             .then(data => {
//                 setResults(data);
//             });
//     }

//     const testStarClick = (rowId) => {
//         checkFavoriteStatus(rowId)
//         debugger
//         if (!isStar) {
//             addFavorite(rowId)
//         } else {
//             deleteFavorite(rowId)
//         }
//         console.log("fil")
//     }

//     function deleteLike(rowId) {
//         // Delete silme API isteği yap
//         const token = localStorage.getItem("token");

//         fetch("https://travel-guide-main-de97df9e068d.herokuapp.com/like_btn/delete", {
//             method: "DELETE",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`
//             },
//             body: JSON.stringify({ id: rowId })
//         })
//             .then(response => response.json())
//             .then(data => {
//                 console.log("Like silindi:", data);
//                 const updatedLikeCount = data;

//                 // HTML üzerindeki likeCount değerini güncelle
//                 const likeCountElement = document.querySelector(`[data-row-id="${rowId}"]`);
//                 likeCountElement.innerHTML = `<i class="fas fa-thumbs-up"></i> ${updatedLikeCount}`;
//             })
//             .catch(error => {
//                 console.error("Like silinirken bir hata oluştu:", error);
//             });
//     }

//     return (
//         <div class="search-container">
//             <div class="row">
//                 <div class="col-md-6 col-md-offset-3">
//                     <h2>Axtarış et</h2>
//                     <div class="input-group">
//                         <select id="search-select" class="form-control">
//                             <option value=""></option>
//                         </select>
//                         <span class="input-group-btn">
//                             <button id="search-button" onClick={() => testClick()} class="btn btn-primary" type="button">Axtar</button>
//                         </span>
//                     </div>
//                 </div>
//             </div>

//             <div id="result-container" className="container">
//                 {results.map((row, index) => (
//                     <div key={index} className="result-card">
//                         <div className="result-image">
//                             <img src={`https://travel-guide-main-de97df9e068d.herokuapp.com/image/${row.id}/${row.imageUrl}`} alt={row.destination} />
//                         </div>
//                         <div className="result-details">
//                             <h5 className="result-city">{row.destination}</h5>
//                             <p className="result-money">Pul: {row.estimatedCost}</p>
//                             {row.createdByName && (
//                                 <p className="result-creadet">Yaradıb: {row.createdByName}</p>
//                             )}
//                             <div className="result-icons">
//                                 {row.iconList.map((icon, index) => (
//                                     <div key={index} className="icon-container">
//                                         <span title={icon}>{renderIcon(icon)}</span>
//                                     </div>
//                                 ))}
//                             </div>
//                             <span className="likeIconD" data-row-id={row.id} title="Bəyən">
//                                 <FontAwesomeIcon icon={faThumbsUp} /> {row.likeCount}
//                             </span>
//                             <span className="favorite" data-row-id={row.id} title="Ulduz" onClick={() => testStarClick(row.id)}>
//                                 <FontAwesomeIcon icon={faStar} />
//                             </span>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default SearchComponent;
import React, { useEffect } from 'react';
import '../styles/SearchComponent.css';
import $ from 'jquery';
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faUtensils, faPlane, faCamera, faMusic } from '@fortawesome/free-solid-svg-icons';
import ReactDOM from 'react-dom';


const SearchComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const renderIcon = (iconName) => {
        switch (iconName) {
            case 'Ateş':
                return <FontAwesomeIcon icon={faFire} />;
            case 'Yemek':
                return <FontAwesomeIcon icon={faUtensils} />;
            case 'Seyahat':
                return <FontAwesomeIcon icon={faPlane} />;
            case 'Kamera':
                return <FontAwesomeIcon icon={faCamera} />;
            case 'Müzik':
                return <FontAwesomeIcon icon={faMusic} />;
            default:
                return null;
        }
    }

    useEffect(() => {
        const searchButton = document.getElementById("search-button");
        searchButton.addEventListener("click", () => {
            const selectedOption = document.getElementById("search-select").value;

            // Tokeni localStorage'dan almak
            const token = localStorage.getItem("token");

            // HTTP GET isteği yap
            fetch(`https://travel-guide-main-de97df9e068d.herokuapp.com/travel_destination/get?key=${selectedOption}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    const resultContainer = document.getElementById("result-container");
                    resultContainer.innerHTML = ""; // Önceki sonuçları temizle
                    data.forEach(row => {
                        const cityName = row.destination;
                        const money = row.estimatedCost;
                        const imageURL = "https://travel-guide-main-de97df9e068d.herokuapp.com/image/" + row.id + "/" + row.imageUrl;
                        console.log(imageURL); // Resim URL'sini al
                        const likeCount = row.likeCount;
                        const creadetBy = row.createdByName ? row.createdByName : '';
                        // Yeni sonuçları oluştur
                        const resultCard = document.createElement("div");
                        resultCard.classList.add("result-card");

                        const resultImage = document.createElement("div");
                        resultImage.classList.add("result-image");
                        resultCard.appendChild(resultImage);

                        const imageElement = document.createElement("img"); // Resim elementini oluştur
                        imageElement.src = imageURL; // Resim URL'sini ayarla
                        imageElement.alt = cityName; // Resim alternatif metnini ayarla
                        resultImage.appendChild(imageElement); // Resim elementini resultImage div'ine ekle

                        const resultDetails = document.createElement("div");
                        resultDetails.classList.add("result-details");
                        resultCard.appendChild(resultDetails);

                        const cityHeading = document.createElement("h5");
                        cityHeading.classList.add("result-city");
                        cityHeading.textContent = cityName;
                        resultDetails.appendChild(cityHeading);

                        const moneyParagraph = document.createElement("p");
                        moneyParagraph.classList.add("result-money");
                        moneyParagraph.textContent = `Pul: ${money}`;
                        resultDetails.appendChild(moneyParagraph);

                        if (creadetBy) {
                            const credateBy = document.createElement("p");
                            credateBy.classList.add("result-creadet");
                            credateBy.textContent = `Yaradıb: ${creadetBy}`;
                            resultDetails.appendChild(credateBy);
                        }

                        // Vanilla JavaScript code:
                        const resultIconsDiv = document.createElement("div");
                        resultIconsDiv.classList.add("result-icons");

                        row.iconList.forEach((icon, index) => {
                            const iconContainerDiv = document.createElement("div");
                            iconContainerDiv.classList.add("icon-container");

                            const iconSpan = document.createElement("span");
                            iconSpan.setAttribute("title", icon);
                            const iconElement = renderIcon(icon);
                            if (iconElement) {
                                // Create a temporary div for React rendering
                                const tempDiv = document.createElement("div");

                                // Render the FontAwesomeIcon using ReactDOM.render
                                ReactDOM.render(iconElement, tempDiv);

                                // Get the rendered React component as a DOM element
                                const renderedIcon = tempDiv.firstChild;

                                // Append the rendered icon to the iconSpan
                                iconSpan.appendChild(renderedIcon);
                            }

                            iconContainerDiv.appendChild(iconSpan);
                            resultIconsDiv.appendChild(iconContainerDiv);
                        });

                        resultDetails.appendChild(resultIconsDiv);

                        const likeIcon = document.createElement("span");
                        likeIcon.classList.add("likeIconD");
                        likeIcon.innerHTML = `<i class="fas fa-thumbs-up"></i> ${likeCount}`;
                        likeIcon.setAttribute("data-row-id", row.id);
                        likeIcon.setAttribute("title", "Bəyən"); // Add tooltip text
                        resultDetails.appendChild(likeIcon);

                        const favoriteIcon = document.createElement("span");
                        favoriteIcon.classList.add("favorite");
                        favoriteIcon.innerHTML = '&nbsp;&nbsp;<i class="fas fa-star"></i>';
                        favoriteIcon.setAttribute("data-row-id", row.id);
                        favoriteIcon.setAttribute("title", "Ulduz"); // Add tooltip text
                        resultDetails.appendChild(favoriteIcon);

                        likeIcon.classList.add("clickable");
                        favoriteIcon.classList.add("clickable");


                        resultContainer.appendChild(resultCard);

                        // Favori ikonlarının durumunu kontrol et
                        checkFavoriteStatus(favoriteIcon, row.id);
                        checkLikeStatus(likeIcon, row.id);

                        resultCard.addEventListener("click", (event) => {
                            handleCardClick(row.destination, row.id)
                        });

                        favoriteIcon.addEventListener("click", (event) => {
                            event.stopPropagation();
                            favoriteIcon.classList.toggle("active");

                            const rowId = row.id; // Satırın ID'sini al

                            if (favoriteIcon.classList.contains("active")) {
                                // Favori ekleme işlemi
                                addFavorite(rowId);
                            } else {
                                // Favori silme işlemi
                                deleteFavorite(rowId);
                            }
                        });

                        likeIcon.addEventListener("click", (event) => {
                            event.stopPropagation();
                            likeIcon.classList.toggle("activeLike");

                            const rowId = row.id; // Satırın ID'sini al

                            if (likeIcon.classList.contains("activeLike")) {
                                // Like ekleme işlemi
                                addLike(rowId);
                            } else {
                                // Like silme işlemi
                                deleteLike(rowId);
                            }
                        });
                    });
                });
        });
    }, []);

    useEffect(() => {
        $.ajax({
            type: "GET",
            url: "https://travel-guide-main-de97df9e068d.herokuapp.com/travel_place/getAll",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            success: function (response) {
                var selectbox = $("#search-select");
                selectbox.empty(); // Selectbox'ı temizle

                // API yanıtındaki verileri selectbox'a ekle
                response.forEach(function (city) {
                    var option = $("<option></option>").attr("value", city.category).text(city.description);
                    selectbox.append(option);
                });
            },
            error: function (error) {
                console.log(error);
            }
        });
    }, []);

    const handleCardClick = (rowId, id) => {
        const state = {
            id: null,
        };

        if (location.state && location.state.id) {
            state.id = location.state.id;
        } else {
            state.id = id;
        }

        navigate(`/details/${rowId}`, { state });
    };

    function checkFavoriteStatus(favoriteIcon, rowId) {
        // Favori durumunu kontrol etmek için backend API'yi çağır
        const token = localStorage.getItem("token");

        fetch(`https://travel-guide-main-de97df9e068d.herokuapp.com/star/favorites/check/${rowId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    favoriteIcon.classList.add("active");
                }
            })
            .catch(error => {
                console.error("Favori durumu kontrol edilirken bir hata oluştu:", error);
            });
    }


    function addFavorite(rowId) {
        // Favori ekleme API isteği yap
        const token = localStorage.getItem("token");

        fetch("https://travel-guide-main-de97df9e068d.herokuapp.com/star/favorites/add", {
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
            })
            .catch(error => {
                console.error("Favori eklenirken bir hata oluştu:", error);
            });
    }


    function deleteFavorite(rowId) {
        // Favori silme API isteği yap
        const token = localStorage.getItem("token");

        fetch("https://travel-guide-main-de97df9e068d.herokuapp.com/star/favorites/delete", {
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
            })
            .catch(error => {
                console.error("Favori silinirken bir hata oluştu:", error);
            });
    }


    function checkLikeStatus(likeIcon, rowId) {
        // Favori durumunu kontrol etmek için backend API'yi çağır
        const token = localStorage.getItem("token");

        fetch(`https://travel-guide-main-de97df9e068d.herokuapp.com/like_btn/check/${rowId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    likeIcon.classList.add("activeLike");
                }
            })
            .catch(error => {
                console.error("Favori durumu kontrol edilirken bir hata oluştu:", error);
            });
    }


    function addLike(rowId) {
        // Like ekleme API isteği yap
        const token = localStorage.getItem("token");

        fetch("https://travel-guide-main-de97df9e068d.herokuapp.com/like_btn/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ id: rowId })
        })
            .then(response => response.json())
            .then(data => {
                console.log("Like eklendi:", data);
                const updatedLikeCount = data;

                // HTML üzerindeki likeCount değerini güncelle
                const likeCountElement = document.querySelector(`[data-row-id="${rowId}"]`);
                likeCountElement.innerHTML = `<i class="fas fa-thumbs-up"></i> ${updatedLikeCount}`;
            })
            .catch(error => {
                console.error("Like eklenirken bir hata oluştu:", error);
            });
    }


    function deleteLike(rowId) {
        // Delete silme API isteği yap
        const token = localStorage.getItem("token");

        fetch("https://travel-guide-main-de97df9e068d.herokuapp.com/like_btn/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ id: rowId })
        })
            .then(response => response.json())
            .then(data => {
                console.log("Like silindi:", data);
                const updatedLikeCount = data;

                // HTML üzerindeki likeCount değerini güncelle
                const likeCountElement = document.querySelector(`[data-row-id="${rowId}"]`);
                likeCountElement.innerHTML = `<i class="fas fa-thumbs-up"></i> ${updatedLikeCount}`;
            })
            .catch(error => {
                console.error("Like silinirken bir hata oluştu:", error);
            });
    }

    return (
        <div class="search-container">
            <div class="row">
                <div class="col-md-6 col-md-offset-3">
                    <h2>Axtarış et</h2>
                    <div class="input-group">
                        <select id="search-select" class="form-control">
                            <option value=""></option>
                        </select>
                        <span class="input-group-btn">
                            <button id="search-button" class="btn btn-primary" type="button">Axtar</button>
                        </span>
                    </div>
                </div>
            </div>

            <div id="result-container" class="container">

            </div>
        </div>
    );
};

export default SearchComponent;
