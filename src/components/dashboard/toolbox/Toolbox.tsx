import Button from "components/button/Button";

import Lock from "svg/lock.svg?react";
import Unlock from "svg/unlock.svg?react";
import Plus from "svg/plus.svg?react";

import "./toolbox.scss";

interface ToolboxProps {
    isLocked: boolean,
    toggleLock: () => void,
    isDirty: boolean,
    onSave: () => void,
    onAddBlock: () => void
}

export const Toolbox = (props: ToolboxProps) => {
    return (
        <div className="toolbox">
            <Button id="dashboard-lock" onClick={props.toggleLock} icon={props.isLocked ? <Lock /> : <Unlock />} variant={props.isLocked ? "primary" : "secondary" } />
            <Button id="dashboard-controls-add" onClick={props.onAddBlock} icon={<Plus />} variant="secondary" disabled={props.isLocked} />
        </div>
    );
}