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
            image: 'images.1' 
        },
        prepare(selection) {
            const { images, image } = selection;
            
            // Count the number of properties in the images object
            const imageCount = images ? Object.keys(images).length : 0;
            
            return {
                title: `Gallery block of ${imageCount} images`,
                subtitle: image?.caption || 'No caption',
                media: image
            };
        },
    },
};
