import Head from 'next/head';

import Header from '../components/Header';

const Photos = ({ navOpen }) => {
    return (
        <div>
            <Head>
                <title>Photos | Kulkarni Venugopal</title>
            </Head>
            <Header navOpen={navOpen} heading={'PHOTOS'} />;
        </div>
    );
};

export default Photos;
