import React, { useState } from "react";
import ReactDOM from "react-dom";
import UserTable from "./user";
/*import "create-react-class";
import UserTable from "./user";

/* tạo mẫu form nhập dữ liệu  
lấy dữ liệu qua props
lưu trữ state và truyền cho Componet UserTable



*/
function MyForm(props) {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ username: '', birthdate: '', gender: 'Nam' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers([...users, [formData.username, formData.birthdate, formData.gender]]);
    setFormData({ username: '', birthdate: '', gender: 'Nam' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit} id="myForm">
        <div>
          <label htmlFor="username">Enter username</label>
          <input
            id="username"
            name="username"
            type="text"
            required
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="birthdate">Enter your age</label>
          <input
            id="birthdate"
            name="birthdate"
            type="number"
            required
            min="0"
            value={formData.birthdate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <p>
            giới tính: &nbsp;
            <select name="gender" value={formData.gender} onChange={handleInputChange}>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </p>
        </div>

        <button type="submit">Send data</button>
        <button type="reset">Reset</button>
      </form>
    );
  };

  return (
    <div>
      {renderForm()}
      <UserTable headers={props.headers} initialData={users} />
    </div>
  );
}

const headers = ["Tên", "Tuổi", "Giới tính", "thao tác"];
const data = [["thang", 23, "nam"], ["thang1", 23, "nam"], ["thang2", 23, "nam"]];

ReactDOM.render(
  <div>
    <MyForm data={data} headers={headers} />
  </div>,
  document.getElementById("root")
);

