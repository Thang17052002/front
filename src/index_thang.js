import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

function App() {
  const [user, setUser] = useState([]);
  const [formData, setFormData] = useState({ name: '', age: '', gender: 'Nam' });

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    if (value.trim().length === 0) {
      return;
    }
    const name = target.name;
    console.log('name: ', name, ' value: ', value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (formData.name && formData.age) {
      setUser([...user, { ...formData, id: user.length + 1 }]);
      setFormData({ name: '', age: '', gender: 'Nam' });
    }
  };

  const handleEdit = (id) => {
    // Implement edit logic here
  };

  const handleDelete = (id) => {
    // Implement delete logic here
  };

  return (
    <div>
      <form>
        <div>
          <p>tên</p>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <p>tuổi</p>
          <input
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <p>
            giới tính: &nbsp;
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </p>
        </div>
        <div>
          <button onClick={handleAdd}> thêm mới</button>
        </div>
      </form>

      <div>
        <table>
          <thead>
            <tr>
              <th>tên</th>
              <th>tuổi</th>
              <th>giới tính</th>
              <th>thao tác</th>
            </tr>
          </thead>
          <tbody>
            {user.map((userData) => (
              <tr key={userData.id}>
                <td>{userData.name}</td>
                <td>{userData.age}</td>
                <td>{userData.gender}</td>
                <td>
                  <button onClick={() => handleEdit(userData.id)}>sửa</button>
                  <button onClick={() => handleDelete(userData.id)}>xoá</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
