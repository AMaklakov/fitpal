import axiosLib, { AxiosResponse } from 'axios';
import { SERVER_URL } from '@const/server-const';
import AsyncStorage from '@react-native-community/async-storage';
import { navigate } from '@util/navigation.util';
import { Routes } from '../navigation/routes';

export const axios = axiosLib.create({
	baseURL: `${SERVER_URL}/api/v1/`,
});

axios.interceptors.request.use(
	async request => {
		const token = await getToken();
		if (token) {
			request.headers.Authorization = `Bearer ${token}`;
		}

		const userId = await getUserId();
		if (userId) {
			request.headers.user = userId;
		}

		return request;
	},
	error => Promise.reject(error)
);

axios.interceptors.response.use(undefined, (error: { response: AxiosResponse }) => {
	if (error.response.status === 401) {
		navigate(Routes.Login);
	}

	throw error;
});

export const setToken = async (token: string) => await AsyncStorage.setItem('token', token);
export const getToken = async () => await AsyncStorage.getItem('token');
export const removeToken = async () => await AsyncStorage.removeItem('token');

export const setUserId = async (id: string) => await AsyncStorage.setItem('userId', id);
export const getUserId = async () => await AsyncStorage.getItem('userId');
export const removeUserId = async () => await AsyncStorage.removeItem('userId');
