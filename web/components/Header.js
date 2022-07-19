// React component for the header of the application
import styles from '../styles/components/Header.module.css';

import React from 'react';

const Header = ({ heading, navOpen }) => {
    return (
        <div>
            <div
                className={`${styles['header']} ${styles['sticky']} ${
                    navOpen === 'open' ? styles.low : null
                }`}
            >
                <h1 className={styles['title']}>{heading}</h1>
            </div>

            <div className={styles['header']}>
                {/* <h1 className={styles['placeholder-title']}>{heading}</h1> */}
            </div>
        </div>
    );
};

export default Header;
