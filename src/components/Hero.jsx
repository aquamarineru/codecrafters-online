import React from 'react';
import { PiCalendarBlankThin } from 'react-icons/pi'
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../../lib/client';
import { VideoAnimation, Container } from '.';


export default function Hero({ homeData, locale }) {
console.log('homeData', homeData)
    return (
        <div className='relative flex items-center'>
            <div className='absolute top-0 left-0 right-0 bottom-0'>
            <div className='absolute top-0 left-0 right-0 bottom-0 h-screen bg-dark/50' />
                    {
                    Array.isArray(homeData) && homeData.map((homeItem) => (
                        <Image
                            key={homeItem._id}
                            src={urlFor(homeItem.image).url()}
                            alt={homeItem.title}
                            width={800}
                            height={700}
                            priority={true}
                            className='object-cover w-full h-screen -z-10' 
                        />
                        ))
                    } 
                </div>
                <Container>
                    {
                        Array.isArray(homeData) && homeData.map((homeItem) => {
                            const localizedTitle = homeItem.title?.find(item => item._key === locale)?.value;
                            const localizedSubtitle = homeItem.subtitle?.find(item => item._key === locale)?.value;
                            const localizedButton = homeItem.callToAction?.find(item => item._key === locale)?.value;
                            const localizedBtn = homeItem.button?.find(item => item._key === locale)?.value;
                                return (
                                    <div key={homeItem._id} className='flex flex-col justify-between items-center gap-5 text-center text-dark z-10 px-4 md:px-10 rounded-md lg:w-[700px]'>
                                        <h1 className=" font-black font-h1 text-2xl md:text-4xl md:w-[500px] xl:text-7xl text-light opacity-75 xl:w-[1000px] tracking-wid ">{localizedTitle}</h1>
                                    </div>
                                )
                        })

                    }

                </Container>
            </div>
    )
}