import React, { useEffect, useState } from "react";
import './RequestTable.css'; 
import axios from "axios";


function RequestTable() {
  const [userData3, setUserData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:4000/getUserRequestBooks", {});
      setUserData(response.data.userData3);
    } catch (error) {
      console.error("Error Occurred:", error);
    }
  };

  const acceptRequest = async (res_id) => {
    try {
      await axios.post("http://localhost:4000/acceptReservation", { res_Id: res_id });
      fetchData(); // Update the table after accepting
    } catch (error) {
      console.error("Error Occurred:", error);
    }
  };

  const rejectRequest = async (res_id) => {
    try {
      await axios.post("http://localhost:4000/removeReservation", { res_Id: res_id });
      fetchData(); // Update the table after rejecting
    } catch (error) {
      console.error("Error Occurred:", error);
    }
  }

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  return (
    <div>
      
        <table className="user-data-table" style={{ marginLeft: '0px' }}>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>User ID</th>
              <th>Book ID</th>
              <th>Book</th>
              <th>Reservation Time</th>
              <th>Action</th>
             
            </tr>
          </thead>
          <br />
          <tbody>
            {userData3.map((row) => (
              <tr key={row.id}>
                <td>{row.res_Id}</td>
                <td>{row.userId}</td>
                <td>{row.bookId}</td>
                <td>{row.title}</td>
                <td>{row.res_time}</td>

                <td>
                  <button onClick={() => acceptRequest(row.res_Id)}>Accept</button>
                  <button onClick={() => rejectRequest(row.res_Id)}>Reject</button>    
                </td>               
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
}

export default RequestTable;


