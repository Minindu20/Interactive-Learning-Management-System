import React, { useState } from "react";
import axios from "axios";
import "./Forum.css";
import Edit from "../../assests/edit/edit.png";
import Delete from "../../assests/edit/delete.png";
//import { updateBookComments,Books } from '../../routes/BookData';
const Forum = (props) => {
  //console.log(props.bookId);
  //const [userName, setUserName] = useState('');
  const [commentText, setCommentText] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comments, setComments] = useState(props.comments);
  const [book, setBook] = useState(props.bookId);
  const [user, setUser] = useState(props.user);
  const [edit, setEdit] = useState(false);
  const [editingComment, setEditingComment] = useState(null);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      setLikesCount(likesCount + 1);
    } else {
      setLikesCount(likesCount - 1);
    }
  };

  const handleEditClick = (comment) => {
    setEditingComment(comment);
    setCommentText(comment.userComment);
  };

  const handleDeleteClick = async (commentId) => {
    // Implement delete functionality here
    // Send a request to your server to delete the comment
    try {
      const response = await axios.delete(
        `http://localhost:4000/user/book/comment/${book}/${commentId}`
      );
      if (response.status === 200) {
        const updatedComments = comments.filter(
          (comment) => comment.id !== commentId
        );
        setComments(updatedComments);
      } else {
        console.error(
          "Failed to delete comment. Unexpected status code:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error while deleting comment:", error);
    }
  };
  // console.log(user);
  // console.log(user.username);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (commentText !== "") {
      if (editingComment !== null) {
        // If editing an existing comment
        const updatedComments = comments.map((comment) =>
          comment.id === editingComment.id
            ? { ...comment, userComment: commentText }
            : comment
        );
        setComments(updatedComments);
        console.log(updatedComments);
        setEditingComment(null);
        try {
          // Make a PUT request to update the comment on the server
          const response = await axios.put(
            `http://localhost:4000/user/book/comment/${book}/${editingComment.id}`,
            { userComment: commentText }
          );
  
          if (response.status !== 200) {
            console.error(
              "Failed to update comment. Unexpected status code:",
              response.status
            );
          }
        } catch (error) {
          console.error("Error while updating comment:", error);
        }
        
      } else {
        // If submitting a new comment
        const newFeedback = {
          id: comments.length + 1,
          userName: user.username,
          uId: user.id,
          userComment: commentText,
          typeOfFeedback: isLiked,
        };
        const updatedComments = [...comments, newFeedback];
        const data = { id: book, comments: JSON.stringify(updatedComments) };

        try {
          const response = await axios.post(
            `http://localhost:4000/user/book/comment`,
            data
          );
          if (response.status === 201) {
            setComments(updatedComments);
          } else {
            console.error(
              "Failed to add comment. Unexpected status code:",
              response.status
            );
          }
        } catch (error) {
          console.error("Error while adding comment:", error);
        }
      }

      setCommentText("");
      setIsLiked(false);
    }
  };

  return (
    <>
      <div className="container2">
        <form className='forum_form'onSubmit={handleSubmit}>
          <div
            className="heart__icon center__display"
            onClick={handleLikeClick}
          >
            {isLiked ? (
              <i className="fas fa-heart"></i>
            ) : (
              <i className="far fa-heart"></i>
            )}
          </div>

          <div className="form__info center__display">
            <input
              type="text"
              name="user"
              id="user"
              placeholder="Your user name"
              value={user && user.username}
              readOnly
              // onChange={(e) => setUserName(e.target.value)}
            />
            {/* <div className="editComment">
            {user &&(currentUser.username === post.username) &&(<div className="edit">
            <Link to={`/write?edit=2`} state={post}>  <img src={Edit} alt=""></img></Link>
             
               <img onClick={handleDelete} src={Delete} alt=""></img>
          </div>)}
            </div> */}

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
        {!editingComment &&
        <div className="comments__container center__display">
        {comments.map((item) => (
          <div className="comment__card" key={item.id}>
            <div className="pic center__display">
              {item.userName.charAt(0)}
            </div>
            <div className="comment__info">
              <div className="commentHeader">
                <div className="names">
                  <small className="nickname">{item.userName}</small>
                </div>
                {console.log(item.uId, user.id)}
                {user && item && item.uId === user.id && (
                  <div className="commentIcons">
                    <img src={Edit} alt="Edit" className="img" onClick={() => handleEditClick(item)}/>
                    <img src={Delete} alt="Delete" className="img"  onClick={() => handleDeleteClick(item.id)}/>
                  </div>
                )}
              </div>

              <p className="comment">{item.userComment}</p>
              <div className="comment__bottom">
                <div className="heart__icon--comment">
                  {item.typeOfFeedback ? (
                    <i className="fas fa-heart positive"></i>
                  ) : (
                    <i className="far fa-heart"></i>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>}
        
      </div>
    </>
  );
};

export default Forum;
