import axios from 'axios'
import { Message, MessageBox } from 'element-ui'

const service = axios.create({
    baseURL: process.env.BASE_API,
    // timeout: 5000
})

// service.interceptors.response.use(
//     response => {
//         console.log('response');
//         console.log(response);
//         return response
//     },
//     error => {
//         console.log('err' + error) // for debug
//         alert('에러가 발생하였습니다 관리자에게 문의하십시오')
//         Message({
//           message: error.message,
//           type: 'error',
//           duration: 5 * 1000
//         })
//         return Promise.reject(error)
//       }
// )

export const userLogin = (data) => {   // expoert function userLogin(data) {
  return service({
    url: '/login',
    method: 'post',
    data,               // = data: data
  })
}

export const noticeList = (params) => {   
  return service.get('/notice/list', { params })
  //   return service({
  //       url: `/notice/list`,
  //       method: 'get',
  //   })
  // }
}

export const noticeDetail = (data) => {   
  return service.get(`/notice/detail/${data}`)
  // return service({
  //   url: `/notice/detail/${data}`,
  //   method: 'get'
  // })
}

export const noticeModify = (data) => {   
  return service.post('/notice/modify', data)
  // return service({
  //   url: '/notice/modify',
  //   method: 'post',
  //   data
  // })
}

export const noticeRegister = (data) => {   
  return service.post('/notice/register', data)
  // return service({
  //   url: '/notice/register',
  //   method: 'post',
  //   data
  // })
}

export const noticeDelete = (data) => {
  return service.post('/notice/delete', data)
  // return service({
  //   url: '/notice/delete',
  //   method: 'post',
  //   data
  // })
}

export const registration = (data) => {
  return service.post('/registration', data)
}

export const autoComplete = (params) => {
  return service.get('/notice/autoComplete', {params})
}