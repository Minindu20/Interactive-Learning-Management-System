import React, { useState,useEffect } from "react";
import {useParams} from "react-router-dom";
import Navbar from '../components/Home/Navbar';
import './Css/BookView.css';
//import {Books} from './BookData'
import Forum from "../components/Forum/Forum";
import axios from "axios";
const BookView = () => {
  const[book,setBook]=useState(null);
  const{id:bookId}=useParams();
  //const book = Books.find((book)=>book.id.toString() === bookId);
  //const{title,author,image,comments,likes}=book;
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  
  useEffect(()=>{
    const fetchBookData = async()=>{
      try{
        console.log(bookId);
        const response = await axios.get(`http://localhost:4000/user/book/${bookId}`);

        setBook(response.data[0]);
        setLikesCount(response.data[0].likes)
      }catch(error){
        console.error('Error fetching book data:', error);
      }
    };
    fetchBookData();
  },[bookId]);
  

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
      {book ?  (<div className="column">
        <div className="img"><img src={book.image} alt="image" /></div>
        <div className="details">
          <h1>{book.title}</h1>
          <h2>Author - {book.author}</h2>
          <div className="likes-count">
          {isLiked ? <i className="fas fa-heart" onClick={handleLikeClick}></i> : <i className="far fa-heart"onClick={handleLikeClick}></i>}
            <small className="count" >{likesCount}</small>
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
        <div className="reserve-button">
          <button type='submit' style={{ marginTop: '2rem' }} onClick={handleSubmit} className="btn">Reserve</button>
        </div>
      </div>
    ):(
      <p>Loading...</p>
      )

      }
        <div className="row">
          {book && (
            <Forum
              comments={book.comments}
              bookId={book.id}
            />
          )}
        </div>
    </div>
  </>
  
  )
}

export default BookView