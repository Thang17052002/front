import React, { useState } from 'react';
import './table.css';

function Excel({ headers, initialData }) {
  const [data, setData] = useState(initialData);
  const [sortby, setSortBy] = useState(null);
  const [descending, setDescending] = useState(false);
  const [edit, setEdit] = useState(null);
  const [search, setSearch] = useState(false);

  const handleSort = (e) => {
    const column = e.target.cellIndex;
    const newData = [...data];
    const isDescending = sortby === column && !descending;
    newData.sort((a, b) => {
      return isDescending
        ? a[column] < b[column]
          ? 1
          : -1
        : a[column] > b[column]
        ? 1
        : -1;
    });
    setData(newData);
    setSortBy(column);
    setDescending(isDescending);
  };

  const handleShowEditor = (e) => {
    setEdit({
      row: parseInt(e.target.dataset.row, 10),
      cell: e.target.cellIndex,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const input = e.target.firstChild;
    const newData = [...data];
    newData[edit.row][edit.cell] = input.value;
    setEdit(null);
    setData(newData);
  };

  const toggleSearch = () => {
    if (search) {
      setData(preSearchData);
      setSearch(false);
      setPreSearchData(null);
    } else {
      setPreSearchData(data);
      setSearch(true);
    }
  };

  const handleSearch = (e) => {
    const needle = e.target.value.toLowerCase();
    if (!needle) {
      setData(preSearchData);
      return;
    }
    const idx = e.target.dataset.idx;
    const searchData = preSearchData.filter((row) => {
      return row[idx].toString().toLowerCase().indexOf(needle) > -1;
    });
    setData(searchData);
  };

  const handleDownload = (format, ev) => {
    let contents =
      format === 'json'
        ? JSON.stringify(data)
        : data.reduce((result, row) => {
            return (
              result +
              row.reduce((rowResult, cell, idx) => {
                return (
                  rowResult +
                  '"' +
                  cell.replace(/"/g, '""') +
                  '"' +
                  (idx < row.length - 1 ? ',' : '')
                );
              }, '') +
              '\n'
            );
          }, '');

    const URL = window.URL || window.webkitURL;
    const blob = new Blob([contents], { type: 'text/' + format });
    ev.target.href = URL.createObjectURL(blob);
    ev.target.download = 'data.' + format;
  };

  const renderSearch = () => {
    if (!search) {
      return null;
    }
    return (
      <tr onChange={handleSearch}>
        {headers.map((_ignore, idx) => (
          <td key={idx}>
            <input type="text" data-idx={idx} />
          </td>
        ))}
      </tr>
    );
  };

  const renderTable = () => {
    return (
      <table>
        <thead onClick={handleSort}>
          <tr>
            {headers.map((title, idx) => {
              if (sortby === idx) {
                title += descending ? ' \u2191' : ' \u2193';
              }
              return <th key={idx}>{title}</th>;
            })}
          </tr>
        </thead>
        <tbody onDoubleClick={handleShowEditor}>
          {renderSearch()}
          {data.map((row, rowidx) => (
            <tr key={rowidx}>
              {row.map((cell, idx) => {
                let content = cell;
                if (edit && edit.row === rowidx && edit.cell === idx) {
                  content = (
                    <form onSubmit={handleSave}>
                      <input type="text" defaultValue={cell} />
                    </form>
                  );
                }
                return (
                  <td key={idx} data-row={rowidx}>
                    {content}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <div className="toolbar">
        <button onClick={toggleSearch}>Search</button>
        <a onClick={(ev) => handleDownload('json', ev)} href="data.json">
          Export JSON
        </a>
        <a onClick={(ev) => handleDownload('csv', ev)} href="data.csv">
          Export CSV
        </a>
      </div>
      {renderTable()}
    </div>
  );
}

export default Excel;
