import { $authHost, $host } from "./index";
import {jwtDecode} from 'jwt-decode';

export const registration = async (name: string, surname: string, login: string, password: string) => {
    const {data} = await $host.post('user/', {name, surname, registration: new Date(), login, password, role: 'USER'});
    const token = localStorage.getItem('token');
    if (!token) {
        localStorage.setItem('token', data);
    }
    console.log(data);
    return jwtDecode(data);
};  

export const loginReq = async (login: string, password: string) => {
    const {data} = await $host.post('user/login', {login, password});
    const token = localStorage.getItem('token');
    if (!token) {
        localStorage.setItem('token', data);
    }
    console.log(data);
    console.log(jwtDecode(data));
    return jwtDecode(data);
};

export const check = async () => {
    const {data} = await $authHost.get('user/auth');
    const token = localStorage.getItem('token');
    if (!token) {
        localStorage.setItem('token', data);
    }
    console.log(data);
    return jwtDecode(data);
};

export const getOneUser = async (id:number) => {
    const {data} = await $host.get('user/id/' + id);
    return data;
}; 

export const postMarkMovie = async (movie_id:number, user_id:number, mark:boolean) => {
    const {data} = await $authHost.post('/movieuser/', {movie_id, user_id, mark});
    return data;
}; 