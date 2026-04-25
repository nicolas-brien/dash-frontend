import { useState } from 'react';

import { usersApi } from 'api/users.api';
import { ApiException } from 'api/errors';
import type { CreateUserDto, UpdateUserDto } from 'types/user';

export const useUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUser = async (id: string) => {
        setLoading(true);
        setError(null);

        try {
            return await usersApi.getById(id);
        } catch (e) {
            if (e instanceof ApiException) {
                setError(e.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const createUser = async (data: CreateUserDto) => {
        setLoading(true);
        setError(null);

        try {
            await usersApi.create(data);
        } catch (e) {
            if (e instanceof ApiException) {
                setError(e.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async (id: string, data: UpdateUserDto) => {
        setLoading(true);
        setError(null);

        try {
            await usersApi.update(id, data);
        } catch (e) {
            if (e instanceof ApiException) {
                setError(e.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id: string) => {
        setLoading(true);
        setError(null);

        try {
            await usersApi.delete(id);
        } catch (e) {
            if (e instanceof ApiException) {
                setError(e.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        error,
        fetchUser,
        createUser,
        updateUser,
        deleteUser
    };
};
