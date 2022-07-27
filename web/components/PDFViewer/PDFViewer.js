import React, { useEffect } from 'react';
import ViewSDKClient from '../../components/PDFViewer/ViewSDKClient';
import Script from 'next/script';
import styles from '../../styles/components/PDFViewer.module.css';

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
    }, []);

    return (
        <div>
            <Script src='https://documentcloud.adobe.com/view-sdk/main.js'></Script>
            <div id={id} className={styles.pdfViewer} />
        </div>
    );
};

export default PDFViewer;
