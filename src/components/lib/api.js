import axios from 'axios'
import { getToken } from './auth'
import { baseUrl } from '../../config'

export const crisesPath = 'crises'
export const crisisPath = 'crisis'
export const resourcesPath = 'resources'
export const registerPath = 'register'
export const loginPath = 'login'
export const typesPath = 'types'
export const authPath = 'auth'
export const ngoResourcesPath = 'ngo_resources'
export const hsPath = 'hs'
export const ngoPath = 'ngo'
export const editPath = 'edit'
export const requestPath = 'request'

function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}

// * --- Crises
export function getAllCrises() {
  return axios.get(`${baseUrl}/${crisesPath}/`)
}

export function getSingleCrisis(crisisId) {
  return axios.get(`${baseUrl}/${crisesPath}/${crisisPath}/${crisisId}/`)
}

export function getUserCrisis(userId) {
  return axios.get(`${baseUrl}/${crisesPath}/${userId}/`)
}

export function createCrisis(formdata) {
  return axios.post(`${baseUrl}/${crisesPath}/`, formdata, headers())
}

export function editCrisis(crisisId, formdata) {
  return axios.put(`${baseUrl}/${crisesPath}/${crisisPath}/${crisisId}/`, formdata, headers())
}

export function deleteCrisis(crisisId) {
  return axios.delete(`${baseUrl}/${crisesPath}/${crisisPath}/${crisisId}/`, headers())
}

export function editRequest(requestId, formdata) {
  return axios.put(`${baseUrl}/${crisesPath}/${requestPath}/${requestId}/`, formdata, headers())
}

// * --- Resources
export function getDisasterTypes() {
  return axios.get(`${baseUrl}/${crisesPath}/${typesPath}/`)
}

export function getResourceNamesTypes() {
  return axios.get(`${baseUrl}/${crisesPath}/${resourcesPath}/`)
}

export function getUserNGOResources() {
  return axios.get(`${baseUrl}/${crisesPath}/${ngoResourcesPath}/`, headers())
}

export function createNGOResources(formdata) {
  return axios.post(`${baseUrl}/${crisesPath}/${ngoResourcesPath}/`, formdata, headers())
}

export function editNGOResources(formdata, resourceId) {
  return axios.put(`${baseUrl}/${crisesPath}/${ngoResourcesPath}/${resourceId}/`, formdata, headers())
}

// * --- Authentication
export function registerUser(formdata) {
  return axios.post(`${baseUrl}/${authPath}/${registerPath}/`, formdata)
}

export function loginUser(formdata) {
  return axios.post(`${baseUrl}/${authPath}/${loginPath}/`, formdata)
}