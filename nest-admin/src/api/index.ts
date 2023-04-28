import axios from 'axios'

export const baseUrl = 'http://localhost:3000'

axios.defaults.baseURL = baseUrl

export const addUser = data => axios.post('/v1/login/add', data).then(res => res.data)
export const login = data => axios.post('/v1/login', data).then(res => res.data)

export const getList = data => axios.get('/v1/login', { params: data }).then(res => res.data)

export const delUser = data => axios.delete(`/v1/login/${data.id}`).then(res => res.data)

export const updateUser = data => axios.patch(`/v1/login/${data.id}`, data).then(res => res.data)

//添加tag
export const addTags = data => axios.post(`/v1/login/add/tags`, data).then(res => res.data)
