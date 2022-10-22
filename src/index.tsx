import React, { PropsWithChildren, memo } from 'react';

export interface TruncateProps {
    tailLength: number;
    className?: string;
    title?: string;
}

export const Truncate: React.FC<PropsWithChildren<TruncateProps>> = memo(
    ({ children, tailLength, className, title }) => {
        if (typeof children !== 'string') {
            return <></>;
        }

        const firstPart = children.slice(0, children.length - tailLength);
        const lastPart = children.slice(children.length - tailLength);

        return (
            <div
                title={title}
                className={className}
                style={{ display: 'flex', whiteSpace: 'nowrap' }}
            >
                <span style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    {firstPart}
                </span>
                {lastPart}
            </div>
        );
    }
);
