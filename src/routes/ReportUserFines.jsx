import React from 'react';
import './Css/Librarian.css';
import Nav from '../components/Dashboard/Nav';
import Sidebar from '../components/Dashboard/Sidebar';
import UserFines from '../components/Librarian/Reports/UserFines';

const ReportUserFines = () => {
  return (
    
    <div className="librarian">
        <Sidebar
        role="librarian"/>
        <div className="homeContainer">
          <Nav
          role="librarian"/>
          <div>
            <UserFines/>
        </div>          
        </div>
    </div>
  )
}

export default ReportUserFines;