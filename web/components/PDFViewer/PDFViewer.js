"use client"; // Add this directive because the component uses useEffect and interacts with the DOM

import React, { useEffect } from 'react';
import ViewSDKClient from './ViewSDKClient'; // Adjusted import path
import Script from 'next/script';
import styles from '../../styles/components/PDFViewer.module.css'; // Corrected path

const PDFViewer = ({ url, id }) => {
    useEffect(() => {
        const viewSDKClient = new ViewSDKClient();

        viewSDKClient.ready().then(() => {
            /* Invoke file preview */
            viewSDKClient.previewFile(url, id, {
                /* Pass the embed mode option here */
                embedMode: 'SIZED_CONTAINER',
            });
        });
    }, [url, id]);

    return (
        <div>
            {/* Script component needs to be handled carefully in App Router, ensure it loads correctly */}
            <Script src='https://documentcloud.adobe.com/view-sdk/main.js' strategy="lazyOnload"></Script>
            <div id={id} className={styles.pdfViewer} />
        </div>
    );
};

export default PDFViewer;
