import React from 'react'
import { client, urlFor } from '../../../lib/client'
import { BodyPost, Container, } from "@/components";
import Link from "next/link";
import Head from 'next/head';
import { PiArrowLeftLight } from 'react-icons/pi';

const serializers = {
    types: {
        block: props => props.children.join('')
    }
};

function blockToPlainText(blockContent) {
    if (!blockContent || !Array.isArray(blockContent)) {
        return '';
    }

    return blockContent
        .map(block => {
            if (block._type === 'block') {
                return block.children
                    .map(child => child.text || '')
                    .join('');
            }
            return '';
        })
        .join('\n');
}

export default  function Post ({ post, locale }) {
    console.log('Fetched post data:', post);
    const localizedSeoTitle = post.seoTitle?.find(item => item._key === locale)?.value;
    const localizedSeoDescription = post.seoDescription && post.seoDescription[locale]
    ? blockToPlainText(post.seoDescription[locale])
    : null;
    const localizedSeoImage = post.seoImage && urlFor(post.seoImage.asset).url();
    return (
        <div className='bg-dark bg-hero h-full py-10 px-2 flex items-center' >
            <Head>
            <title>{localizedSeoTitle}</title>
            <meta name='og:title' content={localizedSeoTitle} />
            {localizedSeoDescription && <meta name="og:description" content={localizedSeoDescription} />}
            {localizedSeoDescription && <meta name="description" content={localizedSeoDescription} />}
            {localizedSeoImage && <meta name="og:image" content={localizedSeoImage} />}
            <meta property="og:type" content="website" />
        </Head>
            <Container className=''>
                <Link 
                href='/blog'
                className="flex items-center font-tag gap-3 hover:text-hover hover:transform pt-24 text-light" >
                    
                        <PiArrowLeftLight className="transition-all duration-400 ease-in-out hover:transform hover:translate-x-1 cursor-pointer" />
                                    Back
                    
                </Link>
                <BodyPost post={post} locale={locale} />
            </Container>
            
        </div>
    )
}

export async function getStaticPaths(){
    const query = `*[_type == "postMain"]{
        'slug': slug.current
    }`
    const posts = await client.fetch(query);
    const paths = posts.map((post) => ({
        params: { slug: String(post.slug) },
    }));
    return { paths, fallback: 'blocking' };
}
export async function getStaticProps({ params: { slug }, locale }) {
    try{
        const query = `*[_type == "postMain" && slug.current == $slug]{
            _id,
            seoTitle,
            seoDescription,
            seoImage,
            title,
            image,
            publishedAt,
            slug,
            readTime,
            body,
            language,
            tags[]->{
              _id,
              title,
            },
            author[]->{
              _id,
              name,
              image,
              bio
            }
          }`
        const [post] = await client.fetch(query, { slug });
        if (!post) {
            return {
                notFound: true
            };
        }
        return {
            props: { 
                post, 
                locale: locale
            },
            revalidate: 60,
        };

    }
    catch(err){
        console.log(err)
    }
}