import { api } from './client';
import type { Dash, CreateDashDto, UpdateDashDto, Block } from 'types/dash';

export const dashesApi = {
    list: () => api<Dash[]>('/dashes'),

    getById: (id: string) =>
        api<{ dash: Dash, blocks: Block[]}>(`/dashes/${id}`),

    create: (data: CreateDashDto) =>
        api<Dash>('/dashes', {
            method: 'POST',
            body: JSON.stringify(data)
        }),

    updateName: (id: string, data: { name: string }) =>
        api<Dash>(`/dashes/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        }),
    update: (id: string, data: UpdateDashDto) =>
        api<Dash>(`/dashes/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        }),
    delete: (id: string) =>
        api<Dash>(`/dashes/${id}`, {
            method: 'DELETE',
        }),
};
