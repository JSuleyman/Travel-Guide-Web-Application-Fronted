import React, { useState, useEffect } from 'react';
import axios from 'axios';
import makeApiRequest from '../../api/makeApiRequest';
import ImageGallery from '../../img/ImageGallery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomCard = () => {
    const [categoryId, setCategoryId] = useState('');
    const [destinationName, setDestinationName] = useState('');
    const [estimatedCost, setEstimatedCost] = useState('');
    const [selectedImage, setSelectedImage] = useState([]); // Seçilen resmi takip eden durum
    const [userComments, setUserComments] = useState('');
    const [events, setEvents] = useState('');
    const [keyOptions, setKeyOptions] = useState([]);
    const [shouldResetImages, setShouldResetImages] = useState(false);

    const apiUrl = 'https://heroku-deneme-backend-5f73e229a56a.herokuapp.com/tavel_place/getAll';

    useEffect(() => {
        async function fetchKeyOptions() {
            makeApiRequest(apiUrl, 'GET')
                .then(response => {
                    const keyOptionsData = response.data;
                    setKeyOptions(keyOptionsData);
                })
                .catch(error => {
                    console.error(error);
                });
        }
        fetchKeyOptions();
    }, []);

    const handleImageSelect = (image) => {
        setSelectedImage([...selectedImage, image]);
    };

    const handleImageDelete = (deletedImage) => {
        const updatedSelectedImages = selectedImage.filter(image => image !== deletedImage);
        setSelectedImage(updatedSelectedImages);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        makeApiRequest(
            'https://heroku-deneme-backend-5f73e229a56a.herokuapp.com/travel_destination',
            'POST',
            {
                categoryId,
                destinationName,
                estimatedCost,
                userComments,
                events
            }
        )
            .then(response => {
                console.log(response);
                const fkPlacesToVisitId = response.data;

                const formData = new FormData();
                console.log("bilmirem: " + selectedImage);
                selectedImage.forEach((image) => {
                    formData.append("image", image);
                });

                const token = localStorage.getItem('token');

                axios.post(`https://heroku-deneme-backend-5f73e229a56a.herokuapp.com/image/${fkPlacesToVisitId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .catch(error => {
                        makeApiRequest(`https://heroku-deneme-backend-5f73e229a56a.herokuapp.com/travel_destination/delete/${fkPlacesToVisitId}`, 'DELETE')
                    });
                setCategoryId('');
                setDestinationName('');
                setEstimatedCost('');
                setSelectedImage([]);
                setShouldResetImages(true);
                setUserComments('');
                setEvents('');
            })
            .catch(error => {
                // Hata durumu
                if (error.response || error.response.data || error.response.data.message) {
                    const errorMessage = error.response.data.errorMessage;
                    console.log(errorMessage);
                    toast.error(errorMessage);
                    // Hata iletisini kullanıcıya göster
                } else {
                    // Genel hata durumu
                    // Hata iletisini kullanıcıya göster
                }
            });
    };

    useEffect(() => {
        if (shouldResetImages) {
          setShouldResetImages(false);
        }
      }, [shouldResetImages]);

    return (
        <div className="container">
            <form className="custom-card-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="categoryId">Key ID:</label>
                    <select
                        id="categoryId"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="form-control"
                    >
                        <option value=""></option>
                        {keyOptions.map((option) => (
                            <option key={option.category} value={option.category}>
                                {option.description}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="destinationName">Places:</label>
                    <input
                        type="text"
                        id="destinationName"
                        value={destinationName}
                        onChange={(e) => setDestinationName(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="estimatedCost">Many For Travel:</label>
                    <input
                        type="number"
                        id="estimatedCost"
                        value={estimatedCost}
                        onChange={(e) => setEstimatedCost(e.target.value)}
                        className="form-control"
                    />
                </div>

                <ImageGallery 
                onImageSelect={handleImageSelect} 
                onDeleteImage={handleImageDelete} 
                shouldResetImages={shouldResetImages}
                />

                <div className="form-group">
                    <label htmlFor="userComments">User Comments:</label>
                    <input
                        type="text"
                        id="userComments"
                        value={userComments}
                        onChange={(e) => setUserComments(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="events">Events:</label>
                    <input
                        type="text"
                        id="events"
                        value={events}
                        onChange={(e) => setEvents(e.target.value)}
                        className="form-control"
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Create Custom Card
                </button>
            </form>

            <div>
                <ToastContainer />
            </div>

        </div>

    );
};

export default CustomCard;
