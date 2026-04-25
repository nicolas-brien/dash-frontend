import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { User } from "types/user";
import { useAuth } from "context/AuthContext";
import { useUsers } from "hooks/useUsers";
import { useUser } from "hooks/useUser";

import Button from "components/button/Button";
import Modal from "components/modal/Modal";
import Table from "components/table/Table";
import { ModalSize, ModalVariant } from "components/modal/ModalTypes";

const UsersTable = () => {
    const navigate = useNavigate();
    const { user: currentUser } = useAuth();
    const { users, refetch, loading, error: errorUsers } = useUsers();
    const { deleteUser, error: errorUser } = useUser();
    const [selectedUser, setSelectedUser] = useState<User>(); 
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleEdit = (userId: string) => {
        navigate(`/admin/users/${userId}`);
    };

    const handleDeleteClick = (user: User) => {
        setSelectedUser(user);
        setConfirmDeleteOpen(true);
    };

    const handleDelete = async() => {
        if (selectedUser?.id) {
            setDeleting(true);
            await deleteUser(selectedUser.id);
            setDeleting(false);

            if (!errorUser) {
                setConfirmDeleteOpen(false);
                setSelectedUser(undefined);
                refetch();
            } else {
                console.log(errorUser);
            }
        }
    }

    const columns = [
        { key: 'username', header: 'Username' },
        { key: 'fullName', header: 'Full Name' },
        { key: 'email', header: 'Email' },
        { key: 'role', header: 'Role' },
        {
            key: 'id',
            header: 'Actions',
            render: (user: User) => (
                <div>
                    <Button variant="link" onClick={() => handleEdit(user.id)}>
                        Edit
                    </Button>
                    &nbsp;&nbsp;
                    {currentUser?.id !== user.id && <Button variant="danger" onClick={() => handleDeleteClick(user)}>
                        Delete
                    </Button>}
                </div>
            )
        }
    ];

    return (
        <div className="users-table">
            {<Modal
                    open={confirmDeleteOpen}
                    title={`Delete ${selectedUser?.fullName}?`}
                    variant={ModalVariant.ConfirmDanger}
                    size={ModalSize.Small}
                    ctaLabel="Delete"
                    ctaLoading={deleting}
                    onCta={handleDelete}
                    onClose={() => setConfirmDeleteOpen(false)}
                >
                    This action cannot be undone.
                </Modal>
                }
                {loading && <p>Loading…</p>}
                {errorUsers && <p style={{ color: 'red' }}>{errorUsers}</p>}

                <Table<User> columns={columns} rows={users} />
            </div>
    );
}

export default UsersTable;