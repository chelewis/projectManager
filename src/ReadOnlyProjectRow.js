import React from 'react'
import { Link } from 'react-router-dom';

function ReadOnlyProjectRow({item}, {index}) {
  return (
    <tr key={index}><td><Link to={`/project_overview?project_id=${item.id}`}>{item.id}</Link></td><td>{item.name}</td><td>{item.description}</td><td>{item.budget}</td>
    <td>
        <button type='button'>Edit</button>
    </td>
    </tr>
  )
}

export default ReadOnlyProjectRow