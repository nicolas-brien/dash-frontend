import { api } from './client';
import type { User, CreateUserDto, UpdateUserDto } from '../types/user';

export const usersApi = {
    list: () => api<User[]>('/users'),

    getById: (id: string) =>
        api<User>(`/users/${id}`),

    create: (data: CreateUserDto) =>
        api<User>('/users', {
            method: 'POST',
            body: JSON.stringify(data)
        }),

    update: (id: string, data: UpdateUserDto) =>
        api<User>(`/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        }),
    delete: (id: string) =>
        api<User>(`/users/${id}`, {
            method: 'DELETE',
        }),
};
