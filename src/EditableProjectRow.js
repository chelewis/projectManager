import React from 'react'
import { Link } from 'react-router-dom';

function EditableProjectRow({item}, {index}) {
  return (
    <tr key={index}>
        <td><td><Link to={`/project_overview?project_id=${item.id}`}>{item.id}</Link></td></td>
        <td><input type="text" name="name"></input></td>
        <td><input type="text" name="description"></input></td>
        <td><input type="text" name="budget"></input></td>
    </tr>
  )
}

export default EditableProjectRow