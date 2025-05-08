"use client"; // Add this directive because the component uses hooks (useState, useEffect) and event handlers (onClick)

import styles from '../styles/components/Navbar.module.css';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { NavProvider, useNav } from '../context/NavContext';

//debouncing function for scroll
const debounce = (func, wait, immediate) => {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

// Internal component that uses the nav context
const NavbarContent = (props) => {
    const { navOpen, setNavOpen } = useNav();
    const [hydrated, setHydrated] = useState(false);
    
    // Handle hydration to prevent UI mismatch between server and client
    useEffect(() => {
        setHydrated(true);
    }, []);
    
    //context
    const handleClick = () => {
        setNavOpen(navOpen === 'close' ? 'open' : 'close');
    };

    // hide button on scroll
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const handleScroll = debounce(() => {
        const currentScrollPos = window.pageYOffset;

        setVisible(
            (prevScrollPos > currentScrollPos &&
                prevScrollPos - currentScrollPos > 30) ||
                currentScrollPos < 10
        );

        setPrevScrollPos(currentScrollPos);
    }, 50);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos, visible, handleScroll]);

    // Only apply shifter class after hydration to avoid mobile Chrome issue
    const shifterClassName = `${styles.shifter} ${
        navOpen === 'open' ? styles.low : ''
    } ${!hydrated ? styles.preHydration : ''}`;

    return (
        <div>
            <nav className={`${styles[navOpen]} ${styles['main-nav']}`}>
                <ul>
                    <li>
                        <Link href='/' onClick={() => handleClick()} className={styles['nav-link']}>
                            HOME
                        </Link>
                    </li>
                    <li>
                        <Link href='/photos' onClick={() => handleClick()} className={styles['nav-link']}>
                            PHOTOS
                        </Link>
                    </li>
                    {/* <li>
                        <Link href='/music' onClick={() => handleClick()} className={styles['nav-link']}>
                            MUSIC
                        </Link>
                    </li> */}
                    <li>
                        <Link href='/blog' onClick={() => handleClick()} className={styles['nav-link']}>
                            BLOG
                        </Link>
                    </li>
                </ul>
            </nav>
            <button
                onClick={() => handleClick()}
                className={`${styles['menu-button']}  ${
                    !visible && navOpen === 'close'
                        ? styles['menu-button-hide']
                        : null
                }`}
            >
                <div className={styles['animated-squares']}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>
            <div className={styles.framebox}></div>
            <div className={shifterClassName}>
                {props.children}
            </div>
        </div>
    );
};

// Main Navbar component that wraps the content with the NavProvider
const Navbar = (props) => {
    return (
        <NavProvider>
            <NavbarContent {...props} />
        </NavProvider>
    );
};

export default Navbar;
