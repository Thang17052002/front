import React, { useState, useEffect } from "react";
import "./table.css";
import PropTypes from "prop-types";

export function UserTable(props) {
  const [data, setData] = useState(props.initialData);
  const [edit, setEdit] = useState(props.edit);

  useEffect(() => {
    if (props.initialData !== data) {
      setData(props.initialData);
    }
  }, [props.initialData]);

  const showEditor = (e) => {
    setEdit({
      row: parseInt(e.target.dataset.row, 10),
      cell: e.target.cellIndex
    });
  };

  const save = (e) => {
    e.preventDefault();
    var input = e.target.firstChild;
    console.log(input);
    var newData = [...data];
    newData[edit.row][edit.cell] = input.value;
    setEdit(null);
    setData(newData);
  };

  const deleteRow = (e) => {
    e.preventDefault();
    let id = e.target.dataset.row;
    var newData = [...data];
    newData.splice(id, 1);
    setEdit(null);
    setData(newData);
  };

  const renderTable = () => {
    return (
      <table>
        <thead>
          <tr>
            {props.headers.map(function (title, idx) {
              return <th key={idx}>{title}</th>;
            })}
          </tr>
        </thead>
        <tbody onDoubleClick={showEditor}>
          {data.map((row, rowidx) => {
            return (
              <tr key={rowidx}>
                {row.map((cell, idx) => {
                  var content = cell;
                  if (edit && edit.row === rowidx && edit.cell === idx) {
                    if (edit.cell === 1) {
                      content = (
                        <form onSubmit={save}>
                          <input
                            type="number"
                            required
                            min="0"
                            max="100"
                            defaultValue={cell}
                          />
                        </form>
                      );
                    } else if (edit.cell === 2) {
                      content = (
                        <form onSubmit={save}>
                          <select defaultValue={cell}>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                          </select>
                          <button type="submit">save</button>
                        </form>
                      );
                    } else {
                      content = (
                        <form onSubmit={save}>
                          <input type="text" defaultValue={cell} required />
                        </form>
                      );
                    }
                  }
                  return (
                    <td key={idx} data-row={rowidx}>
                      {content}
                    </td>
                  );
                })}

                <td>
                  <button onClick={deleteRow} data-row={rowidx}>
                    xoá
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return <div>{renderTable()}</div>;
}

UserTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string),
  initialData: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ).isRequired
  ).isRequired
};
