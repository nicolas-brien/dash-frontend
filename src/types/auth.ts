export interface LoginDto {
    usernameOrEmail: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken?: string;
    user: {
        id: string;
        username: string;
        email: string;
        fullName: string;
        role: string;
    };
}
