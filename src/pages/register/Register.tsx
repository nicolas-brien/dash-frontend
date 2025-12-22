import { useState } from 'react';
import { Input } from '../../components/input/Input';
import { Page } from '../../components/page/Page';
import type { CreateUserDto } from '../../types/user';
import { useNavigate } from 'react-router-dom';
import { usersApi } from '../../api/users.api';
import { ApiException } from '../../api/errors';

interface RegisterPayload {
    username: string;
    email: string;
    password: string;
    fullName: string;
}

const RegisterForm = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState<RegisterPayload>({
        username: '',
        email: '',
        password: '',
        fullName: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const update = (key: keyof RegisterPayload) => (value: string) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    const emailInvalid =
        submitted && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

    const isValid =
        form.username &&
        form.email &&
        form.password &&
        form.fullName &&
        !emailInvalid;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);

        if (!isValid) return;

        try {
            const payload: CreateUserDto = {
                username: form.username,
                email: form.email,
                password: form.password,
                fullName: form.fullName
            };

            await usersApi.create(payload);

            navigate('/');
        } catch (e) {
            if (e instanceof ApiException && e.fieldErrors) {
                console.error('Field errors:', e.fieldErrors);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                id="fullName"
                label="Full name"
                value={form.fullName}
                clearable
                onChange={update('fullName')}
                errorText={
                    submitted && !form.fullName ? 'Full name is required' : undefined
                }
            />

            <div style={{ height: '1.25em' }} />

            <Input
                id="username"
                label="Username"
                value={form.username}
                clearable
                onChange={update('username')}
                errorText={submitted && !form.username ? 'Username is required' : undefined}
            />

            <div style={{ height: '0.75em' }} />

            <Input
                id="email"
                label="Email"
                type="email"
                value={form.email}
                clearable
                onChange={update('email')}
                errorText={emailInvalid ? 'Invalid email address' : undefined}
            />

            <div style={{ height: '0.75em' }} />

            <Input
                id="password"
                label="Password"
                type="password"
                value={form.password}
                onChange={update('password')}
                errorText={
                    submitted && !form.password ? 'Password is required' : undefined
                }
            />

            <div style={{ height: '0.75em' }} />

            <button
                type="submit"
                disabled={(!isValid) && submitted}
                style={{
                    width: '100%',
                    height: '2.75em',
                    borderRadius: '0.5em',
                    border: 'none',
                    backgroundColor: '#2b6cff',
                    color: '#fff',
                    fontSize: '1em',
                    cursor: 'pointer'
                }}
            >
                Register
            </button>
        </form>
    );
};

export default RegisterForm;