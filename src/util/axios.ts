import axiosLib from 'axios';
import { SERVER_URL } from '@const/server-const';

export const axios = axiosLib.create({
	baseURL: `${SERVER_URL}/api/v1/`,
});
