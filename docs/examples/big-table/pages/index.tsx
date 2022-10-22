import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { Truncate } from 'truncate';

import React, {
    PropsWithChildren,
    useState,
    memo,
    useRef,
    useLayoutEffect,
} from 'react';

interface Props {
    tailLength: number;
    className?: string;
    title?: string;
}

// To check
const TruncateResize: React.FC<PropsWithChildren<Props>> = memo(
    ({ children, tailLength, className, title }) => {
        const elementRef = useRef<HTMLSpanElement | null>(null);

        useLayoutEffect(() => {
            if (!elementRef.current || typeof children !== 'string') {
                return;
            }

            const observer = new ResizeObserver((entries) => {
                elementRef.current!.textContent = children + Date.now();
            });

            observer.observe(elementRef.current);

            elementRef.current.textContent = children;
            return () => {
                observer.disconnect();
            };
        }, []);

        return (
            <span
                className={className}
                ref={elementRef}
                style={{ display: 'flex' }}
            ></span>
        );
    }
);

TruncateResize.displayName = 'TruncateResize';

const Home: NextPage = () => {
    const [_, setState] = useState(0);
    return (
        <div>
            <button onClick={() => setState(Date.now())}>Rerender</button>
            <div className={styles.table}>
                {[...Array(2000)].map((_, index) => {
                    return (
                        <div key={index} className={styles.row}>
                            <div className={styles.cell}>
                                <Truncate tailLength={4} title={'title'}>
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
