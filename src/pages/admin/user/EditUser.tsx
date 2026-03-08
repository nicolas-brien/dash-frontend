import { useParams } from "react-router-dom";
import EditUserForm from "../../../composed-components/user/EditUserForm";
import { useUser } from "../../../hooks/useUser";
import { useEffect, useState } from "react";
import type { User } from "../../../types/user";

const EditUser = () => {
    const { id } = useParams<{ id: string }>();
    const { fetchUser, updateUser } = useUser();

    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);
    
    if (!id) return "ID required";

    useEffect(() => {
        const load = async () => {
            var u = await fetchUser(id);
            if (u) {
                setUser(u);
                setLoading(false);
            } else {
                return "User not found";
            }
        };
        load();
    }, [id]);

    const handleSave = async(id: string, data: {}) => {
        await updateUser(id, data);
    }

    return (
        <EditUserForm loading={loading} user={user} onSave={handleSave} />
    );
}

export default EditUser;