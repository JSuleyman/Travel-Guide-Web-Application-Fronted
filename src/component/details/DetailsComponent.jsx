import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './DetailsComponent.css';
import makeApiRequest from '../../api/makeApiRequest';
import Replies from './Replies';
import InfiniteScroll from 'react-infinite-scroll-component';

const DetailsComponent = () => {
  const location = useLocation();

  const { id } = location.state || {};
  const [userComment, setUserComment] = useState('');
  const [event, setEvent] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [fkDetailsId, setFkDetailsId] = useState('');
  const [comments, setComments] = useState([]);
  const [userinYazdigiYorum, setuserinYazdigiYorum] = useState('');
  const [cardStatus, setCardStatus] = useState('');

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [replyCommentId, setReplyCommentId] = useState(null);

  const [commentCount, setCommentCount] = useState('');

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  const [isSubmitting, setIsSubmitting] = useState(false);


  const [isHasData, setIsHasData] = useState(true);

  useEffect(() => {
    userCommentsList(id, offset, limit);
  }, [id, offset, limit]);

  useEffect(() => {
    const placesId = id;

    makeApiRequest(`https://travel-guide-main-de97df9e068d.herokuapp.com/travel_destination_details?placesId=${placesId}`, 'GET')
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
    if (!isSubmitting) {
      setIsSubmitting(true);

      const payload = {
        travelDestinationDetailsId: fkDetailsId,
        userComment: userinYazdigiYorum
      };

      makeApiRequest('https://travel-guide-main-de97df9e068d.herokuapp.com/user_comment', 'POST', payload)
        .then(response => {
          console.log('Yorum gönderildi:', response.data);
          setuserinYazdigiYorum('');
          setOffset(0);
          userCommentsList();
          // if (isHasData === false) {
          //   window.location.reload();
          // }
        })
        .catch(error => {
          console.error('Yorum gönderilirken bir hata oluştu:', error);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };


  const handleReplySubmit = (commentId, replyMessage) => {
    const payload = {
      commentId: commentId,
      replyMessage: replyMessage
    };

    makeApiRequest('https://travel-guide-main-de97df9e068d.herokuapp.com/user_comment_reply', 'POST', payload)
      .then(response => {
        console.log('Reply submitted:', response.data);
        setReplyCommentId(null);
        userCommentsList();
      })
      .catch(error => {
        console.error('An error occurred while submitting the reply:', error);
      });
  };

  const userCommentsList = () => {
    const url = `https://travel-guide-main-de97df9e068d.herokuapp.com/user_comment/details_id?fkPlacesId=${id}&page=${offset}&size=${limit}`;

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
          currentUserId: comment.currentUserId,
          commentReplyCount: comment.commentReplyCount,
          replyMessage: ''
        }));
        // Offset sıfırlanmışsa, mevcut yorumları güncellemek yerine yeni yorumları ayarlayın
        if (offset === 0) {
          setComments(userComments1);
        } else {
          // Offset sıfırlanmamışsa, mevcut yorumları yeni yorumlarla birleştirin
          setComments(prevComments => [...prevComments, ...userComments1]);
        }
        if (response.data.length === 0) {
          setIsHasData(false);
        }
      })
      .catch(error => {
        console.error('Yorumlar alınırken bir hata oluştu:', error);
      });
  };

  function formatTimeAgo(dateTime) {
    const dateObj = new Date(dateTime);
    const now = new Date();

    const diffInMilliseconds = now - dateObj;
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} saniyə əvvəl`;
    } else if (diffInSeconds < 3600) {
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      return `${diffInMinutes} dəqiqə əvvəl`;
    } else if (diffInSeconds < 86400) {
      const diffInHours = Math.floor(diffInSeconds / 3600);
      return `${diffInHours} saat əvvəl`;
    } else {
      const diffInDays = Math.floor(diffInSeconds / 86400);
      return `${diffInDays} gün əvvəl`;
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

  const handleLoadMore = () => {
    // Offset'i güncelleyerek bir sonraki sayfayı getirin
    setOffset((prevOffset) => prevOffset + 1);
  };

  const LoadingSpinner = () => (
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
  );


  useEffect(() => {
    const travelDestinationId = id;

    makeApiRequest(`https://travel-guide-main-de97df9e068d.herokuapp.com/user_comment/count?travelDestinationId=${travelDestinationId}`, 'GET')
      .then(response => {
        console.log('API isteği tamamlandı:', response.data);
        setCommentCount(response.data);

        console.log(commentCount + "asdasdasdasdasd");
      })
      .catch(error => {
        console.error('Detay alınırken bir hata oluştu:', error);
      });
  }, [comments]);

  return (
    <div className="details-container">
      <div className="details-image">
        {imageUrls.length > 0 && (
          <img
            src={`https://travel-guide-main-de97df9e068d.herokuapp.com/image/${id}/${imageUrls[selectedImageIndex]}`}
            alt="Resim"
            className="image-preview"
          />
        )}
        {imageUrls.length > 1 && (
          <div className="image-navigation">
            <button className="image-prev-button" onClick={handlePrevImage}>
              Əvvəlki
            </button>
            <button className="image-next-button" onClick={handleNextImage}>
              Sonraki
            </button>
          </div>
        )}
      </div>

      <div className="details-content">
        <div className="details-section">
          <h2 className='h2-detal-component'>Şərh</h2>
          <p>{userComment}</p>
        </div>

        <div className="details-section">
          <h2 className='h2-detal-component'>Edilə biləcəklər siyahısı</h2>
          <p>{event}</p>
        </div>
      </div>

      <div className={`comments-section ${cardStatus === 'COMPLETED' ? '' : 'hide'}`}>

        <div className="details-section">
          <h2 className="section-title">Şərh yaz</h2>
          <textarea
            className="comment-input"
            value={userinYazdigiYorum}
            onChange={e => setuserinYazdigiYorum(e.target.value)}
            placeholder="Şərhinizi buraya yazın..."
          />
          <button
            className={`comment-button ${!userinYazdigiYorum ? 'disabled-button' : ''}`}
            onClick={handleCommentSubmit}
            disabled={!userinYazdigiYorum || isSubmitting}
          >
            Göndər
          </button>
        </div>

        <div className="comments-list">
          <h2>İstifadəçilərə aid şərhlər ({commentCount})</h2>
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-header">
                <strong>{`${comment.firstName} ${comment.lastName} ${comment.userId === comment.currentUserId ? '(mən)' : ''}`}</strong>
                <span className="comment-date">{comment.date ? formatTimeAgo(comment.date) : ''}</span>
              </div>
              <p className="comment-body">{comment.userMessage}</p>
              <button className="reply-button" onClick={() => handleReplyButtonClick(comment.id)}>
                <span className="reply-button-text">Cavabla</span>
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
                      placeholder="Cavabınızı buraya yazın..."
                    />
                    <div className={`reply-button-group ${comment.replyMessage ? '' : 'disabled-button'}`}>
                      <button className="reply-button-sum"
                        disabled={comment.replyMessage ? false : true}
                        onClick={() => handleReplySubmit(comment.id, comment.replyMessage)}>
                        Göndər
                      </button>
                      <button className="cancel-button" onClick={() => handleReplyCancel(comment.id)}>
                        Ləğv et
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <Replies commentReplyCount={comment.commentReplyCount} commentId={comment.id} />
            </div>

          ))}
          <InfiniteScroll
            dataLength={comments.length} // This is important to track the length of your data
            next={handleLoadMore} // Load more function
            hasMore={isHasData} // Set to true if there are more comments to load, or false if not (you can implement a condition here)
            loader={<LoadingSpinner />} // Custom loader component, or you can use a built-in loader from the library
            endMessage={<p>No more comments to load.</p>} // Message displayed when there are no more comments to load
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsComponent;


