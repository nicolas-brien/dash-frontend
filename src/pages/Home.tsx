import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import { dashesApi } from "api/dashes.api";
import type { Dash } from "types/dash";

import { Page } from "components/page/Page";
import { DashList } from "components/dashes/dash-list/DashList";

export const Home = () => {
    const [dashes, setDashes] = useState<Dash[]>([]);

    const fetchDashes = async () => {
        setDashes(await dashesApi.list());
    }

    useEffect(() => {
        fetchDashes();
    },[]);

    return (
        <Page>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                <DashList dashes={dashes} />
                <Outlet />
            </div>
        </Page>
    );
};