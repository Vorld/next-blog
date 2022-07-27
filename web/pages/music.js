import Head from 'next/head';

import Header from '../components/Header';

const Music = ({ navOpen }) => {
    return (
        <div>
            <Head>
                <title>Music | Kulkarni Venugopal</title>
            </Head>
            <Header navOpen={navOpen} heading={'MUSIC'} />
        </div>
    );
};

export default Music;
