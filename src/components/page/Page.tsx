import React from 'react';

import './page.scss';

interface PageProps {
    header?: React.ReactNode;
    footer?: React.ReactNode;
    children: React.ReactNode;
}

export const Page: React.FC<PageProps> = ({
    header,
    footer,
    children
}) => {
    return (
        <section className="page">
            {header && <header className="page__header">{header}</header>}

            <main className="page__content">
                <div className="page__inner">{children}</div>
            </main>

            {footer && <footer className="page__footer">{footer}</footer>}
        </section>
    );
};
