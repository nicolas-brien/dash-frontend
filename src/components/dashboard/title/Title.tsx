import { useState } from "react";

import Button from "components/button/Button";
import { Input } from "components/input/Input";

import Pencil from "svg/pencil.svg?react";
import Check from "svg/check.svg?react";

import "./title.scss";

interface TitleProps {
    title: string,
    onTitleUpdate: (newTitle: string) => void
}

export const Title = (props: TitleProps) => {
    const [newTitle, setNewTitle] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    
    const handleTitleEdit = () => {
        setNewTitle(props.title);
        setIsEditing(true);
    }

    const handleTitleUpdate = async () => {
        if (!newTitle || newTitle === props.title) {
            setIsEditing(false);
            return;
        }

        await props.onTitleUpdate(newTitle);
        setIsEditing(false);
    }

    return (
        <div className="title">
            {
                isEditing ?
                    <Input id="dashboard-name" value={newTitle} onChange={setNewTitle} />
                    :
                    <h1>{props.title}</h1>
            }
            {
                isEditing ?
                    <Button id="dashboard-edit" onClick={handleTitleUpdate} icon={<Check />} variant="primary" />
                    :
                    <Button id="dashboard-edit" onClick={handleTitleEdit} icon={<Pencil />} variant="primary" />
            }
        </div>
    );
}