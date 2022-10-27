import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { Truncate } from 'tt-truncate';
import React, { PropsWithChildren, memo, useRef, ClipboardEvent } from 'react';

export interface TruncateProps {
    tailLength: number;
    className?: string;
    title?: string;
}

export const TruncateHiddenText: React.FC<PropsWithChildren<TruncateProps>> =
    memo(({ children, tailLength, className, title }) => {
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

        // Work only for copying from one element
        const onCopy = (event: ClipboardEvent<HTMLSpanElement>) => {
            const selection = document.getSelection();
            if (!selection) {
                return;
            }

            const [firstPart = ''] = selection.toString().split('\u200C');

            event.clipboardData.setData('text/plain', firstPart);
            event.preventDefault();
        };

        return (
            <span
                title={title}
                className={className}
                onCopy={onCopy}
                style={{
                    display: 'flex',
                    whiteSpace: 'nowrap',
                    lineHeight: '1.25',
                    height: '1.25em',
                }}
            >
                <span style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    {firstPart}
                    <span style={{ whiteSpace: 'pre' }} className={styles.span}>
                        {lastPart}
                    </span>
                </span>
                <span style={{ whiteSpace: 'pre' }}>&zwnj;{lastPart}</span>
            </span>
        );
    });

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
                <div className={styles.row}>
                    <div className={styles.cell}>
                        <strong>
                            Fast Variant (Without Whole String Search)
                        </strong>
                    </div>
                    <div className={styles.cell}>
                        <strong>
                            Fixed - Slow Variant (With Whole String Search)
                        </strong>
                    </div>
                </div>
                {[...Array(1)].map((_, index) => {
                    return (
                        <div key={index} className={styles.row}>
                            <div className={styles.cell}>
                                <Truncate
                                    tailLength={4}
                                    title={'JetBrains Title'}
                                >
                                    Whatever platform or language you work with,
                                    JetBrains has a development tool for you.
                                </Truncate>
                            </div>
                            <div className={styles.cell}>
                                <TruncateHiddenText
                                    tailLength={4}
                                    title={'JetBrains Title'}
                                >
                                    Whatever platform or language you work with,
                                    JetBrains has a development tool for you.
                                </TruncateHiddenText>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
