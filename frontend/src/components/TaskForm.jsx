import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Tasks, Users, Categories } from '../api'

export default function TaskForm({ editMode=false }){
  const navigate = useNavigate()
  const { id } = useParams()
  const [task, setTask] = useState({ title: '', description: '', completed: false, user_id: null, category_id: null })
  const [users, setUsers] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    Users.list().then(r => setUsers(r.data)).catch(()=>{})
    Categories.list().then(r => setCategories(r.data)).catch(()=>{})
    if(id){
      Tasks.get(id).then(r => {
        const t = r.data
        // backend returns nested user and category, map to user_id/category_id for select inputs
        setTask({
          id: t.id,
          title: t.title || '',
          description: t.description || '',
          completed: t.completed || false,
          user_id: t.user?.id || null,
          category_id: t.category?.id || null
        })
      }).catch(()=>{})
    }
  }, [id])

  const handleChange = (e)=>{
    const { name, value, type, checked } = e.target
    setTask(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : (value === '' ? null : value) }))
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    setLoading(true)
    try{
      const payload = {
        title: task.title,
        description: task.description,
        completed: !!task.completed,
        user_id: task.user_id ? Number(task.user_id) : null,
        category_id: task.category_id ? Number(task.category_id) : null
      }

      if(id){
        await Tasks.update(id, { ...payload, id: Number(id) })
      }else{
        await Tasks.create(payload)
      }
      navigate('/')
    }catch(e){
      alert('Ошибка при сохранении')
    }finally{ setLoading(false) }
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{id ? 'Edit Task' : 'Create Task'}</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input name="title" className="form-control" value={task.title} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea name="description" className="form-control" value={task.description} onChange={handleChange} rows={3} />
          </div>

          <div className="mb-3 row">
            <div className="col-md-4">
              <label className="form-label">User</label>
              <select name="user_id" className="form-select" value={task.user_id ?? ''} onChange={handleChange}>
                <option value="">-- Select user --</option>
                {users.map(u => <option key={u.id} value={u.id}>{u.name} ({u.email})</option>)}
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Category</label>
              <select name="category_id" className="form-select" value={task.category_id ?? ''} onChange={handleChange}>
                <option value="">-- None --</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div className="col-md-4 d-flex align-items-end">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" name="completed" id="completed" checked={task.completed} onChange={handleChange} />
                <label className="form-check-label" htmlFor="completed">Completed</label>
              </div>
            </div>
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
            <button type="button" className="btn btn-secondary" onClick={()=>window.history.back()}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
