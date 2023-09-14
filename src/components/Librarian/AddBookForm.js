import "./AddBookForm.css";
import React from "react";

function AddBookForm() {
    return(
        <div className="form-container">
           <h1>Add New Book</h1>
           <form className="form1">
               <input placeholder="Book ISBN Number"></input>
               <input placeholder="Book Name"></input>
               <input placeholder="Author"></input>
               <input placeholder="Number of Copies"></input>
               <textarea placeholder="Book Description" rows="4"></textarea>
               <label htmlFor="image">Add Cover Page:</label>
               <input 
                type="file"
                id="image"
                name="image"
                accept="image/*"></input>
               <button>Add Book</button>
           </form>

        </div>
    )
}
export default AddBookForm;