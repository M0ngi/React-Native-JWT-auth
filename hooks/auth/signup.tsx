import { useContext } from "react";
import { AuthContext } from "../../context/auth_context/auth_context";
import useAxios from "../axios";
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios';
import { Response } from "../types";
import { LoginResponseDTO } from "../../DTO/login_dto";
import { IUser } from "../../types";
import getHeaders from "../../utils/api_utils";
import { AuthAct } from "../../context/auth_context/types";
import { secureSave } from "../../utils/secure_storage";
import { useLogout } from "./logout";
import { SignUpRequestDTO } from "../../DTO/signup_dto";
import { useLogin } from "./login";
import { AppContext } from "../../context/app_context/app_context";
import { AppAct } from "../../context/app_context/types";

export function useSignUp() {
    const { axios } = useAxios();
	const { dispatchApp } = useContext(AppContext);
    const { dispatchAuth } = useContext(AuthContext);

    const logout = useLogout();
    const login = useLogin();

    return useMutation({
        mutationKey: ['user', 'auth', 'signup'],
        mutationFn: async (credentials: SignUpRequestDTO) => {
            const { access_token, refresh_token } = await axios
                .post('/auth/register', credentials)
                .then(
                    (res: AxiosResponse<Response<LoginResponseDTO>>) => res.data.data,
                );
            return credentials;
        },
        onSuccess: (credentials) => {

            login.mutate({ email: credentials.email, password: credentials.password })
        },
        onError: (error) => {
            dispatchApp({
				type: AppAct.ERROR, 
				payload: "Unable to register account." 
			})
            logout.mutate();
        },
        cacheTime: 0,
		retry: 0,
    });
}