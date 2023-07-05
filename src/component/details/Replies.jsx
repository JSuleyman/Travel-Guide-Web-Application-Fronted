import React, { useEffect, useState } from 'react';
import makeApiRequest from '../../api/makeApiRequest';
import './Replies.css';
import { faArrowAltCircleDown, faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Replies = ({ commentId, newReplyComment }) => {
    const [showReplies, setShowReplies] = useState(false);
    const [replyComments, setReplyComments] = useState([]);
    const [currentUserId, setCurrentUserId] = useState('');
    const [replyCount, setReplyCount] = useState(0);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        fetchReplyCount(commentId);
    }, [commentId]);

    useEffect(() => {
        fetchReplyCount(commentId);
    }, [newReplyComment]);

    useEffect(() => {
        fetchReplyComments(commentId, offset, limit);
    }, [commentId, offset, limit]);

    const fetchReplyCount = (commentId) => {
        const url = `http://localhost:8082/user_comment_reply/count/${commentId}`;

        makeApiRequest(url, 'GET')
            .then(response => {
                console.log(response.data);
                setReplyCount(response.data);
            })
            .catch(error => {
                console.error('Yanıt sayısı alınırken bir hata oluştu:', error);
            });
    };

    const handleShowReplies = () => {
        setShowReplies(!showReplies);
        if (!showReplies) {
            setOffset(0); // Yanıtları baştan getirmek için offset sıfırlanır
        }
    };

    const fetchReplyComments = (commentId, offset, limit) => {
        const url = `http://localhost:8082/user_comment_reply/${commentId}?page=${offset}&size=${limit}`;

        makeApiRequest(url, 'GET')
            .then(response => {
                console.log(response.data);
                setReplyComments(response.data);
                fetchCurrentUserId();
            })
            .catch(error => {
                console.error('Yanıtlar alınırken bir hata oluştu:', error);
            });
    };

    const fetchCurrentUserId = () => {
        const url = 'http://localhost:8082/user_comment/current_user_id';

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

    const handleLoadMore = () => {
        setLimit((prevOffset) => prevOffset + 1 * limit); // Offset'i güncelleyerek bir sonraki sayfayı getir
        // setOffset((prevOffset) => prevOffset + 1 * limit); // Offset'i güncelleyerek bir sonraki sayfayı getir
      };
      

    return (
        <div className="replies-container">
            <button className={`reply-toggle-button ${showReplies ? 'open' : ''}`} onClick={handleShowReplies}>
                Yanıtları {showReplies ? 'Gizle' : 'Göster'} ({replyCount})
                <FontAwesomeIcon icon={showReplies ? faArrowAltCircleUp : faArrowAltCircleDown} className="arrow-icon" />
            </button>
            {showReplies && (
                <div className="replies-list">
                    {replyComments.map(reply => (
                        <div key={reply.id} className="reply">
                            <div className="reply-header">
                                <strong>{`${reply.firstName} ${reply.lastName} ${reply.userId === currentUserId ? '(me)' : ''}`}</strong>
                                <span className="comment-date">{reply.dateAndTime ? formatTimeAgo(reply.dateAndTime) : ''}</span>
                            </div>
                            <p className="reply-body">{reply.replyCommentList}</p>
                        </div>
                    ))}
                    {replyComments.length < replyCount && (
                        <button className="load-more-button" onClick={handleLoadMore}>
                            Daha Fazla Yükle
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Replies;



// import React, { useEffect, useState } from 'react';
// import makeApiRequest from '../../api/makeApiRequest';
// import './Replies.css';
// import { faArrowAltCircleDown, faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// const Replies = ({ commentId, newReplyComment }) => {
//     const [showReplies, setShowReplies] = useState(false);
//     const [replyComments, setReplyComments] = useState([]);
//     const [currentUserId, setCurrentUserId] = useState('');
//     const [replyCount, setReplyCount] = useState(0);


//     useEffect(() => {
//         fetchReplyCount(commentId);
//     }, [commentId]);

//     useEffect(() => {
//         debugger
//         fetchReplyCount(commentId);
//     }, [newReplyComment]);


//     const fetchReplyCount = (commentId) => {
//         const url = `http://localhost:8082/user_comment_reply/count/${commentId}`;

//         makeApiRequest(url, 'GET')
//             .then(response => {
//                 console.log(response.data);
//                 setReplyCount(response.data);
//             })
//             .catch(error => {
//                 console.error('Yanıt sayısı alınırken bir hata oluştu:', error);
//             });
//     };

//     const handleShowReplies = () => {
//         setShowReplies(!showReplies);
//         if (!showReplies) {
//             fetchReplyComments(commentId);
//         }
//     };

//     const fetchReplyComments = (commentId) => {
//         const url = `http://localhost:8082/user_comment_reply/${commentId}`;

//         makeApiRequest(url, 'GET')
//             .then(response => {
//                 console.log(response.data);
//                 setReplyComments(response.data);
//                 fetchCurrentUserId();
//             })
//             .catch(error => {
//                 console.error('Yanıtlar alınırken bir hata oluştu:', error);
//             });
//     };

//     const fetchCurrentUserId = () => {
//         const url = 'http://localhost:8082/user_comment/current_user_id';

//         makeApiRequest(url, 'GET')
//             .then(response => {
//                 console.log(response.data);
//                 setCurrentUserId(response.data);
//             })
//             .catch(error => {
//                 console.error('Mevcut kullanıcı ID alınırken bir hata oluştu:', error);
//             });
//     };


//     function formatTimeAgo(dateTime) {
//         const dateObj = new Date(dateTime);
//         const now = new Date();

//         const diffInMilliseconds = now - dateObj;
//         const diffInSeconds = Math.floor(diffInMilliseconds / 1000);

//         if (diffInSeconds < 60) {
//             return `${diffInSeconds} saniye önce`;
//         } else if (diffInSeconds < 3600) {
//             const diffInMinutes = Math.floor(diffInSeconds / 60);
//             return `${diffInMinutes} dakika önce`;
//         } else if (diffInSeconds < 86400) {
//             const diffInHours = Math.floor(diffInSeconds / 3600);
//             return `${diffInHours} saat önce`;
//         } else {
//             const diffInDays = Math.floor(diffInSeconds / 86400);
//             return `${diffInDays} gün önce`;
//         }
//     }

//     return (
//         <div className="replies-container">
//             <button className={`reply-toggle-button ${showReplies ? 'open' : ''}`} onClick={handleShowReplies}>
//                 Yanıtları {showReplies ? 'Gizle' : 'Göster'} ({replyCount})
//                 <FontAwesomeIcon icon={showReplies ? faArrowAltCircleUp : faArrowAltCircleDown} className="arrow-icon" />
//             </button>
//             {showReplies && (
//                 <div className="replies-list">
//                     {replyComments.map(reply => (
//                         <div key={reply.id} className="reply">
//                             <div className="reply-header">
//                                 <strong>{`${reply.firstName} ${reply.lastName} ${reply.userId === currentUserId ? '(me)' : ''}`}</strong>
//                                 <span className="comment-date">{reply.dateAndTime ? formatTimeAgo(reply.dateAndTime) : ''}</span>
//                             </div>
//                             <p className="reply-body">{reply.replyCommentList}</p>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Replies;


// import React, { useEffect, useState } from 'react';
// import makeApiRequest from '../../api/makeApiRequest';
// import './Replies.css';


// const Replies = ({ commentId }) => {
//     const [showReplies, setShowReplies] = useState(false);
//     const [replyComments, setReplyComments] = useState([]);
//     const [currentUserId, setCurrentUserId] = useState('');

//     const handleShowReplies = () => {
//         setShowReplies(!showReplies);
//         if (!showReplies) {
//             fetchReplyComments(commentId);
//         }
//     };

//     const fetchReplyComments = (commentId) => {
//         const url = `http://localhost:8082/user_comment_reply/${commentId}`;

//         makeApiRequest(url, 'GET')
//             .then(response => {
//                 console.log(response.data);
//                 setReplyComments(response.data);
//                 fetchCurrentUserId();
//             })
//             .catch(error => {
//                 console.error('Yanıtlar alınırken bir hata oluştu:', error);
//             });
//     };

//     const fetchCurrentUserId = () => {
//         const url = 'http://localhost:8082/user_comment/current_user_id';

//         makeApiRequest(url, 'GET')
//             .then(response => {
//                 console.log(response.data);
//                 setCurrentUserId(response.data);
//             })
//             .catch(error => {
//                 console.error('Mevcut kullanıcı ID alınırken bir hata oluştu:', error);
//             });
//     };


//     function formatTimeAgo(dateTime) {
//         const dateObj = new Date(dateTime);
//         const now = new Date();

//         const diffInMilliseconds = now - dateObj;
//         const diffInSeconds = Math.floor(diffInMilliseconds / 1000);

//         if (diffInSeconds < 60) {
//             return `${diffInSeconds} saniye önce`;
//         } else if (diffInSeconds < 3600) {
//             const diffInMinutes = Math.floor(diffInSeconds / 60);
//             return `${diffInMinutes} dakika önce`;
//         } else if (diffInSeconds < 86400) {
//             const diffInHours = Math.floor(diffInSeconds / 3600);
//             return `${diffInHours} saat önce`;
//         } else {
//             const diffInDays = Math.floor(diffInSeconds / 86400);
//             return `${diffInDays} gün önce`;
//         }
//     }

//     return (
//         <div>
//             <button className="reply-toggle-button" onClick={handleShowReplies}>
//                 {showReplies ? 'Yanıtları Gizle' : 'Yanıtları Göster'}
//             </button>
//             {showReplies && (
//                 <div className="replies-list">
//                     {replyComments.map(reply => (
//                         <div key={reply.id} className="reply">
//                             <div className="reply-header">
//                                 <strong>{`${reply.firstName} ${reply.lastName} ${reply.userId === currentUserId ? '(me)' : ''
//                                     }`}</strong>
//                                 <span className="comment-date">{reply.dateAndTime ? formatTimeAgo(reply.dateAndTime) : ''}</span>
//                             </div>
//                             <p className="reply-body">{reply.replyCommentList}</p>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Replies;
