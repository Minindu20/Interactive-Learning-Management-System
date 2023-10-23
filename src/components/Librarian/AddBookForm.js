import "./AddBookForm.css";
import React, { useState } from "react";
import axios from "axios";

function AddBookForm() {
    const [ISBN, setISBN] = useState("");
    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [des, setDes] = useState("");
    const [date, setDate] = useState("");
    const [image, setImage] = useState("");

    const addBookDataToDatabase = (ISBN , name ,date ,  author , des , image ) => {
        const data = {
            isbn: ISBN ,
            name : name ,
            date : date ,
            author : author , 
            des : des ,
            image : image

        };
       

        axios.post("http://localhost:4000/addBookToDatabase", data)
            .then((response) => {
                // Handle the response from the backend
            })
            .catch((error) => {
                console.error("Error Occurred:", error);
            });
    }

    return (
        <div className="form-container">
            <h1>Add New Book</h1>
            <form className="form1">
                <input placeholder="Book ISBN Number" onChange={(event) => setISBN(event.target.value)}></input>
                <input placeholder="Book Name" onChange={(event) => setName(event.target.value)}></input>
                <input placeholder="Author" onChange={(event) => setAuthor(event.target.value)}></input>
               
                
                <textarea placeholder="Book Description" rows="4" onChange={(event) => setDate(event.target.value)}></textarea>
                <label htmlFor="image">Add Cover Page:</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={(event)=>setImage(event.target.value)}></input>
                <button onClick={() => addBookDataToDatabase(ISBN , name , date , author , des , image)}>Add Book</button>
            </form>
        </div>
    )
}

export default AddBookForm;
