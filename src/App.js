import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchData } from './api';
import AddStudent from './studentsAdd';
import DeleteStudent from './studentsDelete';
import UpdateStudent from './studentsUpdate';
import ShowStudent from './studentsShowTable';
import DownloadButton from './studentsCSV';

const App = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchData().then(data => setStudents(data));
  }, []);

  const handleFetchData = () => {
    fetchData().then(data => setStudents(data));
  };

  return (
    <div >
      <h1>Student Information</h1>
      <ShowStudent students={students} />
      <div >
        <AddStudent fetchData={handleFetchData} />
        <DeleteStudent fetchData={handleFetchData} />
        <UpdateStudent fetchData={handleFetchData} /> 
        <DownloadButton />
      </div>
    </div>
  );
};

export default App;
