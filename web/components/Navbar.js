'use client';

import styles from '../styles/components/Navbar.module.css';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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

const Navbar = (props) => {
    //Navbar logic
    const [navOpen, setOpen] = useState('close');

    //context
    const handleClick = () => {
        if (navOpen === 'close') {
            setOpen('open');
        } else {
            setOpen('close');
        }
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

    return (
        <div>
            <nav className={`${styles[navOpen]} ${styles['main-nav']}`}>
                <ul>
                    <li>
                        <Link href='/' onClick={() => handleClick()}>
                            HOME
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => handleClick()} href='/photos'>
                            PHOTOS
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => handleClick()} href='/music'>
                            MUSIC
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => handleClick()} href='/blog'>
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
            ></button>
            <div className={styles.framebox}></div>
            <div
                className={`${styles.shifter} ${
                    navOpen === 'open' ? styles.low : null
                }`}
            >
                {React.cloneElement(props.children, {
                    navOpen: navOpen,
                })}
            </div>
        </div>
    );
};

export default Navbar;
