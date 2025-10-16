import React, { useEffect, useState } from 'react'
import { Users } from '../api'

export default function UsersPage(){
  const [users, setUsers] = useState([])
  useEffect(()=>{ Users.list().then(r => setUsers(r.data)).catch(()=>{}) }, [])
  return (
    <div>
      <h4>Users</h4>
      <ul className="list-group">
        {users.map(u => (
          <li key={u.id} className="list-group-item">
            <strong>{u.name}</strong> <div className="small text-muted">{u.email}</div>
            <div className="mt-2">Tasks: {u.tasks ? u.tasks.length : 0}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
