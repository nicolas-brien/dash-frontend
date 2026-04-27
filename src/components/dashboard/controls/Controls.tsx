import "./controls.scss";
import { useState } from "react";

import type { DashSettings } from "types/dash";

import Button from "components/button/Button";
import Modal from "components/modal/Modal";
import { ModalSize, ModalVariant } from "components/modal/ModalTypes";
import { DashSettingsForm } from "composed-components/dash-settings/DashSettingsForm";

import Gear from "svg/gear.svg?react";
import Save from "svg/save.svg?react";
import Trash from "svg/trash.svg?react";

interface ControlsProps {
    name: string,
    settings: DashSettings,
    lastUpdatedAt: string,
    isDirty: boolean,
    onSave: () => void,
    onUpdateSettings: (newSettings: DashSettings) => void,
    isDeleting: boolean,
    onDelete: () => void
}

export const Controls = (props: ControlsProps) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

    const handleOpenDeleteModal = () => {
        setIsConfirmDeleteOpen(true);
    }

    const HandleUpdateSettings = (newSettings: DashSettings) => {
        props.onUpdateSettings(newSettings);
        setIsSettingsOpen(false);
    }

    return (
        <div className="controls">
            {props.lastUpdatedAt && <h5>last updated {props.lastUpdatedAt}</h5>}
            <Button id="dashboard-controls-save" onClick={props.onSave} icon={<Save />} disabled={!props.isDirty} variant={props.isDirty ? "primary" : "secondary"} />
            <Button id="dashboard-controls-settings" icon={<Gear />} variant="secondary" onClick={() => setIsSettingsOpen(true)} />
            {
                <Modal open={isSettingsOpen}
                    title="Dashboard Settings"
                    size={ModalSize.Small}
                    variant={ModalVariant.Default}
                    onClose={() => setIsSettingsOpen(false)}>
                    <DashSettingsForm settings={props.settings} onUpdate={HandleUpdateSettings} onClose={() => setIsSettingsOpen(false)} />
                </Modal>
            }
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