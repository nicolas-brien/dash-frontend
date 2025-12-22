import { useParams, useNavigate } from "react-router-dom";
import { Input } from "../../components/input/Input";
import { Select } from "../../components/select/Select";
import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../hooks/useUser";
import { useEffect, useState } from "react";
import Button from "../../components/button/Button";

const UserForm = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const { fetchUser, updateUser } = useUser();
    const { user: currentUser } = useAuth();
    const [fullName, setFullName] = useState<string | undefined>();
    const [email, setEmail] = useState<string | undefined>();
    const [role, setRole] = useState<string | undefined>();
    const [saving, setSaving] = useState(false);

    var loading;

    if (!currentUser) {
        navigate('/login');
        return;
    };

    useEffect(() => {
        const load = async () => {
            if (id) {
                var user = await fetchUser(id);
                if (user) {
                    setFullName(user.fullName);
                    setEmail(user.email);
                    setRole(user.role);
                }
            }
        };
        !!id && load();
    }, [id]);

    useEffect(() => {
        if (!id && currentUser && currentUser.username !== 'not loaded') {
            setFullName(currentUser.fullName);
            setEmail(currentUser.email);
            setRole(currentUser.role);
        }
    }, [id, currentUser]);

    const emailInvalid = email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValid =
        fullName &&
        !emailInvalid &&
        ['user', 'networkAdmin', 'admin'].includes(role || '');

    const handleSave = async () => {
        if (!isValid) return;
        setSaving(true);
        await updateUser(id || currentUser.id, { fullName, email, role });
        setSaving(false);
    };

    loading = fullName === undefined || email === undefined || role === undefined;

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '20em' }}>
                <Input id="fullName" label="Full Name" loading={loading} value={fullName || ''} onChange={(e) => setFullName(e)} errorText={!loading && !fullName ? 'Full name is required' : undefined} />
                <Input id="email" label="Email" loading={loading} value={email || ''} onChange={(e) => setEmail(e)} errorText={!loading && emailInvalid ? 'Invalid email address' : undefined} />
                <Select id="role" label="Role" loading={loading} value={role || ''} onChange={(e) => setRole(e)} options={[
                    { label: 'User', value: 'user' },
                    { label: 'Network Admin', value: 'networkAdmin' },
                    { label: 'Admin', value: 'admin' }
                ]} errorText={!loading && !role ? 'Role is required' : undefined} />
                <Button variant="success" disabled={!isValid} loading={loading} submitting={saving} onClick={handleSave}>Save</Button>
            </div>
        </div>
    );
};

export default UserForm;