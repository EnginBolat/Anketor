import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com';

const apiService = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const LoginService = async (nickname: string, password: string) => {
    try {
        const response = await apiService.post('/auth/login', {
            username: nickname,
            password: password,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};