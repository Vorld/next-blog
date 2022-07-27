import React, { useEffect } from 'react';
import ViewSDKClient from '../../components/PDFViewer/ViewSDKClient';

const InLine = () => {
    useEffect(() => {
        const viewSDKClient = new ViewSDKClient();

        viewSDKClient.ready().then(() => {
            /* Invoke file preview */
            viewSDKClient.previewFile('pdf-div', {
                /* Pass the embed mode option here */
                embedMode: 'IN_LINE',
            });
        });
    }, []);

    return (
        <div className='in-line-container'>
            <div id='pdf-div' className='in-line-div' />
        </div>
    );
};

export default InLine;
