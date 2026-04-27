import ReactGridLayout, { useContainerWidth } from 'react-grid-layout';
import classNames from 'classnames';

import { Block } from "../block/Block";

import "node-modules/react-grid-layout/css/styles.css";
import "node-modules/react-resizable/css/styles.css";

import "./grid.scss";

interface GridProps {
    className?: string,
    isLocked: boolean,
    layout: any[],
    items?: number,
    rowHeight?: number,
    cols?: number,
    displayGrid?: boolean,
    onLayoutChange: (newLayout: any) => void
}

const exampleLayout = [
    { i: 'a', x: 8, y: 0, w: 2, h: 3 },
    { i: 'b', x: 10, y: 0, w: 2, h: 4 },
    { i: 'c', x: 4, y: 0, w: 2, h: 2 },
    { i: 'd', x: 6, y: 0, w: 2, h: 2 },
    { i: 'e', x: 10, y: 4, w: 2, h: 2 },
    { i: 'f', x: 0, y: 0, w: 1, h: 2 },
    { i: 'g', x: 4, y: 2, w: 2, h: 4 },
    { i: 'h', x: 4, y: 6, w: 2, h: 4 },
    { i: 'i', x: 6, y: 2, w: 2, h: 3 },
    { i: 'j', x: 4, y: 10, w: 2, h: 5 },
    { i: 'k', x: 10, y: 6, w: 2, h: 2 },
    { i: 'l', x: 10, y: 8, w: 2, h: 5 },
    { i: 'm', x: 6, y: 5, w: 2, h: 4 },
    { i: 'n', x: 10, y: 13, w: 2, h: 4 },
    { i: 'o', x: 4, y: 15, w: 2, h: 3 },
    { i: 'p', x: 3, y: 0, w: 1, h: 2 },
    { i: 'q', x: 4, y: 18, w: 2, h: 4 },
    { i: 'r', x: 4, y: 22, w: 2, h: 4 },
    { i: 's', x: 2, y: 6, w: 2, h: 5 },
    { i: 't', x: 4, y: 26, w: 2, h: 3 },
    { i: 'u', x: 0, y: 2, w: 2, h: 5 },
    { i: 'v', x: 2, y: 2, w: 2, h: 4 },
    { i: 'w', x: 6, y: 9, w: 2, h: 3 },
    { i: 'x', x: 0, y: 7, w: 2, h: 5 },
    { i: 'y', x: 6, y: 12, w: 2, h: 5 }
];

export const Grid = (props: GridProps) => {
    const { width, containerRef, mounted } = useContainerWidth();

    const renderBlocks = () => {
        return (
            props.layout.map((b) => <div key={b.i}><Block Id={b.i} Text={b.i} isLocked={props.isLocked} /></div>)
        )
    }

    const handleLayoutChange = (newLayout: any) => {
        props.onLayoutChange(newLayout);
    }

    const classes = classNames("grid",
                    [`grid--${props.cols}`],
                    {
                        "grid--bordered": props.displayGrid,
                    },
                    props.className);

    return (
        <div className={classes} ref={containerRef} style={{ "--cols": props.cols, "--row-height": `${props.rowHeight}px` } as React.CSSProperties}>
            {mounted &&
                <ReactGridLayout
                    width={width}
                    layout={props.layout}
                    gridConfig={{ cols: props.cols, rowHeight: props.rowHeight }}
                    onLayoutChange={handleLayoutChange}
                    dragConfig={{enabled: !props.isLocked}}
                    resizeConfig={{enabled: !props.isLocked}}
                >
                    {renderBlocks()}
                </ReactGridLayout>
            }
        </div>
    );
}