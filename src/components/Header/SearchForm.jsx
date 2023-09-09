import React from "react";
import {FaSearch} from "react-icons/fa";
import "./SearchForm.css";
const SearchForm = () => {
  return (
    <div className="search-form1">
      <div className="formContainer">
        <div className="search-form-content">
          <form className="search-form">
            <div className="search-form-element">
              <input type="text" className="form-control" placeholder="The Lost World..."/>
              <button type="submit" className="btnClass">
              <FaSearch className='text-purple' size = {32} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
