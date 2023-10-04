import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../../lib/client';
import { PiArrowRight } from "react-icons/pi";
import { Container, Button } from '.';
export default function HowWeWork({ aboutData, locale }) {
    return (
        <div className='w-full h-full py-24 bg-hover bg-hero text-light'>
            {Array.isArray(aboutData) && aboutData.map((aboutItem) => {
                const localizedTitle = aboutItem.title?.find(item => item._key === locale)?.value;
                const localizedDescription = aboutItem.description?.find(item => item._key === locale)?.value;
                const localizedButton = aboutItem.button?.find(item => item._key === locale)?.value;

                return(
                    <div key={aboutItem._id}>
                        <Container className="flex flex-row justify-between items-center">
                            <div className='flex flex-col '>
                            <h2 className="uppercase font-h1 text-4xl  font-black  text-gray/70">{localizedTitle}</h2>
                                <p className='lowercase font-light ' > {localizedDescription} </p>
                                <Link href='/about' className='z-50'>
                                    <Button className="flex items-center justify-center gap-2 font-tag text-lg mt-3 cursor-pointer bg-light hover:bg-light/40 text-dark font-light pt-5">
                                    {localizedButton}
                                    <PiArrowRight 
                                    className='transition-all duration-400 ease-in-out hover:transform hover:translate-x-1 cursor-pointer' 
                                    /> 
                                       
                                    </Button>
                                </Link>
                            </div>
                                
                            <div className='grid grid-cols-2 gap-10 lg:w-[50%] '>
                                {
                                    aboutItem.aboutPoints?.map((point)=> {
                                        const pointTitle = point.title?.find(item => item._key === locale)?.value;
                                        const pointDescription = point.description?.find(item => item._key === locale)?.value;
                                        const imageUrl = urlFor(point.image).url();
                                        return(
                                            <div key={point._id} className='flex flex-col gap-3'>
                                                <Image src={urlFor(point.image).url()} alt={pointTitle} width={50} height={50} />
                                                <h3 className="uppercase font-h1 text-4xl font-black  text-gray/70">{pointTitle} </h3>
                                                <p className='font-light' >{pointDescription} </p>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </Container>
                    </div>
                )
            })}
        </div>
    )
}