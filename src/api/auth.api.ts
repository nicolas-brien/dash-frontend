import { auth } from './client';
import { tokenStorage } from './token';
import type { LoginDto, AuthResponse } from 'types/auth';
import type { User } from 'types/user';

export const authApi = {
    login: async (data: LoginDto) => {
        const response = await auth<AuthResponse>('/login', {
            method: 'POST',
            body: JSON.stringify(data)
        });

        tokenStorage.set(response.accessToken);

        return response;
    },

    me: async () => {
        return await auth<User>('/me', {
            method: 'GET'
        });
    },

    logout: () =>
        tokenStorage.clear(),

    getToken: () => tokenStorage.get()
};
