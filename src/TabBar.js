import { Link } from 'react-router-dom';

function TabBar() {
  const linkStyle = {
    marginRight: '20px',
    color: 'white',
    textDecoration: 'none'
  };

  const barStyle = {
    backgroundColor: 'black',
    padding: '10px'
  };

  return (
    <div style={barStyle}>
      <Link to="/" style={linkStyle}>Trang chủ</Link>
      <Link to="/them-moi" style={linkStyle}>Thêm mới</Link>
    </div>
  );
}

export default TabBar;
