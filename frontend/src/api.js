import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' }
})

export const Tasks = {
  list: () => api.get('/tasks'),
  get: (id) => api.get(`/tasks/${id}`),
  create: (data) => api.post('/tasks', data),
  update: (id, data) => api.put(`/tasks/${id}`, data),
  remove: (id) => api.delete(`/tasks/${id}`)
}

export const Users = {
  list: () => api.get('/users')
}

export const Categories = {
  list: () => api.get('/categories')
}
