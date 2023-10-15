import React from 'react'
import { client, urlFor } from '../../../lib/client'
import { Container, Breadcrumb, ProjectBody } from "@/components";
import Link from "next/link";
import Head from 'next/head';
import Image from "next/image";
import { PiArrowLeftLight } from 'react-icons/pi';
import { RiArrowRightUpLine } from 'react-icons/ri';

export default function ProjectPage({ item, locale}) {

    const localizedBtn = item.button.find(item => item._key === locale)?.value;
    const localizedTitle = item.title.find(item => item._key === locale)?.value;
    const paths = ['projects' ,localizedTitle]
    return (
        <div  className='bg-dark bg-hero h-full py-10 px-2 text-light'>
            <Head> 
                <title> {localizedTitle} | CodeCrafters </title>
            </Head>
            <Breadcrumb paths={paths} />
            <Container className=' pt-10 md:pt-24 h-full' style={{background: 'radial-gradient(circle at center, rgb(52, 35, 89) 0%, rgba(15, 25, 38, 0) 70%)'}}>
                <Link href='/projects' >
                    <button 
                    role='button'
                    aria-label='back button'
                    className="flex items-center font-tag gap-3 before-element pt-10">
                    <PiArrowLeftLight className="transition-all duration-400 ease-in-out hover:transform hover:translate-x-1 cursor-pointer" />
                    {localizedBtn}
                    </button>
                </Link>
                <div className='flex flex-col items-center pt-5'>
                    <Image
                    key={item._id}
                    src={urlFor(item.image).url()}
                    width={700}
                    height={600}
                    alt='project image'
                    className='opacity-50 transition-opacity duration-500 hover:opacity-100 object-cover shadow-custom rounded md:w-[600px]'
                    />
                    <div className="flex flex-col pt-5 gap-10 md:w-[50%] ">
                        <h1 className="uppercase font-h1 text-xl md:text-3xl text-center  font-black  text-gray/70" >{localizedTitle} </h1>
                        <div className='flex flex-row justify-between lg:justify-around items-start gap-2'>
                            <div className="flex flex-col grid-row-2 grid-col-1 gap-2">
                                <p className="mb-2 font-bold text-gray text-base md:text-lg text-opacity-50"> Technologies:</p>
                                <div className='flex flex-col md:flex-row gap-3 items-center'>
                                {
                                    item.tags?.map(tag => (
                                        <span key={tag._id} className="rounded-md border-[1px] border-light uppercase border-opacity-20 bg-glass px-2 py-1 font-tag text-xs md:text-sm"> 
                                        {tag.title}
                                        </span>
                                    ))
                                }
                                </div>
                            </div>
                            <div>
                                <p className="mb-2 font-bold text-gray text-base text-center md:text-lg text-opacity-50 pb-2"> Link:</p>
                                <div>
                                    {
                                        item.link ? (
                                            <Link href={item.link} target="_blank" rel="noopener noreferrer" className="underline decoration-dotted text-light hover:text-hover text-xs md:text-sm">
                                                Link to Website 
                                                <RiArrowRightUpLine className="inline-block ml-1 transition-all duration-400 ease-in-out hover:transform hover:translate-x-1 cursor-pointer" />
                                            </Link>
                                        ) : null
                                        
                                    }
                                </div>
                            </div>

                        </div>
                        

                        
                    </div>
                </div>
                <ProjectBody item={item} locale={locale} />
                
            </Container>
            
        </div>
    )
}

export async function getStaticPaths(){
    const query = `*[_type == "projectItem"]{
        'slug': slug.current
    }`
    const itemData = await client.fetch(query);
    const paths = itemData.map((item) => ({
        params: { slug: String(item.slug) },
    }));
    return { paths, fallback: 'blocking' };
}
export async function getStaticProps({ params: { slug }, locale }) {
    try {
        const query = `*[_type == "projectItem" && slug.current == $slug]{
            _id,
            button,
            title,
            image,
            description,
            tags[]->{
                _id,
                title,
            },
            link,
            body,
            language,

        }`
        const [item] = await client.fetch(query, { slug });
        return{
            props: {
                item,
                locale,
            },
        }

    }catch(error) {
        console.log(error)
    }
}