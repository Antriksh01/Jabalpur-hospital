import React, { useState } from 'react';
import './patientregistration.css';
import Header from './Header';

const Patientopd = () => {
  const [expandedRows, setExpandedRows] = useState([]);

  const data = [
    { no: 1, gussuhno: 'John Doe', age: 25, email: 'john.doe@example.com' },
    // { no: 2, name: 'Jane Smith', age: 30, email: 'jane.smith@example.com' },
    // { no: 3, name: 'Mike Johnson', age: 35, email: 'mike.johnson@example.com' }
    // Add more data rows here
  ];

  const handleRowClick = (rowId) => {
    const isRowExpanded = expandedRows.includes(rowId);
    if (isRowExpanded) {
      setExpandedRows(expandedRows.filter((id) => id !== rowId));
    } else {
      setExpandedRows([...expandedRows, rowId]);
    }
  };

  return (
    <div>
      <Header/>
    <table>
      <thead>
        <tr>
        <th>patopdvisitid</th>
          <th>uhid</th>
          <th>gssuhid</th>
          <th>visitid</th>
          <th>recieptdatetime</th>
          <th>ischambercase</th>
          <th>patientstatus</th>
          <th>toenno</th>
          <th>ischeckin</th>
          <th>checkindatetime</th>
          <th>ischeckout</th>
          <th>checkoutdatetime</th>
          <th>isonhold</th>
          <th>onholddatetime</th>
          <th>recalldatetime</th>
          <th>consultantid</th>
         
          
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <React.Fragment key={row.id}>
            <tr onClick={() => handleRowClick(row.id)}>
            <td>{row.no}</td>
              <td>{row.Patientopd}</td>
              <td>{row.uhid}</td>
              <td>{row.gssuhid}</td>
              <td>{row.viditid}</td>
              <td>{row.recieptdatetime}</td>
              <td>{row.ischambercase}</td>
              <td>{row.patientstatus}</td>
              <td>{row.tokenno}</td>
              <td>{row.ischeckout}</td>
              <td>{row.checkoutdatetime}</td>
              <td>{row.isonhold}</td>
              <td>{row.onholddatetime}</td>
              <td>{row.recalldatetime}</td>
              <td>{row.consultantid}</td>
             
            </tr>
            {expandedRows.includes(row.id) && (
              <tr>
                <td colSpan="3">
                  {/* Expanded row content goes here */}
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
    </div>
  );
}
export default Patientopd;
