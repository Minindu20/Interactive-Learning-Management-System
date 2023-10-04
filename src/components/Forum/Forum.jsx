import React, { useState } from 'react';
import axios from 'axios';
import './Forum.css';
//import { updateBookComments,Books } from '../../routes/BookData';
const Forum = (props) => {
  //console.log(props.bookId);
  const [userName, setUserName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comments, setComments] = useState(props.comments);
  const[book,setBook]=useState(props.bookId)
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      setLikesCount(likesCount + 1);
    } else {
      setLikesCount(likesCount - 1);
    }
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (userName && commentText !== '') {
      const newFeedback = {
        id: comments.length+1,
        userName: userName,
        userComment: commentText,
        typeOfFeedback: isLiked,
      };
      const updatedComments = [...comments, newFeedback];
      const data = { id: book, comments: JSON.stringify(updatedComments) };

      //console.log(updatedComments);
      
     // setComments(updatedComments);
      setUserName('');
      setCommentText('');
      setIsLiked(false);

      
      try {
        const response = await axios.post(`http://localhost:4000/user/book/comment`, data);
        if (response.status === 201) {
          //console.log('Comment added');
          setComments(updatedComments);
        } else {
          console.error('Failed to add comment. Unexpected status code:', response.status);
        }
      } catch (error) {
        console.error('Error while adding comment:', error);
      }
      
    }
  };

  return (
    <>
      <div className="container2">
      
        <form onSubmit={handleSubmit}>
          <div className="heart__icon center__display" onClick={handleLikeClick}>
            {isLiked ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}
          </div>
          
          <div className="form__info center__display">
            <input
              type="text"
              name="user"
              id="user"
              placeholder="Your user name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="text"
              name="comment"
              id="comment"
              placeholder="Add a short comment here"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
         
        </form>

        <div className="comments__container center__display">
          {comments.map((item) => (
            <div className="comment__card" key={item.id}>
              <div className="pic center__display">{item.userName.charAt(0)}</div>
              <div className="comment__info">
                <small className="nickname">{item.userName}</small>
                <p className="comment">{item.userComment}</p>
                <div className="comment__bottom">
                  <div className="heart__icon--comment">
                    {item.typeOfFeedback ? <i className="fas fa-heart positive"></i> : <i className="far fa-heart"></i>}
                    
                  </div>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Forum;
