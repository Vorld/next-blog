// React component for the header of the application
import styles from '../styles/components/Header.module.css';

import React from 'react';

const Header = ({ heading }) => {
    return (
        <div>
            <div
                className={`${styles['blog-header']} ${styles['blog-sticky']}`}
            >
                <h1 className={styles['blog-title']}>{heading}</h1>
            </div>

            <div className={styles['blog-header']}>
                <h1 className={styles['blog-title']}>{heading}</h1>
            </div>
        </div>
    );
};

export default Header;
