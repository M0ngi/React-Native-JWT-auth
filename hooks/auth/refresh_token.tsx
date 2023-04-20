import { useContext } from "react";
import { AuthContext } from "../../context/auth_context/auth_context";
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios';
import { Response } from "../types";
import { LoginResponseDTO } from "../../DTO/login_dto";
import getHeaders from "../../utils/api_utils";
import { AuthAct } from "../../context/auth_context/types";
import { secureDelete, secureSave } from "../../utils/secure_storage";
import axios from "axios";
import { PUBLIC_API_URL } from "../../consts/api";

export function useRefreshToken() {
    const { auth, dispatchAuth } = useContext(AuthContext);

    return useMutation({
        mutationKey: ['user', 'auth', 'refresh_token'],
        mutationFn: async () => {
            const inst = axios.create({
                baseURL: PUBLIC_API_URL,
                headers: getHeaders(auth.accessToken),
            });
            const { access_token, refresh_token } = await inst
                .post('/auth/refresh')
                .then(
                    (res: AxiosResponse<Response<LoginResponseDTO>>) => res.data.data,
                );
            return { access_token, refresh_token }
        },
        onSuccess: async ({ refresh_token, access_token }) => {
            const authState = {
                user: auth.user,
                accessToken: access_token,
                refreshToken: refresh_token,
            }
            await secureSave("authState", authState);
            dispatchAuth({ type: AuthAct.REFRESH, payload: { refreshToken: refresh_token, accessToken: access_token } })
        },
        onError: async (error) => {
			await secureDelete("authState");
            dispatchAuth({type: AuthAct.LOGOUT})
        },
        cacheTime: 0,
    });
}