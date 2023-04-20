import { useContext } from "react";
import useAxios from "../axios";
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios';
import { Response, ResponseError } from "../types";
import { IUser } from "../../types";
import { AppContext } from "../../context/app_context/app_context";
import { AppAct } from "../../context/app_context/types";
import { ChangePassRequestDTO } from "../../DTO/changepass_dto";

export function useChangePass() {
	const { axios } = useAxios();
	const { dispatchApp } = useContext(AppContext);

	return useMutation({
		mutationFn: async (req: ChangePassRequestDTO) => {
			return axios
				.patch('/user/password', req)
				.then((res: AxiosResponse<Response<IUser>>) => res.data.data)
				.then((user) => ({user}));
		},
		onSuccess: async ({user}) => {
            dispatchApp({ type: AppAct.INFO, payload: "Your password has been updated." })
		},
		onError: (error: ResponseError<any>) => {
			if(error.response.data.data){
				dispatchApp({
					type: AppAct.ERROR, 
					payload: "Unable to change password. Try again." 
				})
            }
		},
		cacheTime: 0,
		retry: 0,
	});
}