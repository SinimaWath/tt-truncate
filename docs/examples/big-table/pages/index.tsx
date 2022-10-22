import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { Truncate } from 'tt-truncate';

import React, { useState, useRef } from 'react';

const Home: NextPage = () => {
    const [_, setState] = useState(0);
    const ref = useRef<HTMLDivElement | null>(null);
    return (
        <div className={styles.root}>
            <button onClick={() => setState(Date.now())}>Rerender</button>
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
            <div className={styles.table} ref={ref}>
                {[...Array(2000)].map((_, index) => {
                    return (
                        <div key={index} className={styles.row}>
                            <div className={styles.cell}>
                                <Truncate tailLength={0} title={'title'}>
                                    asdsadkmsaldksamdlksadmsalkdmaslkdmasldkamsdlkasmdlaskdmaslkdmasldkasmdlksadm
                                </Truncate>
                            </div>
                            <div className={styles.cell}>
                                <Truncate tailLength={10}>
                                    asdsadkmsaldksamdlksadmsalkdmaslkdmasldkamsdlkasmdlaskdmaslkdmasldkasmdlksadm
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
