import { Outlet, useNavigate } from "react-router-dom";
import { Page } from "../../components/page/Page";
import Button from "../../components/button/Button";

export const Admin = () => {
    const navigate = useNavigate();

    return (
        <Page
            header={<h1>Admin</h1>}
            footer={"Whats up Cheeko"}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                <div>
                    <Button variant="link" onClick={() => navigate('/admin/networks')}>Networks</Button>
                    <p>Manage all networks here.</p>
                    <hr />
                    <Button variant="link" onClick={() => navigate('/admin/users')}>Users</Button>
                    <p>Manage all users here.</p>
                </div>
                <Outlet />
            </div>
        </Page>
    );
};