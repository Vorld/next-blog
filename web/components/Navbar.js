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
    const [open, setOpen] = useState('close');

    //context
    const handleClick = () => {

        if (open === 'close') {
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
            <nav className={`${styles[open]} ${styles["main-nav"]}`}>
                <ul>
                    <li>
                        <Link href='/'>
                            <a onClick={() => handleClick()}>HOME</a>
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => handleClick()} href='/photos'>
                            <a onClick={() => handleClick()}>PHOTOS</a>
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => handleClick()} href='/music'>
                            <a onClick={() => handleClick()}>MUSIC</a>
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => handleClick()} href='/blog'>
                            <a onClick={() => handleClick()}>BLOG</a>
                        </Link>
                    </li>
                </ul>
            </nav>
            <button
                onClick={() => handleClick()}
                className={`${styles["menu-button"]}  ${!visible && open === 'close' ? styles["menu-button-hide"] : null
                    }`}
            ></button>
            <div className={styles.framebox}></div>
            <div className={`${styles.shifter} ${open === 'open' ? styles.low : null}`}>{props.children}</div>

        </div>
    );
};

export default Navbar;
