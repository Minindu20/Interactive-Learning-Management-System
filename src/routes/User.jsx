import React from "react";
import "./Css/User.css";
import Sidebar from "../components/Dashboard/Sidebar";
import Hero from "../components/Home/Hero";
import Nav from "../components/Dashboard/Nav";
import Header from "../components/Header/Header";
import search from "../assests/search.jpg";
import Squre from "../components/Home/Squre";
import BookCard from "../components/Header/BookCard";
import bk1 from '../assests/books/bk3.jpg'
import book1 from '../assests/books/bk1.jpg'
import {Books} from './BookData'
const User = () => {
  return (
    <div className="user">
      <Sidebar role="user" />
      <div className="userContainer">
        <Nav role="user" />
        <Header />
        <div className="booklist">
          <div className="content-title">
            <h1>Popular</h1>
            <p>Find our popular books</p>
            <div className="grid-container">
              {Books.map((item,index)=>{
               return(
                <div className ="grid-item" key={index}>
                   <BookCard
                    image={item.image}
                    heading={item.title}
                    author={item.author}
                    />
                </div>
               )
              })}
            </div>
          </div>
          <div className="content-title">
            <h1>Top pics</h1>
            <p>Find our Top Pics</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;