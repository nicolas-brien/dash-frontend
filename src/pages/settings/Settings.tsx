import { Outlet, useNavigate } from "react-router-dom";
import VerticalDivider from "../../components/layout/VerticalDivider";
import Button from "../../components/button/Button";

export const Settings = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Button variant="link" onClick={() => navigate('/settings/user')}>My account</Button>
                <VerticalDivider />
                <Button variant="link" onClick={() => navigate('/settings/network')}>My network</Button>
            </div>
            <hr />
            <Outlet />
        </div>
    );
};