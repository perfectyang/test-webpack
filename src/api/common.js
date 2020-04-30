import fetch from './fetch.js'
export function transformJs (data) {
  return fetch.post('/api/es5', data)
}