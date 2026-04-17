import classNames from "classnames";

import "./block.scss";

interface BlockProps {
    Id: string,
    Text: string,
    isLocked: boolean
}

export const Block = ({ Id, Text, isLocked, ...props }: BlockProps) => {
    return (
        <div {...props} id={Id} className={classNames("block", {"block--locked": isLocked})}>
            {Text}
        </div>
    )
};