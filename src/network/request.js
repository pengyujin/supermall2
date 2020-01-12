import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/hy',
    timeout: 5000
  })

  // instance.interceptors.request.user(config => {
  //   return config
  // }, err => {
  //   console.log(err);
  // })

  //返回的是promise
  return instance(config)
}
