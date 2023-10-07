import React from 'react'
import { Container, Button } from '.';
import Image from 'next/image';
import BlockContent from '@sanity/block-content-to-react';
import { urlFor, clientConfig } from '../../lib/client';
import { PiArrowRight } from "react-icons/pi";
import Link from 'next/link';
const serializers = {
    types: {
        mainImage: (props) => (
            <div className="">
                <Image
                    src={props.node.asset.url}
                    alt={props.node.alt}
                    className="w-full h-auto"
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
                    return <h3 className="text-2xl font-medium mb-4">{props.children}</h3>;
                case 'normal':
                    return <p className="text-sm md:text-base font-light mb-4">{props.children}</p>;
                case 'bullet':
                    return <ul className="list-disc pl-6 mb-4 font-light text-sm md:text-base"><li className="mb-2">{props.children}</li></ul>;
                case 'number':
                    return <ol className="list-decimal pl-6 mb-4 font-light"><li className="mb-2">{props.children}</li></ol>;
                default:
                    return <p className=" text-sm md:text-base font-light mb-4">{props.children}</p>;
            }
        },
        listItem: (props) => <li className="mb-2">{props.children}</li>,
    },
};


export default function ProjectDemo({ projectData, locale}) {
    return (
        <div className='w-full h-full py-10 px-3 md:py-24 bg-basic bg-hero text-light'>
            {Array.isArray(projectData) && projectData.map((projectItem) => {
                const localizedTitle = projectItem.title?.find(item => item._key === locale)?.value;  
                const localizedButton = projectItem.button?.find(item => item._key === locale)?.value;  
                return(
                    <div key={projectItem._id}>
                        <Container className='z-20 flex flex-col  items-center justify-center'>
                            <h2 className='uppercase font-h1 text-4xl text-center font-black md:text-6xl text-gray/60'>{localizedTitle} </h2>
                            <div className='pt-10 flex flex-col lg:flex-row items-center justify-around gap-10'>
                            <Image 
                            src={urlFor(projectItem.image).url()}
                            alt={projectItem.image.alt}
                            width={800}
                            height={500}
                            className='md:w-[70%] lg:w-1/2 h-auto rounded'
                            />
                            <div className='flex flex-col items-center lg:items-start '>
                                <BlockContent
                                blocks={projectItem.body[locale]}
                                serializers={serializers}
                                projectId={clientConfig.projectId}
                                dataset={clientConfig.dataset}
                                />
                                <Link href='/projects' className='z-20 text-dark'>
                                    <button className="md:inline-flex flex items-center justify-center rounded-md font-tag text-sm ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-4 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  bg-slate-100 text-slate-900 hover:bg-slate-100/80  h-10 py-4 md:py-6 md:px-4 md:text-sm w-full gap-2 px-6">
                                    {localizedButton}
                                    <PiArrowRight 
                                    className='transition-all duration-400 ease-in-out hover:transform hover:translate-x-1 cursor-pointer' 
                                    /> 
                                    </button>
                                </Link>
                            </div> 
                            

                            </div>
                            

                        </Container>
                    </div>
                )
            })}
        </div>
    )
}