import "./AddBookForm.css";
import React, { useState } from "react";
import axios from "axios";

function AddBookForm() {
    const [formData, setFormData] = useState({
        isbn:"",
        name:"",
        author:"",
        //genre:"",
        des:"",
        image:""
    });

    const updateFormData = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }; 

    const addBookDataToDatabase = (event) => {
        event.preventDefault();
        axios.post("http://localhost:4000/addBookToDatabase", formData)
            .catch((error) => {
                console.error("Error Occurred:", error);
            }
        );
    };

    return (
        <div className="form-container">
            <h1>Add New Book</h1>
            <form className="form1" onSubmit={(e) => addBookDataToDatabase(e)}>
                <input name="isbn" placeholder="Book ISBN Number" onChange={(event) => updateFormData(event)}/>
                <input name="name" placeholder="Book Name" onChange={(event) => updateFormData(event)}/>
                <input name="author" placeholder="Author" onChange={(event) => updateFormData(event)}/> 
                {/* <input name="genre" placeholder="Genre" onChange={(event) => updateFormData(event)}/>  */}
                <textarea name="des" placeholder="Book Description" rows="4" onChange={(event) => updateFormData(event)}></textarea>
                <input
                    type="text"
                    id="image"
                    name="image"
                    placeholder="Cover page image URL"
                    onChange={(event) => updateFormData(event)}
                />
                <button type="submit" >Add Book</button>
            </form>
        </div>
    )
}

export default AddBookForm;
