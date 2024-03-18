import React, { useState } from 'react';
import { deleteStudent } from './api';

const DeleteStudent = ({ fetchData }) => {
  const [deleteMaSV, setDeleteMaSV] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteInputChange = event => {
    setDeleteMaSV(event.target.value);
  };

  const handleDeleteStudent = async () => {
    if (deleteMaSV) {
      await deleteStudent(deleteMaSV);
      await fetchData();
      setDeleteMaSV('');
      setShowDeleteModal(false);
    }
  };

  return (
    <div>
      <button onClick={() => setShowDeleteModal(true)}>Delete Student</button>
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowDeleteModal(false)}>
              ×
            </span>
            <h2>Delete Student</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <label>
                Student ID to delete:
                <input
                  type="text"
                  value={deleteMaSV}
                  onChange={handleDeleteInputChange}
                />
              </label>
              <br />
              <button type="button" onClick={handleDeleteStudent}>Delete Student</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteStudent;
