import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../../lib/client';
import { PiArrowRight } from "react-icons/pi";
import { Container, Button } from '.';
export default function HowWeWork({ aboutData, locale }) {
    return (
        <div className='w-full h-full  md:px-4 bg-hero z-10 text-light bg-basic' 
        >
        
            {Array.isArray(aboutData) && aboutData.map((aboutItem) => {
                const localizedTitle = aboutItem.title?.find(item => item._key === locale)?.value;
                const localizedDescription = aboutItem.description?.find(item => item._key === locale)?.value;
                const localizedButton = aboutItem.button?.find(item => item._key === locale)?.value;

                return(
                    <div key={aboutItem._id}>
                        <Container className="flex flex-col md:flex-row gap-5  justify-around items-center py-10">
                            <div className='flex flex-col gap-5 md:w-1/3 '>
                            <h2 className="uppercase text-center text-4xl font-h1  font-black  text-gray/70">{localizedTitle}</h2>
                                <p className='font-light text-base text-center' > {localizedDescription} </p>
                                <Link href='/about'>
                                    <button className="md:inline-flex flex items-center justify-center rounded-md font-tag text-sm ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-4 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  bg-slate-100 text-slate-900 hover:bg-slate-100/80  h-10 py-4 md:py-6 md:px-4 md:text-sm w-full gap-2 px-6">
                                    {localizedButton}
                                    <PiArrowRight 
                                    className='transition-all duration-400 ease-in-out hover:transform hover:translate-x-1 cursor-pointer' 
                                    /> 
                                       
                                    </button>
                                </Link>
                            </div>
                                
                            <div className='grid grid-cols-1 pt-10 gap-10  md:grid-cols-2 md:gap-10 md:w-2/3 '>
                                {
                                    aboutItem.aboutPoints?.map((point)=> {
                                        const pointTitle = point.title?.find(item => item._key === locale)?.value;
                                        const pointDescription = point.description?.find(item => item._key === locale)?.value;
                                        
                                        return(
                                            <div 
                                            key={point._id} 
                                            className='flex flex-col gap-3 from-white-5 to-white-10 rounded border-[1px] border-light border-opacity-20 px-4 py-8 md:px-3 md:py-8 lg:px-6 lg:py-10 bg-opacity-40 bg-glass relative'>
                                                <Image 
                                                src={urlFor(point.image).url()} 
                                                alt={pointTitle} 
                                                width={50} 
                                                height={50}
                                                className='absolute -top-[30px] shadow-md' />
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