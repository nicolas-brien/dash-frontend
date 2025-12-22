import { useState } from 'react';

import { useUser } from '../../../hooks/useUser';
import UsersTable from './UsersTable';

import Button from '../../../components/button/Button';
import Modal from '../../../components/modal/Modal';
import { ModalSize, ModalVariant } from '../../../components/modal/ModalTypes';
import RegisterForm from '../../register/Register';

const Users = () => {
    // const { createUser, error, loading } = useUser();
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [creating, setCreating] = useState(false);

    const handleCreateClick = () => {
        setCreateModalOpen(true);
    }

    // const handleCreate = () => {
    //     setCreating(true);
    //     createUser()
    // }

    return (
        <div className="users">
            {<Modal
                open={createModalOpen}
                title='Create a new user'
                variant={ModalVariant.Info}
                size={ModalSize.Small}
                // ctaLabel="Create"
                // ctaLoading={creating}
                // onCta={handleCreate}
                onClose={() => setCreateModalOpen(false)}
            >
                <RegisterForm />
            </Modal>
            }
            <Button variant="primary" onClick={handleCreateClick}>Create</Button> 
            <UsersTable />
        </div>
    );
};

export default Users;