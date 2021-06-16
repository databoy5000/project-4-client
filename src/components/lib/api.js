import axios from 'axios'
import { getToken } from './auth'

const baseUrl = '/api'

function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}

export function getAllCrises() {
  return axios.get(`${baseUrl}/crises`)
}

export function getSingleCrisis(crisisId) {
  return axios.get(`${baseUrl}/crises/${crisisId}`)
}

export function createCrisis(formdata) {
  return axios.post(`${baseUrl}/crises`, formdata, headers())
}

export function editCrisis(crisisId, formdata) {
  return axios.put(`${baseUrl}/crises/${crisisId}`, formdata, headers())
}

export function deleteCrisis(crisisId) {
  return axios.delete(`${baseUrl}/crises/${crisisId}`, headers())
}

export function registerUser(formdata) {
  return axios.post(`${baseUrl}/register`, formdata)
}

export function loginUser(formdata) {
  return axios.post(`${baseUrl}/login`, formdata)
}