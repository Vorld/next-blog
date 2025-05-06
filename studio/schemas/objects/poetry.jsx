import React from 'react';

export default {
    type: 'object',
    name: 'poetry',
    title: 'Poetry',
    fields: [
        {
            name: 'poem',
            type: 'text',
            description: 'Type your poem here.',
        },
    ],
    preview: {
        select: {
            body: 'poem',
        },
        component: ({ value }) => {
            return <span>{value.body}</span>;
        },
    },
};
