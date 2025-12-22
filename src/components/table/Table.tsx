import React, { useMemo, useState } from 'react';

import './table.scss';

export type Column<T> = {
    key: string;
    header: string;
    render?: (row: T) => React.ReactNode;
};

interface TableProps<T> {
    columns: Column<T>[];
    rows: T[];
    pageSize?: number;
}

const Table = <T,>({
    columns,
    rows,
    pageSize = 10,
}: TableProps<T>) => {
    const [page, setPage] = useState(1);

    const pageCount = Math.ceil(rows.length / pageSize);

    const pagedRows = useMemo(() => {
        const start = (page - 1) * pageSize;
        return rows.slice(start, start + pageSize);
    }, [rows, page, pageSize]);

    return (
        <div className="table">
            <table className="table__table">
                <thead className="table__head">
                    <tr className="table__row table__row--head">
                        {columns.map(col => (
                            <th key={String(col.key)} className="table__cell table__cell--head">
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="table__body">
                    {pagedRows.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={`table__row ${rowIndex % 2 === 0
                                    ? 'table__row--even'
                                    : 'table__row--odd'
                                }`}
                        >
                            {columns.map(col => (
                                <td
                                    key={String(col.key)}
                                    className="table__cell"
                                >
                                    {col.render
                                        ? col.render(row)
                                        : String(row[col.key])}
                                </td>
                            ))}
                        </tr>
                    ))}

                    {pagedRows.length === 0 && (
                        <tr className="table__row">
                            <td
                                className="table__cell table__cell--empty"
                                colSpan={columns.length}
                            >
                                No data
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {pageCount > 1 && (
                <div className="table__pagination">
                    <button
                        className="table__page-btn"
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                    >
                        Prev
                    </button>

                    <span className="table__page-info">
                        Page {page} / {pageCount}
                    </span>

                    <button
                        className="table__page-btn"
                        disabled={page === pageCount}
                        onClick={() => setPage(p => p + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Table;
