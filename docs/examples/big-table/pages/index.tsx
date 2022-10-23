import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';

import React, { memo, PropsWithChildren, useRef } from 'react';

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

const Home: NextPage = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    return (
        <div className={styles.root}>
            <h1>Table with 4000 Truncate components</h1>
            <button
                onClick={() => {
                    const parent = ref.current!.parentElement;
                    setTimeout(() => {
                        ref.current!.remove();
                    }, 0);

                    setTimeout(() => {
                        parent!.append(ref.current!);
                    }, 10);
                }}
            >
                Rerender (remove and append)
            </button>
            <button
                onClick={() => {
                    const width = ref.current!.style.width;
                    if (width === '500px') {
                        ref.current!.style.width = 'initial';
                    } else {
                        ref.current!.style.width = '500px';
                    }
                }}
            >
                Toggle fixed 500px
            </button>
            <p>- Resize your browser or click Toggle fixed 500px</p>
            <p>- Hover first column text to see hover title</p>
            <div className={styles.table} ref={ref}>
                {[...Array(2000)].map((_, index) => {
                    return (
                        <div key={index} className={styles.row}>
                            <div className={styles.cell}>
                                <Truncate
                                    tailLength={5}
                                    title={'JetBrains Title'}
                                >
                                    {`
                                    
                                    Whatever platform or language you work with,
                                    JetBrains
                                    has 
                                    a development tool for  you.`}
                                </Truncate>
                            </div>
                            <div className={styles.cell}>
                                <Truncate tailLength={12}>
                                    However big or small your team is, our
                                    products will ensure that it always has a
                                    smooth and enjoyable experience when
                                    building your code, planning your work,
                                    collaborating
                                </Truncate>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
