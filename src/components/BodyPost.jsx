import React from 'react';
import { Container, Article, ContactForm, Breadcrumb } from "."
import { format } from 'date-fns'
import Image from "next/image"
import { urlFor } from "../../lib/client" 
import BlockContent from '@sanity/block-content-to-react';

const serializers = {
    types: {
        mainImage: (props) => (
            <div className="">
              <Image
                src={props.node.asset.url}
                alt={props.node.alt}
                className=" h-auto rounded shadow my-10 "
                width={1000}
                height={800}
              />
            </div>
          ),
        block: (props) => {
            switch (props.node.style) {
                case 'h2':
                    return <h2 className=" text-xl md:text-3xl font-semibold font-h1 mb-5 text-center text-light/80">{props.children}</h2>;
                case 'h3':
                    return <h3 className="text-light text-2xl font-medium mb-4">{props.children}</h3>;
                case 'paragraph':
                    return <p className="text-sm text-light md:text-base font-light mb-4">{props.children}</p>;
                case 'bullet':
                    return <ul className="text-light list-disc pl-6 mb-4 font-light text-sm md:text-base"><li className="mb-2">{props.children}</li></ul>;
                case 'number':
                    return <o className="text-light list-decimal pl-6 mb-4 font-light"><li className="mb-2">{props.children}</li></o>;
                default:
                    return <p className="text-light text-sm md:text-base font-light mb-4">{props.children}</p>;
            }
        },
        listItem: (props) => <li className="mb-2">{props.children}</li>,
    },
};


export default function BodyPost({ post, locale, contactData }){
    const date = format(new Date(post.publishedAt), 'dd MMM yyyy');
    const localizedTitle = post.title?.find(entry => entry._key === locale)?.value;
    const localizedReadingTime = post.readTime?.find(entry => entry._key === locale)?.value;
    const paths = [ 'blog', localizedTitle ]

    return(
        <div className="pt-10 w-full px-2 md:w-[500px] md:px-3 lg:w-[700px] ">
            <Breadcrumb paths={paths} />
            <h2 className='font-h1 text-xl font-black text-gray md:text-3xl'>{localizedTitle} </h2>
            <div className="pt-5 md:pt-10 w-full grid md:grid-cols-2 grid-rows-2 gap-2 md:gap-10 font-tag text-light">
                <div 
                className="flex flex-col grid-row-1 grid-col-1"> 
                    <p 
                    className="mb-2 font-bold text-gray text-base md:text-lg text-opacity-50 ">
                    Published on: 
                    </p>
                    {date} 
                    
                </div>
                <div 
                className="flex flex-col grid-row-1 grid-col-2">
                    <p className="mb-2 font-bold text-gray text-base md:text-lg text-opacity-50">
                        Reading Time:
                    </p>
                    {localizedReadingTime}
                </div>
                <div className="flex flex-col grid-row-2 grid-col-1 gap-2">
                    <p className="mb-2 font-bold text-gray text-base md:text-lg text-opacity-50">Tags: </p>
                    <div className='flex flex-wrap gap-2'>
                    {post.tags?.map(tag => (
                        <span key={tag._id} className="rounded-md border-[1px] border-light uppercase border-opacity-20 bg-glass px-2 py-1 font-tag text-sm md:text-base"> 
                        {tag.title}
                        </span>
                    ))} 
                    </div>
                </div>
                <div className="flex flex-col grid-row-2 grid-col-2 gap-2">
                    <p className="mb-2 font-bold text-gray text-base md:text-lg text-opacity-50">Author: </p>
                        {post.author && post.author.length > 0 && (
                            <div className='flex gap-4 items-center'>
                                <Image 
                                    src={urlFor(post.author[0].image).url()}
                                    alt={post.author[0].image.alt}
                                    width={60}
                                    height={60}
                                    className='rounded-full'
                                />
                                <span className='ml-2 font-tag text-sm md:text-base'>{post.author[0].name}</span>
                            </div>
                        )}
                </div>
            </div> 
            <div className="pt-10">
                <BlockContent 
                    blocks={post.body[locale]}
                    imageOptions={{ w: 1000, h: 800, fit: 'max',  }}
                    serializers={serializers}
                    projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                    dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                    className='w-full px-2  text-light'
                />
            </div>
        </div>
    )
}