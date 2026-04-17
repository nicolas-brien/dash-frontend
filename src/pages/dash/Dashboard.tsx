import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { dashesApi } from "../../api/dashes.api";
import type { Dash } from "../../types/dash";

import { Page } from "../../components/page/Page";
import { Input } from "../../components/input/Input";

import Pencil from "../../svg/pencil.svg?react";
import Trash from "../../svg/trash.svg?react";
import Check from "../../svg/check.svg?react";
import Lock from "../../svg/lock.svg?react";
import Unlock from "../../svg/unlock.svg?react";
import Plus from "../../svg/plus.svg?react";

import Button from "../../components/button/Button";
import Modal from "../../components/modal/Modal";
import { ModalSize, ModalVariant } from "../../components/modal/ModalTypes";
import { Grid } from "../../components/grid-elements/grid/Grid";

const defaultDash = {
    id: '',
    name: '',
    updatedAt: '',
}

import "./dashboard.scss";

export const Dashboard = () => {
    const { dashId } = useParams();
    const [dash, setDash] = useState<Dash>(defaultDash);
    const [blocks, setBlocks] = useState<any[]>([]);
    const [isLocked, setIsLocked] = useState(true);
    const [newName, setNewName] = useState('');
    const [isEditingName, setIsEditingName] = useState(false);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetch = async (id: string) => {
        const d = await dashesApi.getById(id);
        setDash(d);
    }

    const handleNameEdit = () => {
        setNewName(dash?.name || '');
        setIsEditingName(true);
    }

    const handleNameUpdate = async () => {
        if (!dashId || !newName || newName === dash?.name) {
            setIsEditingName(false);
            return;
        }

        await dashesApi.update(dashId, { name: newName });
        setDash({ ...dash, name: newName, updatedAt: new Date().toISOString() });
        setIsEditingName(false);
    }

    const handleClickDelete = () => {
        setIsConfirmDeleteOpen(true);
    }

    const handleDelete = async () => {
        if (!dashId) return;

        setIsDeleting(true);
        await dashesApi.delete(dashId);
        setIsDeleting(false);
        setIsConfirmDeleteOpen(false);
    }

    const handleAddBlock = () => {
        setBlocks([...blocks, { i: `block${blocks.length}`, x: 8, y: 0, w: 2, h: 3 }])
    }

    useEffect(() => {
        if (!dashId) return;
        fetch(dashId);
    }, [dashId]);

    return (
        <Page>
            <div className="dashboard">
                <div className="dashboard__header">
                    <div className="dashboard__title">
                        {
                            isEditingName ?
                                <Input id="dashboard-name" value={newName} onChange={setNewName} />
                                :
                                <h1>{dash.name}</h1>
                        }
                        {
                            isEditingName ?
                                <Button id="dashboard-edit" onClick={(handleNameUpdate)} icon={<Check />} variant="primary" />
                                :
                                <Button id="dashboard-edit" onClick={(handleNameEdit)} icon={<Pencil />} variant="primary" />
                        }
                    </div>
                    <div className="dashboard__settings">
                        {dash.updatedAt && <h5>last updated {dash.updatedAt}</h5>}
                        <Button id="dashboard-delete" onClick={handleClickDelete} icon={<Trash />} variant="danger" />
                        {
                            <Modal open={isConfirmDeleteOpen}
                                title={`Delete ${name}?`}
                                size={ModalSize.Small}
                                variant={ModalVariant.ConfirmDanger}
                                ctaLabel="Delete"
                                ctaLoading={isDeleting}
                                onCta={handleDelete}
                                onClose={() => setIsConfirmDeleteOpen(false)}>
                                This action cannot be undone.
                            </Modal>
                        }
                    </div>
                </div>
                <div className="dashboard__container">
                    <Grid className="dashboard__grid" isLocked={isLocked} layout={blocks} onLayoutChange={(b) => setBlocks(b)} />
                </div>
                <div className="dashboard__controls-container">
                    <Button id="dashboard-lock" onClick={() => setIsLocked(!isLocked)} icon={isLocked ? <Lock /> : <Unlock />} variant={isLocked ? "primary" : "secondary" } />
                    <Button id="dashboard-controls-add" onClick={handleAddBlock} icon={<Plus />} variant="secondary" disabled={isLocked} />
                </div>
            </div>
        </Page>
    )
}