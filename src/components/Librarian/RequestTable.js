import React from 'react';
import './RequestTable.css'; 

class RequestTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        { id: 6, userID: '1', bookID: '1', period:'2023-09-16 to 2023-09-30' },
        { id: 5, userID: '2', bookID: '4', period:'2023-09-15 to 2023-09-29' },
        { id: 4, userID: '5', bookID: '5', period:'2023-09-14 to 2023-09-28' },
        { id: 3, userID: '4', bookID: '3', period:'2023-09-14 to 2023-09-28' },
        { id: 2, userID: '8', bookID: '6', period:'2023-09-14 to 2023-09-28' },
        { id: 1, userID: '10', bookID: '7', period:'2023-09-14 to 2023-09-28' },
      ],
    };
  }

    handleButton1Click = (itemId) => {
      // Handle button 1 click here
      alert(`Request Accepted for Request ID: ${itemId}`);
    };
  
    handleButton2Click = (itemId) => {
      // Handle button 2 click here
      alert(`Request Rejected for Request ID: ${itemId}`);
    };

  renderTableHeader() {
    return (
      <tr>
        <th>Request ID</th>
        <th>User ID</th>
        <th>Book ID</th>
        <th>Period</th>
        <th>Action</th>
      </tr>
    );
  }

  renderTableData() {
    return this.state.data.map((item) => {
      const { id, userID, bookID, period } = item;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{userID}</td>
          <td>{bookID}</td>
          <td>{period}</td>
          <td>
            <button onClick={() => this.handleButton1Click(id)}>Accept</button>
            <button onClick={() => this.handleButton2Click(id)}>Reject</button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Book Reserve Requests</h2>
        <table>
          <thead>{this.renderTableHeader()}</thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>
      </div>
    );
  }
}

export default RequestTable;

