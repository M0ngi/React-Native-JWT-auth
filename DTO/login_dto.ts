export type LoginResponseDTO = {
    access_token: string;
    refresh_token: string;
}

export type LoginRequestDTO = {
    email: string;
    password: string;
}

export type GLoginRequestDTO = {
    oauthToken: string;
}