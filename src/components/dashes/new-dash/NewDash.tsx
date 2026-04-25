import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashesApi } from 'api/dashes.api';

import Modal from 'components/modal/Modal';
import { ModalSize, ModalVariant } from 'components/modal/ModalTypes';
import { Input } from 'components/input/Input';

import "./new-dash.scss";

export const NewDash = () => {
    const navigate = useNavigate();
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [creating, setCreating] = useState(false);
    const [dashName, setDashName] = useState('');

    const handleNewClick = () => {
        setCreateModalOpen(true);
    }

    const handleCreateDash = async () => {
        setCreating(true);
        var { id } = await dashesApi.create({ name: dashName });
        setCreating(false);
        setCreateModalOpen(false);
        navigate(`/dashes/${id}`);
    }

    const handleCloseModal = () => {
        setCreateModalOpen(false);
        setDashName('');
    }

    return (
        <div className="new-dash" onClick={handleNewClick}>
            {<Modal
                open={createModalOpen}
                title='Create a new dash'
                variant={ModalVariant.Confirm}
                size={ModalSize.Small}
                ctaLabel="Create"
                ctaLoading={creating}
                onCta={handleCreateDash}
                onClose={handleCloseModal}
            >
                <Input id="dash-name" label="Dashboard name" value={dashName} onChange={(e) => setDashName(e)} />
            </Modal>
            }
            +
        </div>
    );
};