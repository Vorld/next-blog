"use client";

import styles from '../styles/components/Header.module.css';
import React from 'react';
import { useNav } from '../context/NavContext';

const Header = ({ heading }) => {
    const { navOpen } = useNav();
    
    return (
        <div>
            {/* Restored the className logic dependent on navOpen */}
            <div className={`${styles['header']} ${styles['sticky']} ${
                navOpen === 'open' ? styles.low : null
            }`}>
                <h1 className={styles['title']}>{heading}</h1>
            </div>

            <div className={styles['header']}>
                {/* <h1 className={styles['placeholder-title']}>{heading}</h1> */}
            </div>
        </div>
    );
};

export default Header;
