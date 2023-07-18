import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './DetailsComponent.css';
import makeApiRequest from '../../api/makeApiRequest';
import Replies from './Replies';

const DetailsComponent = () => {
  const location = useLocation();

  const { id } = location.state || {};
  const [userComment, setUserComment] = useState('');
  const [event, setEvent] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [fkDetailsId, setFkDetailsId] = useState('');
  const [comments, setComments] = useState([]);
  const [userinYazdigiYorum, setuserinYazdigiYorum] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  const [cardStatus, setCardStatus] = useState('');

  const [newReplyComment, setNewReplyComment] = useState(0);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [replyCommentId, setReplyCommentId] = useState(null);

  useEffect(() => {
    const placesId = id;

    makeApiRequest(`https://heroku-deneme-backend-5f73e229a56a.herokuapp.com/travel_destination_details?placesId=${placesId}`, 'GET')
      .then(response => {
        console.log('API isteği tamamlandı:', response.data);
        if (response.data.status === 'COMPLETED') {
          userCommentsList();
        }
        setImageUrls(response.data.imageUrls || []);
        setUserComment(response.data.userComments);
        setEvent(response.data.events);
        setFkDetailsId(response.data.id);
        setCardStatus(response.data.status);
      })
      .catch(error => {
        console.error('Detay alınırken bir hata oluştu:', error);
      });

  }, []);

  const handleCommentSubmit = () => {
    const payload = {
      travelDestinationDetailsId: fkDetailsId,
      userComment: userinYazdigiYorum
    };

    makeApiRequest('https://heroku-deneme-backend-5f73e229a56a.herokuapp.com/user_comment', 'POST', payload)
      .then(response => {
        console.log('Yorum gönderildi:', response.data);
        setuserinYazdigiYorum('');
        userCommentsList();
      })
      .catch(error => {
        console.error('Yorum gönderilirken bir hata oluştu:', error);
      });
  };

  const handleReplySubmit = (commentId, replyMessage) => {
    const payload = {
      commentId: commentId,
      replyMessage: replyMessage
    };

    makeApiRequest('https://heroku-deneme-backend-5f73e229a56a.herokuapp.com/user_comment_reply', 'POST', payload)
      .then(response => {
        console.log('Reply submitted:', response.data);
        setReplyCommentId(null);
        userCommentsList();
        setNewReplyComment(prevValue => prevValue + 1);
      })
      .catch(error => {
        console.error('An error occurred while submitting the reply:', error);
      });
  };

  const userCommentsList = () => {
    const url = `https://heroku-deneme-backend-5f73e229a56a.herokuapp.com/user_comment/details_id?fkPlacesId=${id}`;

    makeApiRequest(url, 'GET')
      .then(response => {
        console.log(response.data);
        const userComments1 = response.data.map(comment => ({
          id: comment.id,
          firstName: comment.firstName,
          lastName: comment.lastName,
          userMessage: comment.userMessage,
          date: comment.dateAndTime,
          userId: comment.userId,
          replyMessage: ''
        }));
        setComments(userComments1);
        fetchCurrentUserId();
      })
      .catch(error => {
        console.error('Yorumlar alınırken bir hata oluştu:', error);
      });
  };

  const fetchCurrentUserId = () => {
    const url = 'https://heroku-deneme-backend-5f73e229a56a.herokuapp.com/user_comment/current_user_id';

    makeApiRequest(url, 'GET')
      .then(response => {
        console.log(response.data);
        setCurrentUserId(response.data);
      })
      .catch(error => {
        console.error('Mevcut kullanıcı ID alınırken bir hata oluştu:', error);
      });
  };

  function formatTimeAgo(dateTime) {
    const dateObj = new Date(dateTime);
    const now = new Date();

    const diffInMilliseconds = now - dateObj;
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} saniye önce`;
    } else if (diffInSeconds < 3600) {
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      return `${diffInMinutes} dakika önce`;
    } else if (diffInSeconds < 86400) {
      const diffInHours = Math.floor(diffInSeconds / 3600);
      return `${diffInHours} saat önce`;
    } else {
      const diffInDays = Math.floor(diffInSeconds / 86400);
      return `${diffInDays} gün önce`;
    }
  }

  const handlePrevImage = () => {
    setSelectedImageIndex(prevIndex => (prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex(prevIndex => (prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1));
  };

  const handleReplyButtonClick = (commentId) => {
    console.log("id de" + commentId);
    setReplyCommentId(commentId === replyCommentId ? '' : commentId);
  };

  const handleReplyCancel = (commentId) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replyMessage: ''
        };
      }
      return comment;
    });
    setComments(updatedComments);
    setReplyCommentId(null);
  };

  return (
    <div className="details-container">
      <div className="details-image">
        {imageUrls.length > 0 && (
          <img
            src={`https://heroku-deneme-backend-5f73e229a56a.herokuapp.com/image/${id}/${imageUrls[selectedImageIndex]}`}
            alt="Resim"
            className="image-preview"
          />
        )}
        {imageUrls.length > 1 && (
          <div className="image-navigation">
            <button className="image-prev-button" onClick={handlePrevImage}>
              Önceki
            </button>
            <button className="image-next-button" onClick={handleNextImage}>
              Sonraki
            </button>
          </div>
        )}
      </div>

      <div className="details-content">
        <div className="details-section">
          <h2>Kullanıcının Yorumu</h2>
          <p>{userComment}</p>
        </div>

        <div className="details-section">
          <h2>Neler Yapabilirsiniz</h2>
          <p>{event}</p>
        </div>
      </div>

      <div className={`comments-section ${cardStatus === 'COMPLETED' ? '' : 'hide'}`}>
        <div className="details-section">
          <h2 className="section-title">Yorum Yap</h2>
          <textarea
            className="comment-input"
            value={userinYazdigiYorum}
            onChange={e => setuserinYazdigiYorum(e.target.value)}
            placeholder="Yorumunuzu buraya yazın..."
          />
          <button
            className={`comment-button ${!userinYazdigiYorum ? 'disabled-button' : ''}`}
            onClick={handleCommentSubmit}
            disabled={!userinYazdigiYorum}
          >
            Gönder
          </button>
        </div>

        <div className="comments-list">
          <h2>Kullanıcılara Ait Yorumlar</h2>
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-header">
                <strong>{`${comment.firstName} ${comment.lastName} ${comment.userId === currentUserId ? '(me)' : ''}`}</strong>
                <span className="comment-date">{comment.date ? formatTimeAgo(comment.date) : ''}</span>
              </div>
              <p className="comment-body">{comment.userMessage}</p>
              <button className="reply-button" onClick={() => handleReplyButtonClick(comment.id)}>
                <span className="reply-button-text">Yanıtla</span>
              </button>
              <div>
                {comment.id === replyCommentId && (
                  <div className="reply-input-container">
                    <textarea
                      className="reply-input"
                      value={comment.replyMessage}
                      onChange={(e) => {
                        const updatedComments = [...comments];
                        const commentIndex = updatedComments.findIndex((c) => c.id === comment.id);
                        updatedComments[commentIndex].replyMessage = e.target.value;
                        setComments(updatedComments);
                      }}
                      placeholder="Yanıtınızı buraya yazın..."
                    />
                    <div className="reply-button-group">
                      <button className="reply-button-sum" onClick={() => handleReplySubmit(comment.id, comment.replyMessage)}>
                        Gönder
                      </button>
                      <button className="cancel-button" onClick={() => handleReplyCancel(comment.id)}>
                        İptal Et
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <Replies commentId={comment.id} newReplyComment={newReplyComment} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsComponent;
// import React, { useEffect, useState } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
// import './DetailsComponent.css';
// import makeApiRequest from '../../api/makeApiRequest';
// import Replies from './Replies';

// const DetailsComponent = () => {
//   const location = useLocation();
//   const { id } = location.state || {};
//   const [userComment, setUserComment] = useState('');
//   const [event, setEvent] = useState('');
//   const [imageUrls, setImageUrls] = useState([]);
//   const [fkDetailsId, setFkDetailsId] = useState('');
//   const [comments, setComments] = useState([]);
//   const [userinYazdigiYorum, setuserinYazdigiYorum] = useState('');
//   const [currentUserId, setCurrentUserId] = useState('');
//   const [cardStatus, setCardStatus] = useState('');
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [replyCommentId, setReplyCommentId] = useState(null);

//   useEffect(() => {
//     const placesId = id;

//     makeApiRequest(`https://heroku-deneme-backend-5f73e229a56a.herokuapp.com/travel_destination_details?placesId=${placesId}`, 'GET')
//       .then(response => {
//         console.log('API isteği tamamlandı:', response.data);
//         if (response.data.status === 'COMPLETED') {
//           userCommentsList();
//         }
//         setImageUrls(response.data.imageUrls || []);
//         setUserComment(response.data.userComments);
//         setEvent(response.data.events);
//         setFkDetailsId(response.data.id);
//         setCardStatus(response.data.status);
//       })
//       .catch(error => {
//         console.error('Detay alınırken bir hata oluştu:', error);
//       });
//   }, []);

//   const handleCommentSubmit = () => {
//     const payload = {
//       travelDestinationDetailsId: fkDetailsId,
//       userComment: userinYazdigiYorum
//     };

//     makeApiRequest('https://heroku-deneme-backend-5f73e229a56a.herokuapp.com/user_comment', 'POST', payload)
//       .then(response => {
//         console.log('Yorum gönderildi:', response.data);
//         setuserinYazdigiYorum('');
//         userCommentsList();
//       })
//       .catch(error => {
//         console.error('Yorum gönderilirken bir hata oluştu:', error);
//       });
//   };

//   const handleReplySubmit = (commentId, replyMessage) => {
//     const payload = {
//       commentId: commentId,
//       replyMessage: replyMessage
//     };

//     makeApiRequest('https://heroku-deneme-backend-5f73e229a56a.herokuapp.com/user_comment_reply', 'POST', payload)
//       .then(response => {
//         console.log('Reply submitted:', response.data);
//         setReplyCommentId(null);
//         userCommentsList();
//       })
//       .catch(error => {
//         console.error('An error occurred while submitting the reply:', error);
//       });
//   };

//   const userCommentsList = () => {
//     const url = `https://heroku-deneme-backend-5f73e229a56a.herokuapp.com/user_comment/details_id?fkPlacesId=${id}`;

//     makeApiRequest(url, 'GET')
//       .then(response => {
//         console.log(response.data);
//         const userComments1 = response.data.map(comment => ({
//           id: comment.id,
//           firstName: comment.firstName,
//           lastName: comment.lastName,
//           userMessage: comment.userMessage,
//           date: comment.dateAndTime,
//           userId: comment.userId,
//           replyMessage: ''
//         }));
//         setComments(userComments1);
//         fetchCurrentUserId();
//       })
//       .catch(error => {
//         console.error('Yorumlar alınırken bir hata oluştu:', error);
//       });
//   };

//   const fetchCurrentUserId = () => {
//     const url = 'https://heroku-deneme-backend-5f73e229a56a.herokuapp.com/user_comment/current_user_id';

//     makeApiRequest(url, 'GET')
//       .then(response => {
//         console.log(response.data);
//         setCurrentUserId(response.data);
//       })
//       .catch(error => {
//         console.error('Mevcut kullanıcı ID alınırken bir hata oluştu:', error);
//       });
//   };

//   function formatTimeAgo(dateTime) {
//     const dateObj = new Date(dateTime);
//     const now = new Date();

//     const diffInMilliseconds = now - dateObj;
//     const diffInSeconds = Math.floor(diffInMilliseconds / 1000);

//     if (diffInSeconds < 60) {
//       return `${diffInSeconds} saniye önce`;
//     } else if (diffInSeconds < 3600) {
//       const diffInMinutes = Math.floor(diffInSeconds / 60);
//       return `${diffInMinutes} dakika önce`;
//     } else if (diffInSeconds < 86400) {
//       const diffInHours = Math.floor(diffInSeconds / 3600);
//       return `${diffInHours} saat önce`;
//     } else {
//       const diffInDays = Math.floor(diffInSeconds / 86400);
//       return `${diffInDays} gün önce`;
//     }
//   }

//   const handlePrevImage = () => {
//     setSelectedImageIndex(prevIndex => (prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1));
//   };

//   const handleNextImage = () => {
//     setSelectedImageIndex(prevIndex => (prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1));
//   };

//   const handleReplyButtonClick = (commentId) => {
//     console.log("id de" + commentId);
//     setReplyCommentId(commentId === replyCommentId ? '' : commentId);
//   };

//   return (
//     <div className="details-container">
//       <div className="details-image">
//         {imageUrls.length > 0 && (
//           <img
//             src={`https://heroku-deneme-backend-5f73e229a56a.herokuapp.com/image/${id}/${imageUrls[selectedImageIndex]}`}
//             alt="Resim"
//             className="image-preview"
//           />
//         )}
//         {imageUrls.length > 1 && (
//           <div className="image-navigation">
//             <button className="image-prev-button" onClick={handlePrevImage}>
//               Önceki
//             </button>
//             <button className="image-next-button" onClick={handleNextImage}>
//               Sonraki
//             </button>
//           </div>
//         )}
//       </div>

//       <div className="details-content">
//         <div className="details-section">
//           <h2>Kullanıcının Yorumu</h2>
//           <p>{userComment}</p>
//         </div>

//         <div className="details-section">
//           <h2>Neler Yapabilirsiniz</h2>
//           <p>{event}</p>
//         </div>
//       </div>

//       <div className={`comments-section ${cardStatus === 'COMPLETED' ? '' : 'hide'}`}>
//         <div className="details-section">
//           <h2 className="section-title">Yorum Yap</h2>
//           <textarea
//             className="comment-input"
//             value={userinYazdigiYorum}
//             onChange={e => setuserinYazdigiYorum(e.target.value)}
//             placeholder="Yorumunuzu buraya yazın..."
//           />
//           <button
//             className={`comment-button ${!userinYazdigiYorum ? 'disabled-button' : ''}`}
//             onClick={handleCommentSubmit}
//             disabled={!userinYazdigiYorum}
//           >
//             Gönder
//           </button>
//         </div>

//         <div className="comments-list">
//           <h2>Kullanıcılara Ait Yorumlar</h2>
//           {comments.map((comment) => (
//             <div key={comment.id} className="comment">
//               <div className="comment-header">
//                 <strong>{`${comment.firstName} ${comment.lastName} ${comment.userId === currentUserId ? '(me)' : ''
//                   }`}</strong>
//                 <span className="comment-date">{comment.date ? formatTimeAgo(comment.date) : ''}</span>
//               </div>
//               <p className="comment-body">{comment.userMessage}</p>
//               {comment.id === replyCommentId && (
//                 <div>
//                   <textarea
//                     className="reply-input"
//                     value={comment.replyMessage}
//                     onChange={(e) => {
//                       const updatedComments = [...comments];
//                       const commentIndex = updatedComments.findIndex((c) => c.id === comment.id);
//                       updatedComments[commentIndex].replyMessage = e.target.value;
//                       setComments(updatedComments);
//                     }}
//                     placeholder="Yanıtınızı buraya yazın..."
//                   />
//                   <button
//                     className="reply-button"
//                     onClick={() => handleReplySubmit(comment.id, comment.replyMessage)}
//                   >
//                     Gönder
//                   </button>
//                 </div>
//               )}
//               <Replies commentId={comment.id} />
//               <button className="reply-button" onClick={() => handleReplyButtonClick(comment.id)}>
//                 Yanıtla
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailsComponent;
