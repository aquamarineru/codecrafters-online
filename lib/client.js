import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const clientConfig = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
}
export const client = createClient({
    projectId: clientConfig.projectId,
    dataset: clientConfig.dataset,
    apiVersion: '2023-09-20',
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    useCdn: true,
    ignoreBrowserTokenWarning: true,
});

const builder = imageUrlBuilder(client)
export const urlFor = source => builder.image(source)