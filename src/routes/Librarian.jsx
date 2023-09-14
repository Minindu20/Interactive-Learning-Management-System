import React from 'react';
import './Css/Librarian.css';
import Nav from '../components/Dashboard/Nav';
import Sidebar from '../components/Dashboard/Sidebar';
import Widget from '../components/Widget/Widget';

const Librarian = () => {
  return (
    
    <div className="librarian">
        <Sidebar
        role="librarian"/>
        <div className="homeContainer">
          <Nav
          role="librarian"/>
          <div className="widgets">
              <Widget
                type="user"/>
              <Widget
               type="books"/>
              <Widget
               type="requests"/>
              <Widget 
                type="recent"/>
          </div>
          
        </div>
    </div>
  )
}

export default Librarian;