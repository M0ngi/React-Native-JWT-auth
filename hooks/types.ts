import { AxiosError } from "axios";

export type Response<T = undefined> = {
	msg: "error" | "success";
	data: T;
};

export type ResponseError<T> = AxiosError<Response<T>>;
