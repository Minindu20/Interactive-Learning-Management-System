import React from "react";
import "./Css/User.css";
import Sidebar from "../components/Dashboard/Sidebar";
import Nav from "../components/Dashboard/Nav";
import Navbar from "../components/Home/Navbar";
import Header from "../components/Header/Header";
import BookCard from "../components/Header/BookCard";
import {Books} from './BookData'
import { Link,Outlet,useParams } from "react-router-dom";
const User = () => {
  return (
    <div className="user">
      <Sidebar role="user" />
      <div className="userContainer">
        {/* <Nav role="user" /> */}
        <Navbar/>
        <Header />
        <div className="booklist">
          <div className="content-title">
            <h1>Popular</h1>
            <p>Find our popular books</p>
            <div className="grid-container">
              {Books.map((item,index)=>{
               return(
                <div className ="grid-item" key={index}>
                  <Link to={`/user/book/${item.id}`}> 
                  <BookCard
                    image={item.image}
                    heading={item.title}
                    author={item.author}
                    />
                   </Link>  
                
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