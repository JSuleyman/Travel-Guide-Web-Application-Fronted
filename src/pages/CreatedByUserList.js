import React, { useEffect, useState } from 'react';
import '../styles/SearchComponent.css';
import { useNavigate, useLocation } from 'react-router-dom';
import makeApiRequest from '../api/makeApiRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faUtensils, faPlane, faCamera, faMusic } from '@fortawesome/free-solid-svg-icons';

const CreatedByUserList = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [favorites, setFavorites] = useState([]);
    const [filter, setFilter] = useState('COMPLETED'); // Default olarak COMPLETED seçili
    const [pendingCount, setPendingCount] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);
    const [approvedCount, setApprovedCount] = useState(0);
    const [allCount, setAllCount] = useState(0);

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
                                <div className="result-icons">
                                    {row.iconList.map((icon, index) => (
                                        <div key={index} className="icon-container">
                                            <span title={icon}>{renderIcon(icon)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CreatedByUserList;