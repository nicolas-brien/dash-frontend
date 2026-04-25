import type { Dash } from "types/dash";
import { DashNav } from "../dash-nav/DashNav";
import { NewDash } from "../new-dash/NewDash";

import "./dash-list.scss";

interface DashListProps {
    dashes: Dash[];
}

export const DashList = ({ dashes }: DashListProps) => {
    return (
        <div className="dash-list">
            <NewDash />
            {dashes.map((d) => {
                return (
                    <DashNav key={d.id} dashId={d.id} dashName={d.name} />
                )
            })}
        </div>
    );
}