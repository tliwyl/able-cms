import axios from 'axios';
import vuePopper from 'element-ui/lib/utils/vue-popper';


// let base = 'http://192.168.3.253:8081';
let base = "";

export const requestLogin = params => { return axios.get(`${base}/account/login`, { params: params }).then(res => res.data) };

export const requestRegister = params => { return axios.post(`${base}/register`, params).then(res => res.data) }
// export const phoneCode = params => {
//     return axios.get(
//         "http://192.168.3.253:8081/sms/sendMessage",
//         { params: params }
//     ).then(res=>res.data);
// }
export const getUserList = params => { return vue.http.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };
