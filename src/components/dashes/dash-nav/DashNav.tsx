
import { useNavigate } from "react-router-dom";

import "./dash-nav.scss";

interface DashNavProps {
    dashId: string,
    dashName: string;
}

export const DashNav = ({ dashId, dashName }: DashNavProps) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/dashes/${dashId}`);
    }
    
    return (
        <div className="dash-nav" onClick={handleClick}>
            <h2>{dashName}</h2>
        </div>
    );
};
