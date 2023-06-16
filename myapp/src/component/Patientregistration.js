import React, { useState } from 'react';
import './patientregistration.css';
import Header from './Header';

const Patientregistration = () => {
  const [expandedRows, setExpandedRows] = useState([]);

  const data = [
    { no: 1, gussuhno: 'John Doe', age: 25, email: 'john.doe@example.com' },
    { no: 2, name: 'Jane Smith', age: 30, email: 'jane.smith@example.com' },
    { no: 3, name: 'Mike Johnson', age: 35, email: 'mike.johnson@example.com' }
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
        <th>no</th>
          <th>gssuhid</th>
          <th>uhid</th>
          <th>regdatetime</th>
          <th>initialid</th>
          <th>firstname</th>
          <th>midname</th>
          <th>lastname</th>
          <th>dob</th>
          <th>genderid</th>
          <th>maritalstatusid</th>
          <th>bloodgroupid</th>
          <th>mobileno</th>
          <th>alternatecontactno</th>
          <th>emailid</th>
          <th>isstrff</th>
          <th>staffempid</th>
          <th>staffrelationid</th>
          <th>isforeign</th>
          <th>isvip</th>
          
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <React.Fragment key={row.id}>
            <tr onClick={() => handleRowClick(row.id)}>
            <td>{row.no}</td>
              <td>{row.gussuhid}</td>
              <td>{row.uhid}</td>
              <td>{row.regdatetime}</td>
              <td>{row.initialid}</td>
              <td>{row.firstname}</td>
              <td>{row.midname}</td>
              <td>{row.lastname}</td>
              <td>{row.dob}</td>
              <td>{row.genderid}</td>
              <td>{row.maritalstatusid}</td>
              <td>{row.bloodgroupid}</td>
              <td>{row.mobileno}</td>
              <td>{row.alternatecontactno}</td>
              <td>{row.emailid}</td>
              <td>{row.isstrff}</td>
              <td>{row.staffempid}</td>
              <td>{row.staffrelationid}</td>
              <td>{row.isforeign}</td>
              <td>{row.isvip}</td>
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
export default Patientregistration;