// ----------

// esas


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
//   const [cardStatus, setCardStatus] = useState('');

//   // const [newReplyComment, setNewReplyComment] = useState(0);

//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [replyCommentId, setReplyCommentId] = useState(null);

//   const [offset, setOffset] = useState(0);
//   const [limit, setLimit] = useState(10);


//   useEffect(() => {
//     userCommentsList(id, offset, limit);
//   }, [id, offset, limit]);


//   useEffect(() => {
//     const placesId = id;

//     makeApiRequest(`https://travel-guide-main-de97df9e068d.herokuapp.com/travel_destination_details?placesId=${placesId}`, 'GET')
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

//     makeApiRequest('https://travel-guide-main-de97df9e068d.herokuapp.com/user_comment', 'POST', payload)
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

//     makeApiRequest('https://travel-guide-main-de97df9e068d.herokuapp.com/user_comment_reply', 'POST', payload)
//       .then(response => {
//         console.log('Reply submitted:', response.data);
//         setReplyCommentId(null);
//         userCommentsList();
//         // setNewReplyComment(prevValue => prevValue + 1);
//       })
//       .catch(error => {
//         console.error('An error occurred while submitting the reply:', error);
//       });
//   };

//   const userCommentsList = () => {
//     const url = `https://travel-guide-main-de97df9e068d.herokuapp.com/user_comment/details_id?fkPlacesId=${id}&page=${offset}&size=${limit}`;

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
//           currentUserId: comment.currentUserId,
//           commentReplyCount: comment.commentReplyCount,
//           replyMessage: ''
//         }));
//         setComments(userComments1);
//         // fetchCurrentUserId();
//       })
//       .catch(error => {
//         console.error('Yorumlar alınırken bir hata oluştu:', error);
//       });
//   };

