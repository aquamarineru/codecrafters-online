import React from 'react'
import { client } from '../../../lib/client'
import { BodyPost, Container, ContactUs } from "@/components";
import Link from "next/link";
import Head from 'next/head';
import { PiArrowLeftLight } from 'react-icons/pi';

export default  function Post ({ post, locale }) {
    return (
        <div className='bg-dark bg-hero h-full py-10 px-2 flex items-center' >
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