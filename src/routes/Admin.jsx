import React from 'react';
import './Admin.css';
import Nav from '../components/Dashboard/Nav';
import Sidebar from '../components/Dashboard/Sidebar';
import Widget from '../components/Widget/Widget';

const Admin = () => {
  return (
    
    <div className="admin">
        <Sidebar/>
        <div className="homeContainer">
          <Nav/>
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

export default Admin;