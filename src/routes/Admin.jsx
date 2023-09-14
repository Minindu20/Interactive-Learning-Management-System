import React from 'react';
import './Css/Admin.css';
import Nav from '../components/Dashboard/Nav';
import Sidebar from '../components/Dashboard/Sidebar';
import Widget from '../components/Widget/Widget';
import GetUserPieChart from '../components/Librarian/GetUserPieChart';
import GetBookPieChart from '../components/Librarian/GetBookPieChart';
const Admin = () => {
  return (
    
    <div className="admin">
        <Sidebar
        role="admin"/>
        <div className="homeContainer">
          <Nav
          role="admin"/>
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
          <div className='card-block'>
            <div className="card">
              <h1>USER STATS</h1>
              <GetUserPieChart/>
              </div>
            <div className="card">
              <h1>BOOK STATS</h1>
              <GetBookPieChart/>
              </div>
              </div>
        </div>
    </div>
  )
}

export default Admin;