//   // useEffect(() => {
//   //   const url = 'https://travel-guide-main-de97df9e068d.herokuapp.com/user_comment/current_user_id';

//   //   makeApiRequest(url, 'GET')
//   //     .then(response => {
//   //       console.log(response.data);
//   //       setCurrentUserId(response.data);
//   //     })
//   //     .catch(error => {
//   //       console.error('Mevcut kullanıcı ID alınırken bir hata oluştu:', error);
//   //     });
//   // }, [currentUserId]);

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

//   const handleReplyCancel = (commentId) => {
//     const updatedComments = comments.map(comment => {
//       if (comment.id === commentId) {
//         return {
//           ...comment,
//           replyMessage: ''
//         };
//       }
//       return comment;
//     });
//     setComments(updatedComments);
//     setReplyCommentId(null);
//   };

//   const handleLoadMore = () => {
//     setLimit((prevOffset) => prevOffset + 1 * limit); // Offset'i güncelleyerek bir sonraki sayfayı getir
//     // setOffset((prevOffset) => prevOffset + 1 * limit); // Offset'i güncelleyerek bir sonraki sayfayı getir
//   };

//   return (
//     <div className="details-container">
//       <div className="details-image">
//         {imageUrls.length > 0 && (
//           <img
//             src={`https://travel-guide-main-de97df9e068d.herokuapp.com/image/${id}/${imageUrls[selectedImageIndex]}`}
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
//           <h2 className='h2-detal-component'>Kullanıcının Yorumu</h2>
//           <p>{userComment}</p>
//         </div>

//         <div className="details-section">
//           <h2 className='h2-detal-component'>Neler Yapabilirsiniz</h2>
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
//                 <strong>{`${comment.firstName} ${comment.lastName} ${comment.userId === comment.currentUserId ? '(me)' : ''}`}</strong>
//                 <span className="comment-date">{comment.date ? formatTimeAgo(comment.date) : ''}</span>
//               </div>
//               <p className="comment-body">{comment.userMessage}</p>
//               <button className="reply-button" onClick={() => handleReplyButtonClick(comment.id)}>
//                 <span className="reply-button-text">Yanıtla</span>
//               </button>
//               <div>
//                 {comment.id === replyCommentId && (
//                   <div className="reply-input-container">
//                     <textarea
//                       className="reply-input"
//                       value={comment.replyMessage}
//                       onChange={(e) => {
//                         const updatedComments = [...comments];
//                         const commentIndex = updatedComments.findIndex((c) => c.id === comment.id);
//                         updatedComments[commentIndex].replyMessage = e.target.value;
//                         setComments(updatedComments);
//                       }}
//                       placeholder="Yanıtınızı buraya yazın..."
//                     />
//                     <div className="reply-button-group">
//                       <button className="reply-button-sum" onClick={() => handleReplySubmit(comment.id, comment.replyMessage)}>
//                         Gönder
//                       </button>
//                       <button className="cancel-button" onClick={() => handleReplyCancel(comment.id)}>
//                         İptal Et
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//               <Replies commentReplyCount={comment.commentReplyCount} commentId={comment.id} />
//             </div>

//           ))}
//           <button className="load-more-button" onClick={handleLoadMore}>
//             Daha Fazla Yükle
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailsComponent;
