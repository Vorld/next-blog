export default {
    name: 'gallery',
    type: 'document',
    title: 'Gallery',
    fields: [
        {
            name: 'images',
            type: 'array',
            title: 'Images',
            of: [
                {
                    name: 'image',
                    type: 'image',
                    title: 'Image',
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: 'caption',
                            type: 'string',
                            title: 'Caption',
                        },
                    ],
                },
            ],
            options: {
                layout: 'grid',
            },
        },
    ],
    preview: {
        select: {
            images: 'images',
            image: 'images.0',
        },
        prepare(selection) {
            const { images, image } = selection;

            return {
                title: `Gallery block of ${Object.keys(images).length} images`,
                caption: `Caption: ${image.caption}`,
                media: image,
            };
        },
    },
};
