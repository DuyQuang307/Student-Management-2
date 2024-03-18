import React from 'react';

export const ShowStudent = ({ students }) => {
  return (
    <table>
      {/* Table header */}
      <thead>
        <tr>
          <th>Student ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Date of Birth</th>
          <th>Address</th>
          <th>Total Score</th>
        </tr>
      </thead>
      {/* Table body */}
      <tbody>
        {students.map(student => (
          <tr key={student.ma_sv}>
            <td>{student.ma_sv}</td>
            <td>{student.ho_ten}</td>
            <td>{student.email}</td>
            <td>{student.ngay_sinh}</td>
            <td>{student.que}</td>
            <td>{student.diem_tong_ket}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ShowStudent;
