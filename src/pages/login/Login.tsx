import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from 'context/AuthContext';

import { Input } from 'components/input/Input';
import { Page } from 'components/page/Page';
import VerticalDivider from 'components/layout/VerticalDivider';

interface LoginPayload {
    usernameOrEmail: string;
    password: string;
}

const LoginForm = () => {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         // Redirect logged-in users to dashboard
    //         navigate('/');
    //     }
    // }, [isAuthenticated]);

    // if (isAuthenticated) {
    //     // Redirect logged-in users to dashboard
    //     return <Navigate to="/" replace />;
    // }

    const [form, setForm] = useState<LoginPayload>({
        usernameOrEmail: '',
        password: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const update = (key: keyof LoginPayload) => (value: string) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    const isValid =
        form.usernameOrEmail &&
        form.password;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);

        if (!isValid) return;

        await login(form);
        
        navigate('/');
    };

    return (
        <Page
            header={<h1>Login</h1>}
            footer={<span>Don't have an account? <a href="/register">Register</a></span>}
        >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <form onSubmit={handleSubmit}>
                    <Input
                        id="username"
                        label="Username or Email"
                        value={form.usernameOrEmail}
                        onChange={update('usernameOrEmail')}
                        errorText={submitted && !form.usernameOrEmail ? 'Username or Email is required' : undefined}
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
                        disabled={!isValid && submitted}
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
                        Login
                    </button>
                </form>
                <VerticalDivider />
                <span style={{ display: 'flex', alignItems: 'center' }}>Don't have an account?&nbsp;<a href="/register">Register</a></span>
            </div>
        </Page>
    );
};

export default LoginForm;