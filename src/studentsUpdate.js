import React, { useState } from 'react';
import { updateStudent } from './api';
import './App.css'
import useEmailValidation from './useEmailValidation';


const UpdateStudent = ({ fetchData }) => {
  const [studentInfo, setStudentInfo] = useState({
    ma_sv: '',
    ho_ten: '',
    email: '',
    ngay_sinh: '',
    que: '',
    diem_tong_ket: ''
  });

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { email, handleEmailChange, emailError } = useEmailValidation();

  const handleChange = event => {
    setStudentInfo({
      ...studentInfo,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Kiểm tra xem tất cả các trường đã được điền chưa
    const isFormValid = Object.values(studentInfo).every(value => value.trim() !== '');
  
    if (!isFormValid) {
      // Hiển thị thông báo lỗi hoặc xử lý lỗi ở đây
      alert('Vui lòng điền tất cả các trường.');
      return; // Ngăn chặn việc gửi form nếu có trường bỏ trống
    }
  
    const updatedStudentInfo = { ...studentInfo, email: email };
    await updateStudent(updatedStudentInfo);
    fetchData();
    setStudentInfo({
      ma_sv: '',
      ho_ten: '',
      ngay_sinh: '',
      que: '',
      diem_tong_ket: ''
    });
    handleEmailChange({ target: { value: '' } }); // Reset email
    setShowUpdateModal(false);
  };
  return (
    <div>
      <button onClick={() => setShowUpdateModal(true)}>Update Student</button>

      {showUpdateModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowUpdateModal(false)}>×</span>
            <h2>Update Student</h2>
            <form onSubmit={handleSubmit}> {/* Submit on form */}
              <div className="form-group">
                <label htmlFor="ma_sv">Student ID:</label>
                <input type="number" id="ma_sv" name="ma_sv" min="0" value={studentInfo.ma_sv} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="ho_ten">Name:</label>
                <input type="text" id="ho_ten" name="ho_ten" value={studentInfo.ho_ten} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={studentInfo.email} onChange={handleEmailChange} onBlur={handleEmailChange} />
                {emailError && <div className="error-message">{emailError}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="ngay_sinh">Date of Birth:</label>
                <input type="date" id="ngay_sinh" name="ngay_sinh" value={studentInfo.ngay_sinh} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="que">Address:</label>
                <input type="text" id="que" name="que" value={studentInfo.que} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="diem_tong_ket">Total Score:</label>
                <input type="number" id="diem_tong_ket" name="diem_tong_ket" min="0" max="10" value={studentInfo.diem_tong_ket} onChange={handleChange} />
              </div>
              <button type="submit">Update Student</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateStudent;
