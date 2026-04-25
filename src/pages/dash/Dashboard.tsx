import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { dashesApi } from "api/dashes.api";
import { useToast } from "hooks/useToast";
import type { Block, Dash } from "types/dash";

import { Page } from "components/page/Page";
import { Toolbox } from "components/dashboard/toolbox/Toolbox";
import { Title } from "components/dashboard/title/Title";
import { Controls } from "components/dashboard/controls/Controls";
import { Grid } from "components/grid-elements/grid/Grid";

const defaultDash = {
    id: '',
    name: '',
    updatedAt: '',
}

import "./dashboard.scss";

export const Dashboard = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const { id } = useParams();
    const [dash, setDash] = useState<Dash>(defaultDash);
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [isLocked, setIsLocked] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);

    const dashId = id as string;

    const fetch = async (id: string) => {
        try {
            const d = await dashesApi.getById(id);
            setDash(d.dash);
            setBlocks(d.blocks);
        } catch (e) {
            toast.error(e, "Dashboard");
            navigate("/");
        }
    }

    const handleNameUpdate = async (newName: string) => {
        await dashesApi.updateName(dashId, { name: newName });
        setDash({ ...dash, name: newName, updatedAt: new Date().toISOString() });
    }

    const handleDeleteDashboard = async () => {
        if (!dashId) return;

        setIsDeleting(true);
        await dashesApi.delete("test");
        setIsDeleting(false);
        navigate('/');
    }

    const handleAddBlock = () => {
        setBlocks(prev => [
            ...prev,
            {
                i: crypto.randomUUID(),
                x: 8,
                y: 0,
                w: 2,
                h: 3
            }
        ]);
    }

    const handleSave = async () => {
        await dashesApi.update(dashId, { name: dash.name, blocks });
    }

    useEffect(() => {
        if (!dashId) {
            toast.error("Dashboard not found.");
            navigate("/");
        }
        else {
            fetch(dashId);
        }
    }, [dashId]);

    return (
        <Page>
            <div className="dashboard">
                <div className="dashboard__header">
                    <div className="dashboard__title">
                        <Title title={dash.name} onTitleUpdate={handleNameUpdate} />
                    </div>
                    <div className="dashboard__settings">
                        <Controls name={dash.name} lastUpdatedAt={dash.updatedAt} isDirty={true} onSave={handleSave} isDeleting={isDeleting} onDelete={handleDeleteDashboard} />
                    </div>
                </div>
                <div className="dashboard__container">
                    <Grid className="dashboard__grid" isLocked={isLocked} layout={blocks} onLayoutChange={(b) => setBlocks(b)} />
                </div>
                <div className="dashboard__toolbox-container">
                    <Toolbox isLocked={isLocked} toggleLock={() => setIsLocked(!isLocked)} isDirty={true} onSave={handleSave} onAddBlock={handleAddBlock} />
                </div>
            </div>
        </Page>
    )
}