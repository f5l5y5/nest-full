import axios from 'axios'

export const baseUrl = 'http://localhost:3000/v1'

axios.defaults.baseURL = baseUrl

export const addUser = data => axios.post('/login/add', data).then(res => res.data)
export const login = data => axios.post('/login', data).then(res => res.data)

export const getList = data => axios.get('/login', { params: data }).then(res => res.data)

export const delUser = data => axios.delete(`/login/${data.id}`).then(res => res.data)

export const updateUser = data => axios.patch(`/login/${data.id}`, data).then(res => res.data)

//添加tag
export const addTags = data => axios.post(`/login/add/tags`, data).then(res => res.data)
