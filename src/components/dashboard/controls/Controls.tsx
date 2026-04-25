import "./controls.scss";
import { useState } from "react";

import Button from "../../../components/button/Button";
import Modal from "../../../components/modal/Modal";
import { ModalSize, ModalVariant } from "../../../components/modal/ModalTypes";

import Save from "../../../svg/save.svg?react";
import Trash from "../../../svg/trash.svg?react";

interface ControlsProps {
    name: string,
    lastUpdatedAt: string,
    isDirty: boolean,
    onSave: () => void,
    isDeleting: boolean,
    onDelete: () => void
}

export const Controls = (props: ControlsProps) => {
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

    const handleOpenDeleteModal = () => {
        setIsConfirmDeleteOpen(true);
    }

    return (
        <div className="controls">
            {props.lastUpdatedAt && <h5>last updated {props.lastUpdatedAt}</h5>}
            <Button id="dashboard-controls-save" onClick={props.onSave} icon={<Save />} disabled={!props.isDirty} variant={props.isDirty ? "primary" : "secondary"} />
            <Button id="dashboard-delete" onClick={handleOpenDeleteModal} icon={<Trash />} variant="danger" />
            {
                <Modal open={isConfirmDeleteOpen}
                    title={`Delete ${props.name}?`}
                    size={ModalSize.Small}
                    variant={ModalVariant.ConfirmDanger}
                    ctaLabel="Delete"
                    ctaLoading={props.isDeleting}
                    onCta={props.onDelete}
                    onClose={() => setIsConfirmDeleteOpen(false)}>
                    This action cannot be undone.
                </Modal>
            }
        </div>
    );
}