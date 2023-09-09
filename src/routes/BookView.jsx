import React, { useState } from "react";
import {useParams} from "react-router-dom";
import Navbar from '../components/Home/Navbar';
import './Css/BookView.css';
import {Books} from './BookData'
import Forum from "../components/Forum/Forum";
const BookView = () => {
  const{id:bookId}=useParams();
  const book = Books.find((book)=>book.id.toString() === bookId);
  const{title,author,image,comments,likes}=book;
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      setLikesCount(likesCount + 1);
    } else {
      setLikesCount(likesCount - 1);
    }}

  console.log(book);
  const handleSubmit=()=>{
    console.log('submitted')
  }
  return (
    <>
    <Navbar />
    <div className="container">
      <div className="column">
        <div className="img"><img src={image} alt="image" /></div>
        <div className="details">
          <h1>{title}</h1>
          <h2>Author - {author}</h2>
          <div className="likes-count">
          {isLiked ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}
            <small className="count" onClick={handleLikeClick}>{likesCount}</small>
          </div>
          <div className="about-section">
            <p className="about-label">About:</p>
            <p className="about-text">
              Step into J.K. Rowling's Harry Potter series and discover a mesmerizing
              realm where young wizards unravel mysteries at Hogwarts School. With
              loyal friends by his side, Harry Potter faces his destiny while battling
              the dark forces of Lord Voldemort. Through Rowling's artful prose, this
              series conjures themes of courage, friendship, and the enduring power of
              light.
            </p>
          </div>
          <div className="about-author-section">
            <p className="about-author-label">About Author:</p>
            <p className="about-author-text">
              J.K. Rowling is a celebrated British author known for her iconic Harry
              Potter series. Her writing is characterized by imaginative storytelling,
              intricate world-building, and richly developed characters. Through her
              work, she explores themes of friendship, courage, and the timeless
              battle between good and evil. Rowling's captivating narratives have
              garnered a global fan base, and her books continue to enchant readers of
              all ages. Her literary contributions have solidified her as a beloved
              and influential figure in modern literature.
            </p>
          </div>
        </div>
        <div className="button">
          <button type='submit' style={{ marginTop: '2rem' }} onClick={handleSubmit} className="btn">Reserve</button>
        </div>
      </div>
      <div className="row">
        <Forum 
        comments={book.comments}
        bookId={book.id}
        />
      </div>
    </div>
  </>
  
  )
}

export default BookView