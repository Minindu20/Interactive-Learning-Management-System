import React, { useState } from "react";
import { useEffect } from "react";
import "./Css/User.css";
import Sidebar from "../components/Dashboard/Sidebar";
import Nav from "../components/Dashboard/Nav";
import Navbar from "../components/Home/Navbar";
import Header from "../components/Header/Header";
import BookCard from "../components/Header/BookCard";
import { Books } from "./BookData";
import { Link, Outlet, useParams } from "react-router-dom";
import axios from "axios";

const User = () => {
  const [query, setQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [books, setBookData] = useState([]);
  const [book, setData] = useState([]);
  const[selectedOption,setSelectedOption]=useState("popular")

  const handleDropdownChange=(event)=>{
    setSelectedOption(event.target.value);
    console.log(selectedOption)
  }
   useEffect(() => {
    async function fetchData(){
      try{
        console.log(`Fetching data for genre: ${selectedOption}`);
        const response =await axios.get(`http://localhost:4000/user/genreRelatedBooks?g=${selectedOption}`)
        console.log(response)
        setData(response.data)
      }
     catch (error) {
      console.error("Error fetching books:", error);
    }}
    fetchData();
}, [selectedOption]);
  

  const handleSearch = async (query) => {
    // setQuery(query);
    console.log(query);

    try {
      const response2 = await axios.get(`http://localhost:4000/user/filterBooks?q=${query}`);
      setData(response2.data);
      console.log(response2);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  

  return (
    <div className="user">
      <Sidebar role="user" />
      <div className="userContainer">
        {/* <Nav role="user" /> */}
        <Navbar />
        <Header handleSearch={handleSearch} />
        <div className="booklist">
        <div className="dropdown-container">
      <label  className="genre-label">Select Book Genres:</label>
      <select name="book-genres" id="book-genres" className="genre-dropdown" value={selectedOption} onChange={handleDropdownChange}>
              <option value="Popular" className="genre-option" >Popular</option>
              <option value="Mystery" className="genre-option">Mystery</option>
              <option value="Fantasy" className="genre-option">Fantasy</option>
              <option value="Romance" className="genre-option">Romance</option>
              <option value="Science-Fiction" className="genre-option">Science Fiction</option>
              <option value="Biography" className="genre-option">Biography</option>
            </select>
            <p>Selected Option: {selectedOption}</p>
      </div>
      {!selectedOption ? (<div className="content-title">
            <h1>{selectedOption}</h1>
            <p>Find our popular books</p>
      
            <div className="grid-container">
              {book.map((item, index) => {
                return (
                  <div className="grid-item" key={index}>
                    <Link to={`/user/book/${item.id}`}>
                      <BookCard
                        image={item.image}
                        heading={item.title}
                        author={item.author}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>):(<div className="content-title">
            <h1>Search Results</h1>
            <p>Here Is Your Search Results</p>
      
            <div className="grid-container">
              {book.map((item, index) => {
                return (
                  <div className="grid-item" key={index}>
                    <Link to={`/user/book/${item.id}`}>
                      <BookCard
                        image={item.image}
                        heading={item.title}
                        author={item.author}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>) }
          
          {/* <div className="content-title">
            <h1>Top pics</h1>
            <p>Find our Top Pics</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default User;


// useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await axios.get('http://localhost:4000/user');
  //       // console.log(response);
  //       setBookData(response.data);

  //       // console.log(books[0]);
  //     } catch (error) {
  //       console.error('Error fetching books:', error);
  //     }
  //   }

  //   fetchData();
  // }, []);

  // const handleSearch = (query) => {
  //       setQuery(query);

  //   console.log(query);
  //     // Filter the books based on the query
  //     // const filtered = books.filter((book) =>
  //     //   book.title.toLowerCase().includes(query.toLowerCase())
  //     // );
  //     // setFilteredBooks(filtered);
  //     // // console.log(filteredBooks)
  //   }

  // useEffect(()=>{
  //   const fetchbooks = async()=>{
  //     console.log(query);
  //     const response = axios.get(`http://localhost:4000/user?q=${query}`);
  //     setData(response.data);
  //     console.log(book);
  //   }
  //   fetchbooks();
  // },[])
  // Use useEffect to log filteredBooks after state update
  //   useEffect(() => {
  //   console.log(filteredBooks);