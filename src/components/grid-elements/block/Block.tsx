import "./block.scss";

interface BlockProps {
    Id: string,
    Text: string
}

export const Block = ({ Id, Text, ...props }: BlockProps) => {
    return (
        <div {...props} id={Id} className="block">
            {Text}
        </div>
    )
};