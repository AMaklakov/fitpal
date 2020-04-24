import axiosLib from 'axios';
import { SERVER_URL } from '@const/server-const';

export const axios = axiosLib.create({
<<<<<<< HEAD
	baseURL: `${SERVER_URL}/api/v1/`,
=======
	baseURL: `${SERVER_URL}/api`,
>>>>>>> feature(http-requests): add covid saga
});
