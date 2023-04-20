import axios, { AxiosError, AxiosInstance } from 'axios';
import { useContext, useMemo } from 'react';
import { PUBLIC_API_URL } from '../consts/api';
import { HTTP_FORBIDDEN, HTTP_INTERNAL_SERVER_ERROR, HTTP_UNAUTHORIZED } from '../consts/http';
import { AppContext } from '../context/app_context/app_context';
import { AppAct } from '../context/app_context/types';
import { AuthContext } from '../context/auth_context/auth_context';
import getHeaders from '../utils/api_utils';
import { useRefreshToken } from './auth/refresh_token';
import { Response } from './types';

const useAxios = () => {
	const refreshToken = useRefreshToken()
	const { dispatchApp } = useContext(AppContext);
	const { auth, dispatchAuth } = useContext(
		AuthContext,
	);

	const axiosInstance = useMemo<AxiosInstance>(() => {
		const instance = axios.create({
			baseURL: PUBLIC_API_URL,
			headers: getHeaders(auth.accessToken),
		});

		instance.interceptors.request.use((request) => {
			if(!request.headers.get("repeat"))
				dispatchApp({type: AppAct.LOAD_ON})

			return request;
		})

		instance.interceptors.response.use((response) => {
			dispatchApp({type: AppAct.LOAD_OFF})
			return response;
		}, async (error: AxiosError<Response<string>>) => {
			dispatchApp({type: AppAct.LOAD_OFF})

			switch(error.response.status){
				case HTTP_UNAUTHORIZED: {
					await refreshToken.mutateAsync();
					// @ts-ignore
					error.config.__isRetryRequest = true
					return axios(error.config)
				}
				case HTTP_FORBIDDEN: {
					dispatchApp({
						type: AppAct.ERROR,
						payload: error.response.data.data
					})
					error.response.data.data = null;
					return Promise.reject(error);
				}
				case HTTP_INTERNAL_SERVER_ERROR: {
					console.log(error.response)
					error.response.data.data = null;
					return Promise.reject(error);
				}
			}
			return Promise.reject(error);
		});

		return instance;
	}, [auth.accessToken]);

	return { axios: axiosInstance };
};

export default useAxios;