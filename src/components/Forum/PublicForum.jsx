import React, { useState, useEffect } from "react";
import axios from "axios";
import Edit from "../../assests/edit/edit.png";
import Delete from "../../assests/edit/delete.png";
import getUser from "../../routes/utils/getUser";

const PublicForum = (props) => {
  const [commentText, setCommentText] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(props.user);
  const [editingComment, setEditingComment] = useState(null);

  useEffect(() => {
    console.log(commentText);
    const fetchData = async () => {
      const fetchedUser = await getUser();
      setUser(fetchedUser);
    };
    fetchData();
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/commonforum`
      );

      if (response.status === 200) {
        console.log(response)
        const commentsFromServer = response.data;
        //console.log(commentsFromServer)
        setComments(commentsFromServer);
      } else {
        console.error(
          "Failed to fetch comments. Unexpected status code:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error while fetching comments:", error);
    }
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      setLikesCount(likesCount + 1);
    } else {
      setLikesCount(likesCount - 1);
    }
  };

  const handleEditClick = (item) => {
    console.log(item)
    setEditingComment(item);
    setCommentText(item.comments.userComment);
  };
  const handleDeleteClick = async (commentId) => {
    console.log(commentId);
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    try {
      const response = await axios.delete(
        `http://localhost:4000/commonforum/comment/${commentId}`
      );
      if (response.status === 200) {
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
  }

  const handleSubmit = async (e) => {
    if(editingComment){
      console.log('im in')
        if(commentText !== ""){
          e.preventDefault();
          console.log(editingComment)
          const updatedComments = comments.map((comment) =>
        comment.id === editingComment.id
          ? { ...comment, comments: { ...comment.comments, userComment: commentText } }
          : comment
      );
      const editingCommentIndex = updatedComments.findIndex(comment => comment.id === editingComment.id);
           
          setComments(updatedComments);
          console.log(updatedComments);
          console.log(editingComment.id)
          console.log(commentText);
          console.log(updatedComments[editingCommentIndex])
          setEditingComment(null);
         // const data = { comments: JSON.stringify(updatedComments[editingCommentIndex].comments) };
          try {
            const response = await axios.put(
              `http://localhost:4000/commonforum/comment/${editingComment.id}`,{updated:updatedComments[editingCommentIndex].comments }
              
            );
            if (response.status === 200) {
              setComments(updatedComments);
              console.log(updatedComments)
            } else {
              console.error(
                "Failed to add comment. Unexpected status code:",
                response.status
              );
            }
          } catch (error) {
            console.error("Error while adding comment:", error);
          }
          setCommentText("");
        }
    }else{
      e.preventDefault();
      // If submitting a new comment
      console.log('i submit')
      const newFeedback = {
        id: comments.length + 1,
        created_at: new Date().toISOString(),
        comments: {
          uId: user.id,
          userName: user.username,
          userComment: commentText,
          typeOfFeedback: isLiked,
        },
      };
      const updatedComments = [...comments, newFeedback];
      const data = { comments: JSON.stringify(newFeedback.comments) };
      console.log(newFeedback.comments)
      try {
        const response = await axios.post(
          `http://localhost:4000/commonforum/comment`,
          data
        );
        if (response.status === 200) {
          setComments(updatedComments);
          console.log(updatedComments)
        } else {
          console.error(
            "Failed to add comment. Unexpected status code:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error while adding comment:", error);
      }
      setCommentText("");
    }
    }
   

  
  
  return (
    <>
      <div className="container2">
        <form className="forum_form" onSubmit={handleSubmit}>
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
            />
            
            <input
              type="text"
              name="comment"
              id="comment"
              placeholder="Add a short comment here"
              value={commentText||''}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
       
        {comments && !editingComment && (
          <div className="comments__container center__display">
            {comments.map((item) => (
              <div className="comment__card" key={item.id}>
                <div className="pic center__display">{item.comments.userName.charAt(0)}</div>
                <div className="comment__info">
                  <div className="commentHeader">
                    <div className="names">
                      <small className="nickname">{item.comments.userName}</small>
                    </div>
                    <div className="commentIcons">
                   
                  </div>
                    {user && item && (item.comments.uId === user.id || user.role=="admin") && (
                      <div className="commentIcons">
                        <div className="commentIcons">
                    <img src={Edit} alt="Edit" className="img" onClick={() => handleEditClick(item)}/>
                    <img src={Delete} alt="Delete" className="img"  onClick={() => handleDeleteClick(item.id)}/>
                  </div>
                      </div>
                    )}
                  </div>

                  <p className="comment">{item.comments.userComment}</p>
                  <div className="comment__bottom">
                    <div className="heart__icon--comment">
                      {item.comments.typeOfFeedback ? (
                        <i className="fas fa-heart positive"></i>
                      ) : (
                        <i className="far fa-heart"></i>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PublicForum;
