import React, { useState } from 'react';
import '../css/AddNew.css'; 

function AddNew() {
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    age: '',
    address: '',
    image: null,
    sex: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "image") {
      setNewEmployee({
        ...newEmployee,
        [name]: event.target.files[0],
      });
    } else {
      setNewEmployee({
        ...newEmployee,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('https://64c365c0eb7fd5d6ebd0d24d.mockapi.io/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEmployee),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Tạo thành công rồi!!!!');
        setNewEmployee({
          name: '',
          age: '',
          address: '',
          image: null,
          sex: '',
        });
      })
      .catch((error) => {
        alert(`Lỗi rồi!!!!, lỗi là ${error?.message}`);
      });
    
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label className="form-item">
        Tên Nhân viên:
        <input type="text" name="name" value={newEmployee.name} onChange={handleChange} />
      </label>

      <label className="form-item">
        Tuổi:
        <input type="number" min={'0'}name="age" value={newEmployee.age} onChange={handleChange} />
      </label>

      <label className="form-item">
        Địa chỉ:
        <input type="text" name="address" value={newEmployee.address} onChange={handleChange} />
      </label>

      <label className="form-item">
        Ảnh:
        <input type="file" name="image" onChange={handleChange} />
      </label>

      <label className="form-item">
        Giới Tính:
        <select name="sex" value={newEmployee.gender} onChange={handleChange}>
          <option value="">Chọn giới tính</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>
      </label>

      <button type="submit" className="submit-btn">Thêm mới</button>
    </form>
  );
}

export default AddNew;
