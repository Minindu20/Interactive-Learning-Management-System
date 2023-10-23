import React, { useEffect, useState } from "react";
import axios from "axios";

function UserTable() {
  const [userData, setUserData] = useState([]);
  const [status,changeStatus] = useState('Active')
  const[UsernameT , setUsernameT] = useState('');
  const[NicT , setNicT] = useState('');
  const[contactT , setContactNicT] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:4000/UserData", {
          email: ""
        });

        setUserData(response.data.userData);
      } catch (error) {
        console.error("Error Occurred:", error);
      }
    };

    fetchData();
  }, []);

 
  


  const changeUserStatus = (index)=>
  {
    
    if(status === 'Active')
    {
      changeStatus('Banned')
    }
    else{

      changeStatus('Active')
    }

    const data = {
      Status : status,
      UsernameT : index
    }

    

    axios
    .post("http://localhost:4000/changeUserStatus", data)
    .then((response) => {
      
      setUserData(response.data.userData);
      
      
    })
    .catch((error) => {
      console.error("Error Occured:", error);
    });

    

  }


  return (
    <div>
      {userData.length > 0 ? (
        <table className="user-data-table" style={{ marginLeft: '0px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <br />
          <tbody>
            {userData.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.username}</td>
                <td>{row.contact}</td>
                <td>{row.status}</td>
                <td><button className="custom-button-class" id={row.User_ID} onClick={()=> changeUserStatus(row.username)}>change status</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No user data.</p>
      )}

   


      
    
    </div>




    
  );
}

export default UserTable;
