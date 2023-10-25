import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Sidebar from '../Dashboard/Sidebar';
import Nav from '../../components/Dashboard/Nav'
const BookReturns = () => {

    const [BookReturnData, setBookReturnData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:4000/getAllBorrowings");
            setBookReturnData(response.data.allBorrowings);
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error("Error Occurred:", error);
            setError("Error fetching data. Please try again.");
        }
    };

    const returnBook = async (id) => {
        try {
            await axios.post("http://localhost:4000/markBookAsReturned", { borrowing_Id: id });
            setError(null); // Clear any previous errors
            fetchData(); // Update the data after returning
        } catch (error) {
            console.error("Error Occurred:", error);
            setError("Error returning the book. Please try again.");
        }
    }


    return (
        <>
            <div className="librarian">
                <Sidebar
                    role="librarian" />
                <div className="homeContainer">
                    <Nav
                        role="librarian" />
                    <div>
                        <h1>Book Returns</h1>

                        <div>
                            {BookReturnData.length > 0 ? (
                                <table className="user-data-table" style={{ marginLeft: '0px' }}>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>ISBN</th>
                                            <th>UserID</th>
                                            <th>Due Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <br />
                                    <tbody>
                                        {BookReturnData.map((row) => (
                                            <tr key={row.id}>
                                                <td>{row.id}</td>
                                                <td>{row.isbn}</td>
                                                <td>{row.userid}</td>
                                                <td>{row.returndate}</td>
                                                <td><button className="custom-button-class" id={row.User_ID} onClick={() => {
                                                    returnBook(row.id
                                                    )
                                                }}>Return Book</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No user data.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>



        </>

    )
}

export default BookReturns