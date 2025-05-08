"use client"; // Add this directive because the component uses hooks (useState, useEffect)

import styles from '../styles/components/Typewriter.module.css';
import React, { useState, useEffect } from 'react';

const Typewriter = ({ 
    messages,
    // Animation behavior 
    loop = false,  // Whether to loop through messages
    random = false, // Whether to randomize message selection
    startDelay = 0, // Delay in ms before starting animation
    typeSpeed = 200, // Typing speed in ms
    deleteSpeed = 50, // Deleting speed in ms
    delayAfterType = 2000, // Delay after typing a message
    delayAfterDelete = 500, // Delay after deleting a message
    cursorBlinking = true, // Whether the cursor blinks
    // Style customizations
    fontSize = null, // Font size override (e.g., '4.5rem', '32px')
    fontWeight = null, // Font weight override (e.g., 'lighter', 'bold', '400')
    textColor = null, // Text color override (e.g., '#333', 'rgb(51, 51, 51)')
    cursorColor = null, // Cursor color override (e.g., '#e0e0e0')
    cursorWidth = null, // Cursor width override (e.g., '0.02em', '2px')
    blinkSpeed = null, // Blink animation speed in seconds (e.g., 0.7)
    centered = true, // Whether to center-align the text
    className = '', // Additional CSS class for the container
    tag = 'h1', // HTML tag to use (e.g., 'h1', 'div', 'p')
}) => {
    const [currentMessage, setMessage] = useState(0);
    const [currentText, setText] = useState('');
    const [reverse, setReverse] = useState(false);
    const [started, setStarted] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);
    const [usedMessageIndices, setUsedMessageIndices] = useState(random ? [0] : []);

    // Get a random message index that hasn't been used recently
    const getRandomMessageIndex = () => {
        // If all messages have been used or there's only one message, reset the used indices
        if (usedMessageIndices.length >= messages.length - 1 || messages.length <= 1) {
            setUsedMessageIndices([]);
            // Return a new random index
            return Math.floor(Math.random() * messages.length);
        }
        
        // Generate a new index that hasn't been used recently
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * messages.length);
        } while (usedMessageIndices.includes(newIndex));
        
        // Update the used indices
        setUsedMessageIndices([...usedMessageIndices, newIndex]);
        return newIndex;
    };

    // Custom styles for the component
    const customStyles = {
        fontSize: fontSize || undefined,
        fontWeight: fontWeight || undefined,
        color: textColor || undefined,
        textAlign: centered ? 'center' : undefined,
        width: centered ? '100%' : undefined,
    };
    
    // Custom styles for the cursor
    const customCursorStyles = {
        borderLeftWidth: cursorWidth || undefined,
        borderLeftColor: cursorColor || undefined,
        animationDuration: blinkSpeed ? `${blinkSpeed}s` : undefined,
        // Hide the cursor completely when animation is complete and not looping
        display: (animationComplete && !loop) ? 'none' : undefined
    };

    useEffect(() => {
        // Handle start delay
        if (!started) {
            const startTimer = setTimeout(() => {
                setStarted(true);
                // If random is enabled, start with a random message
                if (random && currentMessage === 0) {
                    setMessage(getRandomMessageIndex());
                }
            }, startDelay);
            return () => clearTimeout(startTimer);
        }

        let timer;

        if (
            currentText === messages[currentMessage] &&
            !reverse
        ) {
            // Check if this is the last message and looping is disabled
            const isLastMessage = messages[currentMessage + 1] === undefined && !random;
            
            if (isLastMessage && !loop) {
                // Animation is complete, set the flag
                setAnimationComplete(true);
                return;
            } else {
                // Set animation as not complete when continuing
                setAnimationComplete(false);
                // Wait before deleting
                timer = setTimeout(() => {
                    setReverse(true);
                }, delayAfterType);
            }
        } else if (currentText === '' && reverse) {
            timer = setTimeout(() => {
                setReverse(false);
                // Choose the next message based on configuration
                let nextMessage;
                
                if (random) {
                    // Select a random message if random mode is enabled
                    nextMessage = getRandomMessageIndex();
                } else if (messages[currentMessage + 1] === undefined && loop) {
                    // If this is the last message and loop is enabled, go back to first message
                    nextMessage = 0;
                } else if (messages[currentMessage + 1] !== undefined) {
                    // Otherwise, just go to the next message in sequence
                    nextMessage = currentMessage + 1;
                } else {
                    // Stay on current message if we're at the end and not looping
                    nextMessage = currentMessage;
                }
                
                setMessage(nextMessage);
            }, delayAfterDelete);
        } else if (reverse) {
            timer = setTimeout(() => {
                setText(messages[currentMessage].substring(0, currentText.length - 1));
            }, deleteSpeed);
        } else if (currentText !== messages[currentMessage]) {
            timer = setTimeout(() => {
                setText(messages[currentMessage].substring(0, currentText.length + 1));
            }, typeSpeed);
        }
        
        return () => {
            clearTimeout(timer);
        };
    }, [currentMessage, currentText, reverse, messages, started, loop, random, startDelay, typeSpeed, deleteSpeed, delayAfterType, delayAfterDelete]);

    // Dynamically create element based on tag prop
    const TagName = tag;

    return (
        <TagName className={`${styles.title} ${centered ? styles.centered : ''} ${className}`} style={customStyles}>
            <div className={centered ? styles.typewriterContainer : undefined}>
                <span>{currentText}</span>
                {/* Only show cursor after start delay is over */}
                {started && (
                    <span 
                        className={`${styles.cursor} ${cursorBlinking ? styles.blinking : ''}`} 
                        style={customCursorStyles}
                    />
                )}
            </div>
        </TagName>
    );
};

export default Typewriter;