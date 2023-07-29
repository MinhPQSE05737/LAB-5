import React, {useState, useEffect} from 'react';
import EmployeeTable from './EmployeeTable';

const Home = () => {
    const [employees, setEmployees] = useState([]);

      useEffect(() => {
        fetchData();
      }, [])
    
      const fetchData = async () => {
        const response = await fetch(
          "https://64c365c0eb7fd5d6ebd0d24d.mockapi.io/user"
        ).then((response) => response.json())
        .catch((eror) => alert('Lỗi lấy dữ liệu'));
        setEmployees(response);
      };

  return (
    <div>
      <h2>Trang chủ</h2>
      <EmployeeTable employees={employees} fetchData={fetchData} />
    </div>
  );
};

export default Home;