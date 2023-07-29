import React, {useState} from 'react';

function EmployeeTable({ employees, fetchData }) {

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [hasShowDeletePopUp, setHasShowDeletePopup] = useState(false);
  const [selectDeleteItem, setSelectDeleteItem] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState(null);

  const hanldeShowPopUp = (item) => {
    setHasShowDeletePopup(true);
    setSelectDeleteItem(item);
  }

  const handleEditButtonClick = (employee) => {
    setSelectedEmployee(employee);
    setEditedEmployee({ ...employee });
    setEditing(true);
  };

  const handleChange = (event) => {
    setEditedEmployee({
      ...editedEmployee,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('https://64c365c0eb7fd5d6ebd0d24d.mockapi.io/user/' + editedEmployee?.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedEmployee),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Sửa thành công rồi!!!!');
        fetchData();
        setEditedEmployee(null);
      })
      .catch((error) => {
        alert(`Lỗi rồi!!!!, lỗi là ${error?.message}`);
      });
    setEditing(false);
    setSelectedEmployee(null);
  };

  const handleDetelteItem = async () => {
    const response = await fetch(
        "https://64c365c0eb7fd5d6ebd0d24d.mockapi.io/user/" + selectDeleteItem?.id, {
          method: 'DELETE',
        }
      ).then((response) => response.json())
      .catch((eror) => alert('Lỗi xoá'));
      console.log('response', response);
      if(response) {
        setHasShowDeletePopup(false);
        setSelectDeleteItem(null);
        alert('Xoá thành công');
        fetchData();
      }
  }

  return (
    <div style={{maxWidth: '1000px',  margin: '0 auto',}}>
    {selectedEmployee && (
       <div style={modalStyle}>
      {
        editing ? (
          <form onSubmit={handleSubmit} style={modalContentStyle}>
             <div style={{flexDirection: 'column', display: 'flex', paddingTop: '10px'}}>
              <label>
                Tên Nhân viên:
              </label>
              <input name="name" value={editedEmployee.name} onChange={handleChange} />
              </div>
              <div style={{flexDirection: 'column', display: 'flex', paddingTop: '10px'}}>
              <label>
                Tuổi:
              </label>
              <input name="age" value={editedEmployee.age} onChange={handleChange} />
              </div>
              <div style={{flexDirection: 'column', display: 'flex', paddingTop: '10px'}}>
              <label>
                Địa chỉ:
              </label>
              <input name="address" value={editedEmployee.address} onChange={handleChange} />
              </div>
             <div style={{paddingTop:'10px', display: 'flex', justifyContent: 'space-between'}}>
                  <button type="submit">Lưu</button>
                  <button type="button" onClick={() => {setSelectedEmployee(null); setEditing(false);}}>Đóng</button>
             </div>
          </form>
        ): (
         
          <div style={modalContentStyle}>
            <h2>Thông tin chi tiết</h2>
            <p>Tên: {selectedEmployee.name}</p>
            <p>Tuổi: {selectedEmployee.age}</p>
            <p>Địa chỉ: {selectedEmployee.address}</p>
            <p>Giới tính: {selectedEmployee.sex}</p>
            <p>Ảnh <img style={{width: 80, height: 80}} src={selectedEmployee.avatar} alt={selectedEmployee.name}/></p>
            <button onClick={() => setSelectedEmployee(null)}>Đóng</button>
          </div>
       
        )
      } 
      </div>
        
      )}
      <table style={tableStyle}>
        <thead style={theadStyle}>
        <tr>
          <th style={cellStyle}>Mã</th>
          <th style={cellStyle}>Tên Nhân viên</th>
          <th style={cellStyle}>Tuổi</th>
          <th style={cellStyle}>Địa chỉ</th>
          <th style={cellStyle}>Ảnh</th>
          <th style={cellStyle}>Giới Tính</th>
          <th style={cellStyle}>Chức năng</th>
          <th style={cellStyle}>Xoá nhiều</th>
        </tr>
      </thead>
      <tbody style={tbodyStyle}>
        {employees.map((employee, index) => (
          <tr key={employee.id} style={tbodyRowStyle}>
            <td style={cellStyle}>{index+ 1}</td>
            <td style={cellStyle}>{employee.name}</td>
            <td style={cellStyle}>{employee.age}</td>
            <td style={cellStyle}>{employee.address}</td>
            <td style={cellStyle}><img style={{width: 80, height: 80}} src={employee.avatar} alt={employee.name}/></td>
            <td style={cellStyle}>{employee.sex}</td>
            <td style={cellStyle}>
              <button onClick={() => setSelectedEmployee(employee)}>👁️</button>
              <button onClick={() => hanldeShowPopUp(employee)}>❌</button>
              <button onClick={() => {
                setEditedEmployee(employee);
                setSelectedEmployee(employee);
                setEditing(true);
              }}>✏️</button>
            </td>
            <td style={cellStyle}><input type="checkbox" /></td>
          </tr>
        ))}
      </tbody>
    </table>
    <div style={deleteButtonContainerStyle}>
        <button onClick={() => console.log('Xoá nhiều')}>Xoá nhiều</button>
      </div>
      {hasShowDeletePopUp && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <p>Có chắc chắn xoá không?</p>
            <div style={{flexDirection: 'row', justifyContent: 'space-between', display: 'flex'}}>
                <button onClick={() => setHasShowDeletePopup(false)}>Không</button>
                <button onClick={() => handleDetelteItem()}>Có</button>
            </div>
           
          </div>
        </div>
      )}
    </div>
    
  );
}

const tableStyle = {
    maxWidth: '1000px',
    width: '100%',
    margin: '0 auto',
    textAlign: 'center',
  };

  const cellStyle = {
    padding: '10px',
  };

  const tbodyStyle = {
    height: '500px',
    overflow: 'auto',
    display: 'block',
  };

  const theadStyle = {
    display: 'table',
    width: '100%',
    tableLayout: 'fixed',
  };

  const tbodyRowStyle = {
    display: 'table',
    width: '100%',
    tableLayout: 'fixed',
  };

  const modalStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const modalContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '4px',
  };
  const deleteButtonContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
  };



export default EmployeeTable;
