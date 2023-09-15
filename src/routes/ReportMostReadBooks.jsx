import React from 'react';
import './Css/Librarian.css';
import Nav from '../components/Dashboard/Nav';
import Sidebar from '../components/Dashboard/Sidebar';
import MostReadBooksTable from '../components/Librarian/Reports/MostReadBooks';

const ReportMostReadBooks = () => {
  return (
    
    <div className="librarian">
        <Sidebar
        role="librarian"/>
        <div className="homeContainer">
          <Nav
          role="librarian"/>
          <div>
            <MostReadBooksTable/>
        </div>          
        </div>
    </div>
  )
}

export default ReportMostReadBooks;