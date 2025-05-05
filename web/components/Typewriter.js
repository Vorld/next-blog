"use client"; // Add this directive because the component uses hooks (useState, useEffect)

import styles from '../styles/components/Typewriter.module.css';

import React, { useState, useEffect } from 'react';

const Typewriter = ({ messages }) => {
    const [currentMessage, setMessage] = useState(0);
    const [currentText, setText] = useState('');
    const [reverse, setReverse] = useState(false);

    useEffect(() => {
        let timer;

        if (
            currentText === messages[currentMessage] &&
            !reverse &&
            messages[currentMessage + 1] !== undefined
        ) {
            timer = setTimeout(() => {
                setReverse(true);
            }, 2000);
        } else if (currentText === '' && reverse) {
            timer = setTimeout(() => {
                setReverse(false);
                setMessage(currentMessage + 1);
            }, 500);
        } else if (reverse) {
            timer = setTimeout(() => {
                setText(messages[currentMessage].substring(0, currentText.length - 1));
            }, 50);
        } else if (currentText !== messages[currentMessage]) {
            timer = setTimeout(() => {
                setText(messages[currentMessage].substring(0, currentText.length + 1));
            }, 200);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [currentMessage, currentText, reverse, messages]);

    return (
        <h1 className={styles.title}>
            <span>{currentText}</span>
            <span className={styles.cursor} />
        </h1>
    );
};

export default Typewriter;