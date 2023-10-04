import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../../lib/client';
import { PiArrowRight } from "react-icons/pi";
import { Container, Button } from '.';
export default function HowWeWork({ aboutData, locale }) {
    return (
        <div className='w-full h-full py-10 md:px-4 bg-hover bg-hero text-light'>
            {Array.isArray(aboutData) && aboutData.map((aboutItem) => {
                const localizedTitle = aboutItem.title?.find(item => item._key === locale)?.value;
                const localizedDescription = aboutItem.description?.find(item => item._key === locale)?.value;
                const localizedButton = aboutItem.button?.find(item => item._key === locale)?.value;

                return(
                    <div key={aboutItem._id}>
                        <Container className="flex flex-col md:flex-row  justify-around items-center ">
                            <div className='flex flex-col gap-5 md:w-1/2 md:pr-10 lg:w-1/3 '>
                            <h2 className="uppercase text-center text-4xl font-h1 md:text-5xl  font-black  text-gray/70">{localizedTitle}</h2>
                                <p className='font-light text-base text-center' > {localizedDescription} </p>
                                <Link href='/about'>
                                    <Button className="flex items-center justify-center font-tag text-sm cursor-pointer bg-light hover:bg-light/40 text-dark font-light pt-5">
                                    {localizedButton}
                                    <PiArrowRight 
                                    className='transition-all duration-400 ease-in-out hover:transform hover:translate-x-1 cursor-pointer' 
                                    /> 
                                       
                                    </Button>
                                </Link>
                            </div>
                                
                            <div className='grid grid-cols-1 pt-10 gap-5  md:grid-cols-2 md:gap-10 md:w-1/2 md:pr-4'>
                                {
                                    aboutItem.aboutPoints?.map((point)=> {
                                        const pointTitle = point.title?.find(item => item._key === locale)?.value;
                                        const pointDescription = point.description?.find(item => item._key === locale)?.value;
                                        
                                        return(
                                            <div 
                                            key={point._id} 
                                            className='flex flex-col gap-3'>
                                                <Image 
                                                src={urlFor(point.image).url()} 
                                                alt={pointTitle} 
                                                width={50} 
                                                height={50}
                                                className='shadow-md' />
                                                <h3 className="uppercase font-h1 text-xl md:text-2xl lg:text-3xl font-black  text-gray/70">{pointTitle} </h3>
                                                <p className='font-light text-sm lg:text-base' >{pointDescription} </p>
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