import React from 'react';
import './ReportTableStyles.css';

class MostReadBooksTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        { id: 1, ISBN: '9780423452423', Name: 'Book 6', Author: 'Author 6', TotalBorrows: '192', Copies: '8'},
        { id: 2, ISBN: '9780679722762', Name: 'Book 2', Author: 'Author 2', TotalBorrows: '180', Copies: '4'},
        { id: 3, ISBN: '9780795226125', Name: 'Book 3', Author: 'Author 3', TotalBorrows: '173', Copies: '5'},
        { id: 4, ISBN: '9780451169518', Name: 'Book 4', Author: 'Author 4', TotalBorrows: '166', Copies: '6'},
        { id: 5, ISBN: '9780679722762', Name: 'Book 12', Author: 'Author 12', TotalBorrows: '160', Copies: '4'},
        { id: 6, ISBN: '9795632146234', Name: 'Book 5', Author: 'Author 5', TotalBorrows: '148', Copies: '5'},
        { id: 7, ISBN: '9795632146234', Name: 'Book 15', Author: 'Author 15', TotalBorrows: '140', Copies: '5'},
        { id: 8, ISBN: '9780679722762', Name: 'Book 7', Author: 'Author 7', TotalBorrows: '132', Copies: '6'},
        { id: 9, ISBN: '9780451169518', Name: 'Book 14', Author: 'Author 14', TotalBorrows: '125', Copies: '5'},
        { id: 10, ISBN: '9795632146234', Name: 'Book 10', Author: 'Author 10', TotalBorrows: '110', Copies: '3'},   
      ],
    };
  }

  renderTableHeader() {
    return (
      <tr>
        <th></th>
        <th>ISBN Number</th>
        <th>Book Title</th>
        <th>Author</th>
        <th>Total Borrows per Year</th>
        <th>No. of Copies</th>
      </tr>
    );
  }

  renderTableData() {
    return this.state.data.map((rowData) => {
      const { id, ISBN, Name, Author, TotalBorrows, Copies } = rowData;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{ISBN}</td>
          <td>{Name}</td>
          <td>{Author}</td>
          <td>{TotalBorrows}</td>
          <td>{Copies}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="table-container"> {/* Add a container */}
        <h2>Most Read Book Data</h2>
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

export default MostReadBooksTable;