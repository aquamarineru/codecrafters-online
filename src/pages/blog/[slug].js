import React from 'react'
import { client } from '../../../lib/client'
import { BodyPost, Container, } from "@/components";

export default  function Post ({ post, locale }) {
    return (
        <div className='bg-dark bg-hero h-screen'>
            <Container className=''>
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