import { useEffect, useState } from "react";

import type { User } from "types/user";

import Button from "components/button/Button";
import { Input } from "components/input/Input";
import { Select } from "components/select/Select";

interface EditUserFormProps {
    loading: boolean;
    user?: User;
    onSave: (id: string, data: {}) => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({
    loading,
    user,
    onSave
}) => {
    const [id, setId] = useState<string | undefined>();
    const [fullName, setFullName] = useState<string | undefined>();
    const [email, setEmail] = useState<string | undefined>();
    const [role, setRole] = useState<string | undefined>();
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!loading && !!user) {
            setId(user.id);
            setFullName(user.fullName);
            setEmail(user.email);
            setRole(user.role);
        }
    }, [loading, user]);

    const emailInvalid = email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValid =
        fullName &&
        !emailInvalid &&
        ['user', 'networkAdmin', 'admin'].includes(role || '');

    const handleSave = async () => {
        if (!isValid) return;
        setSaving(true);
        await onSave(id || "", { fullName, email, role });
        setSaving(false);
    };

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

export default EditUserForm;