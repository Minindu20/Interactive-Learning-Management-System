import React from 'react';
import './UserTable.css';

class UserTable extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: [
        { id: 1, Name: 'Pamudu Silva', NIC: '200013458734', Contact: '0777456123', Status: 'Active'},
        { id: 2, Name: 'Lakshitha Arachchi', NIC: '992340984V', Contact: '071963158', Status: 'Banned'},
        { id: 3, Name: 'Amaya Sampath', NIC: '200087602846', Contact: '0773456789', Status: 'Active'},
        { id: 4, Name: 'Lasindu Withanage', NIC: '96530984V', Contact: '0713423158', Status: 'Banned'},
        { id: 5, Name: 'Nuwan Gamage', NIC: '200110328724', Contact: '0718932151', Status: 'Active'},
        { id: 6, Name: 'Pamudu Silva', NIC: '200013458734', Contact: '0777456123', Status: 'Active'},
        { id: 7, Name: 'Lakshitha Arachchi', NIC: '992340984V', Contact: '071963158', Status: 'Banned'},
        { id: 8, Name: 'Amaya Sampath', NIC: '200087602846', Contact: '0773456789', Status: 'Active'},
        { id: 9, Name: 'Lasindu Withanage', NIC: '96530984V', Contact: '0713423158', Status: 'Banned'},
        { id: 10, Name: 'Nuwan Gamage', NIC: '200110328724', Contact: '0718932151', Status: 'Active'},
        { id: 11, Name: 'Pamudu Silva', NIC: '200013458734', Contact: '0777456123', Status: 'Active'},
        { id: 12, Name: 'Lakshitha Arachchi', NIC: '992340984V', Contact: '071963158', Status: 'Banned'},
        { id: 13, Name: 'Amaya Sampath', NIC: '200087602846', Contact: '0773456789', Status: 'Active'},
        { id: 14, Name: 'Lasindu Withanage', NIC: '96530984V', Contact: '0713423158', Status: 'Banned'},
        { id: 15, Name: 'Nuwan Gamage', NIC: '200110328724', Contact: '0718932151', Status: 'Active'},
      ],
    };
  }
  handleButton1Click = (itemId) => {
    // Handle button 1 click here
    alert(`Status change for: ${itemId}`);
  };

  handleButton2Click = (itemId) => {
    // Handle button 2 click here
    alert(`Remove User: ${itemId}`);
  };

  renderTableHeader() {
    return (
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>NIC</th>
        <th>Contact</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    );
  }

  renderTableData() {
    return this.state.data.map((rowData) => {
      const { id, Name, NIC, Contact, Status } = rowData;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{Name}</td>
          <td>{NIC}</td>
          <td>{Contact}</td>
          <td>{Status}</td>
         
          <td>
            <button onClick={() => this.handleButton1Click(id)}>Change Status</button>
            <button onClick={() => this.handleButton2Click(id)}>Remove User</button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="table-container"> {/* Add a container */}
        <h2>User Data</h2>
        <div className="table-scroll"> {/* Add a scrollable container */}
          <table className="data-table">
            <thead>{this.renderTableHeader()}</thead>
            <tbody>{this.renderTableData()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default UserTable;