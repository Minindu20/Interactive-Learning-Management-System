import React from "react";
import Navbar from "../components/Home/Navbar";
import "./Css/BookHistory.css";
import Footer from "../components/Home/Footer";
import Sidebar from "../components/Dashboard/Sidebar";
const BookHistory = () => {
  return (
    <>
    <div className="history-main">
    
      <Sidebar role="user" />
      <div className="nav-wrap">
      <Navbar />
      </div>
     
      <div className="borrowingContainer">
      <div className="Reserve">
          <h1 className="borrowing-title">Reservings</h1>
          <table className="borrowing-table">
            <thead>
              <tr>
                <th>Book Name</th>
                <th>ID</th>
                <th>Reserve Date</th>
                <th>Days Remaining</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Harry potter and the Half Blood Prince</td>
                <td>12345</td>
                <td>2023-09-13</td>
                <td>2</td>
                <td>
                  <button class="reservation-button">Remove Reservation</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="current">
          <h1 className="borrowing-title">Current Borrowings</h1>
          <table className="borrowing-table">
            <thead>
              <tr>
                <th>Book Name</th>
                <th>ID</th>
                <th>Borrow Date</th>
                <th>Return Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Harry potter and Deathly Hallows</td>
                <td>12345</td>
                <td>2023-09-13</td>
                <td>2023-09-20</td>
                <td>
                  <button class="extension-button">Add Extension</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="fast">
          <h1 className="borrowing-title">Fast Borrowings</h1>
          <table className="borrowing-table">
            <thead>
              <tr>
                <th>Book Name</th>
                <th>ID</th>
                <th>Borrow Date</th>
                <th>Return Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Harry Potter And the Order Of Phoneix</td>
                <td>67890</td>
                <td>2023-09-15</td>
                <td>2023-09-22</td>
              </tr>
              <tr>
                <td>The Great Gatsby</td>
                <td>54321</td>
                <td>2023-09-18</td>
                <td>2023-09-25</td>
              </tr>

              <tr>
                <td>To Kill a Mockingbird</td>
                <td>98765</td>
                <td>2023-09-20</td>
                <td>2023-09-27</td>
              </tr>
              <tr>
                <td>1984</td>
                <td>24680</td>
                <td>2023-09-12</td>
                <td>2023-09-19</td>
              </tr>

              <tr>
                <td>The Catcher in the Rye</td>
                <td>13579</td>
                <td>2023-09-14</td>
                <td>2023-09-21</td>
              </tr>

              <tr>
                <td>Pride and Prejudice</td>
                <td>11223</td>
                <td>2023-09-16</td>
                <td>2023-09-23</td>
              </tr>

              <tr>
                <td>The Hobbit</td>
                <td>97531</td>
                <td>2023-09-18</td>
                <td>2023-09-25</td>
              </tr>

              <tr>
                <td>Lord of the Rings</td>
                <td>86420</td>
                <td>2023-09-19</td>
                <td>2023-09-26</td>
              </tr>

              <tr>
                <td>The Da Vinci Code</td>
                <td>75309</td>
                <td>2023-09-21</td>
                <td>2023-09-28</td>
              </tr>

              <tr>
                <td>Brave New World</td>
                <td>36912</td>
                <td>2023-09-22</td>
                <td>2023-09-29</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="nav-wrap">
      <Footer />
      </div>
      {/* <Footer/> */}
    </div>
    
    </>
  );
};

export default BookHistory;
