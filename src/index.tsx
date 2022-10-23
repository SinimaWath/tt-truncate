import React, { PropsWithChildren, memo } from 'react';

export interface TruncateProps {
    tailLength: number;
    className?: string;
    title?: string;
}

export const Truncate: React.FC<PropsWithChildren<TruncateProps>> = memo(
    ({ children, tailLength, className, title }) => {
        if (typeof children !== 'string') {
            return null;
        }

        /**
         * Optimize, 2 corner cases in which the string is cut only at the end.
         */
        if (tailLength <= 0 || tailLength >= children.length) {
            return (
                <div
                    title={title}
                    className={className}
                    style={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {children}
                </div>
            );
        }

        const firstPart = children.slice(0, children.length - tailLength);
        const lastPart = children.slice(children.length - tailLength);

        return (
            <span
                title={title}
                className={className}
                onCopy={(event) => {
                    const selection = document.getSelection();
                    if (!selection) {
                        return;
                    }

                    const clearedSelection = selection
                        .toString()
                        .replaceAll('\n', '')
                        .replaceAll('\xa0', ' ');

                    event.clipboardData.setData('text/plain', clearedSelection);
                    event.preventDefault();
                }}
                style={{ display: 'flex', whiteSpace: 'nowrap' }}
            >
                <span style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    {firstPart.endsWith(' ')
                        ? firstPart.trimEnd() + '\xa0'
                        : firstPart}
                </span>
                {lastPart.startsWith(' ')
                    ? '\xa0' + lastPart.trimStart()
                    : lastPart}
            </span>
        );
    }
);

