import React from 'react';
import './Css/Librarian.css';
import Nav from '../components/Dashboard/Nav';
import Sidebar from '../components/Dashboard/Sidebar';
import CreateReports from '../components/Librarian/CreateReports';


const RequestList = () => {
  return (
    
    <div className="librarian">
        <Sidebar
        role="librarian"/>
        <div className="homeContainer">
          <Nav
          role="librarian"/>
          <div>
            <CreateReports/>
        </div>          
        </div>
    </div>
  )
}

export default RequestList;