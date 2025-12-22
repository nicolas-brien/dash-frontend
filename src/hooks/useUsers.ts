import { useEffect, useState } from 'react';
import { usersApi } from '../api/users.api';
import type { User } from '../types/user';
import { ApiException } from '../api/errors';

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);

        try {
            setUsers(await usersApi.list());
        } catch (e) {
            if (e instanceof ApiException) {
                setError(e.message);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return {
        users,
        loading,
        error,
        refetch: fetchUsers
    };
};
