import React from 'react';
import './LibrarianDetails.css'; 

class RequestTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        { id: 6, username: 'Saman', nic: '994567123v', contact:'0771234342' },
        { id: 5, username: 'Jagath', nic: '994567123v', contact:'0771234342' },
        {  id: 4, username: 'Chamara', nic: '994567123v', contact:'0771454342' },
        {  id: 3, username: 'Damith', nic: '994567123v', contact:'0774534342' },
        {  id: 2, username: 'Sawani', nic: '994567123v', contact:'0771267342' }
      ],
    };
  }

    handleButton1Click = (itemId) => {
      alert(`Remove Librarian: ${itemId}`);
    };
  
    

  renderTableHeader() {
    return (
      <tr>
        <th>User ID</th>
        <th>Username</th>
        <th>Nic</th>
        <th>Contact</th>
        <th>Action</th>
      </tr>
    );
  }

  renderTableData() {
    return this.state.data.map((item) => {
      const { id, username,nic,contact } = item;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{username}</td>
          <td>{nic}</td>
          <td>{contact}</td>
          <td>
            <button onClick={() => this.handleButton1Click(id)}>Remove Librarian</button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Librarian Details</h2>
        <div className='lib-details'><button>Add New Librarian</button></div>
        <table>
          <thead>{this.renderTableHeader()}</thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>
      </div>
    );
  }
}

export default RequestTable;

