import React from 'react';
import './BookTable.css';

class BookTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        { id: 1, ISBN: '9780679722762', Name: 'Book 1', Author: 'Author 1', Copies: '5'},
        { id: 2, ISBN: '9780679722762', Name: 'Book 2', Author: 'Author 2', Copies: '4'},
        { id: 3, ISBN: '9780795226125', Name: 'Book 3', Author: 'Author 3', Copies: '5'},
        { id: 4, ISBN: '9780451169518', Name: 'Book 4', Author: 'Author 4', Copies: '6'},
        { id: 5, ISBN: '9795632146234', Name: 'Book 5', Author: 'Author 5', Copies: '5'},
        { id: 6, ISBN: '9780423452423', Name: 'Book 6', Author: 'Author 6', Copies: '8'},
        { id: 7, ISBN: '9780679722762', Name: 'Book 7', Author: 'Author 7', Copies: '6'},
        { id: 8, ISBN: '9780679722762', Name: 'Book 8', Author: 'Author 8', Copies: '5'},
        { id: 9, ISBN: '9780451169518', Name: 'Book 9', Author: 'Author 9', Copies: '5'},
        { id: 10, ISBN: '9795632146234', Name: 'Book 10', Author: 'Author 10', Copies: '3'},
        { id: 11, ISBN: '9780423452423', Name: 'Book 11', Author: 'Author 11', Copies: '5'},
        { id: 12, ISBN: '9780679722762', Name: 'Book 12', Author: 'Author 12', Copies: '4'},
        { id: 13, ISBN: '9780679722762', Name: 'Book 13', Author: 'Author 13', Copies: '5'},
        { id: 14, ISBN: '9780451169518', Name: 'Book 14', Author: 'Author 14', Copies: '5'},
        { id: 15, ISBN: '9795632146234', Name: 'Book 15', Author: 'Author 15', Copies: '5'},
      ],
    };
  }

  renderTableHeader() {
    return (
      <tr>
        <th>Book ID</th>
        <th>ISBN Number</th>
        <th>Name</th>
        <th>Author</th>
        <th>No. of Copies</th>
      </tr>
    );
  }

  renderTableData() {
    return this.state.data.map((rowData) => {
      const { id, ISBN, Name, Author, Copies } = rowData;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{ISBN}</td>
          <td>{Name}</td>
          <td>{Author}</td>
          <td>{Copies}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="table-container"> {/* Add a container */}
        <h2>Book Data</h2>
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

export default BookTable;