import { useContext } from "react";
import { AuthContext } from "../../context/auth_context/auth_context";
import useAxios from "../axios";
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse, AxiosError } from 'axios';
import { Response } from "../types";
import { LoginRequestDTO, LoginResponseDTO } from "../../DTO/login_dto";
import { IUser } from "../../types";
import getHeaders from "../../utils/api_utils";
import { AuthAct } from "../../context/auth_context/types";
import { secureSave } from "../../utils/secure_storage";
import { useLogout } from "./logout";
import { AppContext } from "../../context/app_context/app_context";
import { AppAct } from "../../context/app_context/types";

export function useLogin() {
	const { axios } = useAxios();
	const { dispatchAuth } = useContext(AuthContext);
	const { dispatchApp } = useContext(AppContext);
    const logout = useLogout();

	return useMutation({
		mutationKey: ['user', 'auth', 'login'],
		mutationFn: async (credentials: LoginRequestDTO) => {
			const { access_token, refresh_token } = await axios
				.post('/auth/login', credentials)
				.then(
					(res: AxiosResponse<Response<LoginResponseDTO>>) => res.data.data,
				);
			return axios
				.get('/user', { headers: getHeaders(access_token) })
				.then((res: AxiosResponse<Response<IUser>>) => res.data.data)
				.then((user) => ({ refresh_token, access_token, user }));
		},
		onSuccess: async ({ refresh_token, access_token, user }) => {
            const authState = {
                user,
                accessToken: access_token,
                refreshToken: refresh_token,
            }
            await secureSave("authState", authState);
			dispatchAuth({type: AuthAct.LOGIN, payload: authState})
		},
		onError: (error: AxiosError<Response<string>>) => {
			dispatchApp({
				type: AppAct.ERROR, 
				payload: error.response.data.data
			})
			logout.mutate();
		},
		cacheTime: 0,
		retry: 0,
	});
}