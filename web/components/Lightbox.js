'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import styles from '../styles/components/Lightbox.module.css';

const Lightbox = ({ images, initialIndex, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isLoading, setIsLoading] = useState(true);
    const [swipeDirection, setSwipeDirection] = useState(null); // 'left', 'right', or null
    const [isTransitioning, setIsTransitioning] = useState(false);
    
    // Touch swipe state
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const touchStartY = useRef(0);
    const touchEndY = useRef(0);
    const minSwipeDistance = 50; // Minimum distance required for a swipe
    const imageContainerRef = useRef(null);

    // --- Navigation ---
    const goToPrevious = useCallback(() => {
        if (isTransitioning) return;
        
        setSwipeDirection('right');
        setIsTransitioning(true);
        setIsLoading(true);
        
        // Small delay to allow animation to start
        setTimeout(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? images.length - 1 : prevIndex - 1
            );
        }, 150);
        
        // Reset transition states
        setTimeout(() => {
            setSwipeDirection(null);
            setIsTransitioning(false);
        }, 300);
    }, [images.length, isTransitioning]);

    const goToNext = useCallback(() => {
        if (isTransitioning) return;
        
        setSwipeDirection('left');
        setIsTransitioning(true);
        setIsLoading(true);
        
        // Small delay to allow animation to start
        setTimeout(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 150);
        
        // Reset transition states
        setTimeout(() => {
            setSwipeDirection(null);
            setIsTransitioning(false);
        }, 300);
    }, [images.length, isTransitioning]);

    // --- Touch Event Handlers ---
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
        if (isTransitioning) return;
        
        touchEndX.current = e.touches[0].clientX;
        touchEndY.current = e.touches[0].clientY;
        
        // Calculate swipe distance and direction for real-time feedback
        const horizontalDist = touchStartX.current - touchEndX.current;
        const verticalDist = Math.abs(touchStartY.current - touchEndY.current);
        
        // Only provide feedback if predominantly horizontal movement
        if (Math.abs(horizontalDist) > verticalDist && imageContainerRef.current) {
            // Move the image container slightly in the direction of the swipe (limited movement)
            const maxTranslate = 40; // Max pixels to translate
            const translate = Math.min(Math.abs(horizontalDist) / 3, maxTranslate) * (horizontalDist > 0 ? -1 : 1);
            imageContainerRef.current.style.transform = `translateX(${translate}px)`;
        }
    };

    const handleTouchEnd = () => {
        if (isTransitioning) return;
        
        // Reset any translation applied during touch move
        if (imageContainerRef.current) {
            imageContainerRef.current.style.transform = '';
        }
        
        // Calculate horizontal and vertical distance
        const horizontalDist = touchStartX.current - touchEndX.current;
        const verticalDist = Math.abs(touchStartY.current - touchEndY.current);
        
        // Only count as a swipe if horizontal movement is greater than vertical 
        // (to avoid triggering during scroll attempts) and greater than minimum distance
        if (Math.abs(horizontalDist) > verticalDist && Math.abs(horizontalDist) > minSwipeDistance) {
            if (horizontalDist > 0) {
                // Swiped left, go to next
                goToNext();
            } else {
                // Swiped right, go to previous
                goToPrevious();
            }
        }
    };

    // --- Keyboard Navigation ---
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowLeft') {
                goToPrevious();
            } else if (event.key === 'ArrowRight') {
                goToNext();
            } else if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [goToPrevious, goToNext, onClose]);

    // --- Prevent scrolling when lightbox is open ---
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    if (currentIndex === null || !images || !images[currentIndex]) {
        return null; // Don't render if index is invalid or image data is missing
    }

    const currentImage = images[currentIndex];
    
    // Determine if we're on a mobile device
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    // Get the original image dimensions if available
    const originalWidth = currentImage.dimensions?.width || 1200;
    const originalHeight = currentImage.dimensions?.height || 800;
    
    // Dynamic classes for animation
    const imageContainerClasses = `${styles.imageContainer} ${
        swipeDirection === 'left' ? styles.swipeLeft : 
        swipeDirection === 'right' ? styles.swipeRight : ''
    }`;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <button className={styles.closeButton} onClick={onClose}>&times;</button>
            
            <div 
                className={styles.modal} 
                onClick={(e) => e.stopPropagation()}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div 
                    ref={imageContainerRef}
                    className={imageContainerClasses}
                >
                    {isLoading && (
                        <div className={styles.imagePlaceholder} 
                             style={{ 
                                 aspectRatio: `${originalWidth}/${originalHeight}`
                             }}>
                            <div className={styles.loader}></div>
                        </div>
                    )}
                    <Image
                        src={currentImage.url}
                        alt={currentImage.alt || "Lightbox image"}
                        width={originalWidth}
                        height={originalHeight}
                        style={{ 
                            width: '100%',
                            height: 'auto',
                            maxHeight: '75vh',
                            objectFit: 'contain',
                            display: isLoading ? 'none' : 'block'
                        }}
                        quality={100}
                        priority={true}
                        onLoadingComplete={() => setIsLoading(false)}
                    />
                </div>

                {currentImage.caption && (
                    <div className={styles.caption}>{currentImage.caption}</div>
                )}

                {/* {isMobile && images.length > 1 && (
                    <div className={styles.swipeIndicator}>
                        <span className={styles.swipeDot}></span>
                    </div>
                )} */}

                {images.length > 1 && !isMobile && (
                    <>
                        <button className={`${styles.navButton} ${styles.prevButton}`} onClick={goToPrevious}>&#10094;</button>
                        <button className={`${styles.navButton} ${styles.nextButton}`} onClick={goToNext}>&#10095;</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Lightbox;