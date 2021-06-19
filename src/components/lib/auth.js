const userTypes = ['Help-seeker', 'NGO']

export function setToken(token) {
  window.localStorage.setItem('token', token)
}

export function getToken() {
  return window.localStorage.getItem('token')
}

export function removeToken() {
  window.localStorage.removeItem('token')
}

export function getPayLoad() {
  const token = getToken()
  console.log('token: ', token)
  if (!token) return false
  const parts = token.split('.')
  if (parts.length < 3) return false
  return JSON.parse(atob(parts[1]))
}

export function isAuthenticated() {
  const payload = getPayLoad()
  if (!payload) return false
  const now = Math.round(Date.now() / 1000)
  return now < payload.exp
}

export function isCreator(userId) {
  const payload = getPayLoad()
  if (!payload) return false
  return userId === payload.sub
}

export function isNGO() {
  const payload = getPayLoad()
  if (!payload) return false
  console.log('payload.type: ', payload.type)
  return userTypes[1] === payload.type
}
