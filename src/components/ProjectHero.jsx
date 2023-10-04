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
                case 'h1':
                    return <h1 className="text-4xl font-bold font-h1 mb-6">{props.children}</h1>;
                case 'h2':
                    return <h2 className="text-3xl font-semibold font-h1 mb-5">{props.children}</h2>;
                case 'h3':
                    return <h3 className="text-2xl font-medium mb-4">{props.children}</h3>;
                case 'h4':
                    return <h4 className="text-xl font-medium mb-3">{props.children}</h4>;
                case 'h5':
                    return <h5 className="text-lg font-medium mb-2">{props.children}</h5>;
                case 'normal':
                    return <p className="text-base font-light mb-4">{props.children}</p>;
                case 'blockquote':
                    return <blockquote className="border-l-4 border-gray-400 pl-4 italic">{props.children}</blockquote>;
                    case 'bullet':
                    return <ul className="list-disc pl-6 mb-4 font-light"><li className="mb-2">{props.children}</li></ul>;
                case 'number':
                    return <ol className="list-decimal pl-6 mb-4 font-light"><li className="mb-2">{props.children}</li></ol>;
                default:
                    return <p className="text-base font-light mb-4">{props.children}</p>;
            }
        },
        listItem: (props) => <li className="mb-2">{props.children}</li>,
    },
};


export default function ProjectDemo({ projectData, locale}) {
    return (
        <div className='w-full h-full py-24 bg-hover bg-hero text-light'>
            {Array.isArray(projectData) && projectData.map((projectItem) => {
                const localizedTitle = projectItem.title?.find(item => item._key === locale)?.value;  
                const localizedButton = projectItem.button?.find(item => item._key === locale)?.value;  
                return(
                    <div key={projectItem._id}>
                        <Container className='z-20 flex flex-col items-center justify-center'>
                            <h2 className='uppercase font-h1 text-4xl text-center font-black md:text-7xl text-gray/20'>{localizedTitle} </h2>
                            <div className='pt-10 flex items-center justify-around gap-10'>
                            <Image 
                            src={urlFor(projectItem.image).url()}
                            alt={projectItem.image.alt}
                            width={800}
                            height={500}
                            className='w-[50%] h-auto rounded'
                            />
                            <div className='flex flex-col items-start '>
                                <BlockContent
                                blocks={projectItem.body[locale]}
                                serializers={serializers}
                                projectId={clientConfig.projectId}
                                dataset={clientConfig.dataset}
                                />
                                <Link href='/projects' className='z-20 text-dark'>
                                    <Button className="flex items-center justify-center gap-2 font-tag text-lg mt-3 cursor-pointer bg-light hover:bg-light/40 text-dark font-light pt-5">
                                    {localizedButton}
                                    <PiArrowRight 
                                    className='transition-all duration-400 ease-in-out hover:transform hover:translate-x-1 cursor-pointer' 
                                    /> 
                                       
                                    </Button>
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