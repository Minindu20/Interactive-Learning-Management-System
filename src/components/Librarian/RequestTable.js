import React, { useEffect, useState } from "react";
import './RequestTable.css'; 
import axios from "axios";


function RequestTable() {
  const [userData3, setUserData] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:4000/getUserRequestBooks", {
         
        });

        setUserData(response.data.userData3);
      } catch (error) {
        console.error("Error Occurred:", error);
      }
    };

    fetchData();
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
                  <button>Accept</button>
                  <button>Reject</button>    
                </td>               
              </tr>
            ))}
          </tbody>
        </table>
      

   


      
    
    </div>




    
  );
}

export default RequestTable;


