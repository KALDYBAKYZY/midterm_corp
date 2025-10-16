import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import UsersPage from './components/UsersPage'
import CategoriesPage from './components/CategoriesPage'

export default function App() {
  return (
    <div className="container py-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 rounded">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">TaskManager</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/">Tasks</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/create">Create</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/categories">Categories</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/create" element={<TaskForm />} />
        <Route path="/edit/:id" element={<TaskForm editMode />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
      </Routes>
    </div>
  )
}
