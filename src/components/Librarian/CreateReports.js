import React from 'react';
import './CreateReports.css';
import { Link } from 'react-router-dom';

function CreateReports() {
  return (
    <>
    <h1><center>Select Report Type</center></h1>
    <div className="button-container">
      <Link to = "/librarian/reports/mostreadbooks">
        <button className="button">Most Read Books</button>
      </Link>
    </div>
    <div className="button-container">
      <Link to = "/librarian/reports/overduereturns">
        <button className="button">Return Overdue Books</button>
      </Link>
    </div>
    <div className="button-container">
      <Link to = "/librarian/reports/userfines">
        <button className="button">Calculate Fines</button>
      </Link>
    </div>
    </>
    );
}

export default CreateReports;

