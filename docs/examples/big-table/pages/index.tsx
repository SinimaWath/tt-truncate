import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { Truncate } from 'tt-truncate';

import React, { useRef } from 'react';

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
                                    Whatever platform or language you work with,
                                    JetBrains has a development tool for you.
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
