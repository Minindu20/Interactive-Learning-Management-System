import React from 'react'
import './BookCard.css'
const BookCard = (props) => {
  console.log(props.image);
  return (
    <div className="bookcard">
       <div className="t-card">
    <div className="t-image">
     <img src={props.image} alt="image"/>
    </div>
    <h4>{props.heading}</h4>
    <h4>{props.author}</h4>
    <p>{props.text}</p>
 </div>
    </div>
    
  )
}

export default BookCard