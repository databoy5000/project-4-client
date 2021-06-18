import axios from 'axios'
import { getToken } from './auth'

export const baseUrl = '/api'
export const crisesPath = 'crises'
export const resourcesPath = 'resources'
export const registerPath = 'register'
export const loginPath = 'login'
export const typesPath = 'types'
export const authPath = 'auth'



function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}

// * --- Crises
export function getAllCrises() {
  return axios.get(`${baseUrl}/${crisesPath}`)
}

export function getSingleCrisis(crisisId) {
  return axios.get(`${baseUrl}/${crisesPath}/${crisisId}`)
}

export function getUserCrisis(userId) {
  return axios.get(`${baseUrl}/${crisesPath}/${userId}`)
}

export function createCrisis(formdata) {
  return axios.post(`${baseUrl}/${crisesPath}/`, formdata, headers())
}

export function editCrisis(crisisId, formdata) {
  return axios.put(`${baseUrl}/${crisesPath}/${crisisId}/`, formdata, headers())
}

export function deleteCrisis(crisisId) {
  return axios.delete(`${baseUrl}/${crisesPath}/${crisisId}/`, headers())
}

// * --- Resources
export function getDisasterTypes() {
  return axios.get(`${baseUrl}/${crisesPath}/${typesPath}/`)
}

export function getResourceNamesTypes() {
  return axios.get(`${baseUrl}/${crisesPath}/${resourcesPath}/`)
}

// * --- Authentication
export function registerUser(formdata) {
  return axios.post(`${baseUrl}/${authPath}/${registerPath}/`, formdata)
}

export function loginUser(formdata) {
  return axios.post(`${baseUrl}/${authPath}/${loginPath}/`, formdata)
}