// Call api

export const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/df');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

export const addStudent = async (newStudent) => {
  try {
    const response = await fetch('http://localhost:8000/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newStudent)
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error adding student:', error);
  }
};

export const deleteStudent = async (ma_sv) => {
  try {
    const response = await fetch('http://localhost:8000/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ma_sv })
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error deleting student:', error);
  }
};

export const updateStudent = async (updatedStudent) => {
  try {
    const response = await fetch('http://localhost:8000/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedStudent)
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error updating student:', error);
  }
};
