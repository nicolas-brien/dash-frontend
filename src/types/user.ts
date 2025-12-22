export interface User {
    id: string;
    username: string;
    email: string;
    fullName: string;
    role: 'user' | 'networkAdmin' | 'admin';
}

export interface RegisterUserDto {
    username: string;
    email: string;
    password: string;
    fullName: string;
}

export interface CreateUserDto {
    username: string;
    email: string;
    password: string;
    fullName: string;
}

export interface UpdateUserDto {
    fullName?: string;
    email?: string;
    role?: string;
}
