import { createClient } from '@sanity/client';

export default createClient({
    projectId: 'qjy3hvt5', // you can find this in sanity.json
    dataset: 'production',
    useCdn: true, // `false` if you want to ensure fresh data
    apiVersion: '2022-07-13',
});
