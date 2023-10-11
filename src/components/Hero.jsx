import React from 'react';
import { PiCalendarBlankThin } from 'react-icons/pi'
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../../lib/client';
import { Container, Button } from '.';
import { motion } from 'framer-motion';


export default function Hero({ homeData, locale }) {
    const fadeInUp = {
        initial: {
            opacity: 0,
            y: 60,
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.6, -0.05, 0.01, 0.99]
            }
        }
    };
    const fadeInUpDelayed = {
        initial: {
            opacity: 0,
            y: 60,
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.6, -0.05, 0.01, 0.99],
                delay: 1, 
            }
        }
    };
    const slideDown = {
        initial: {
          y: '-100%',  
        },
        animate: {
          y: '0%',  
          transition: {
            duration: 2,  
            ease: 'easeOut',
          },
        },
      };
    return (
        <div className='relative h-screen w-full flex  items-center mx-auto'>
        {Array.isArray(homeData) && homeData.map((homeItem) => {
        const localizedTitle = homeItem.title?.find(item => item._key === locale)?.value;
        const localizedSubtitle = homeItem.subtitle?.find(item => item._key === locale)?.value;
        const localizedButton = homeItem.button?.find(item => item._key === locale)?.value;
        const localizedBtn = homeItem.btn?.find(item => item._key === locale)?.value;
            return(
                <div
                key={homeItem._id}
                className='absolute  top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-dark via-dark to-basic flex items-center justify-between z-0'
                >
                    <div className='absolute top-0 left-0 right-0 bottom-0 bg-hero z-0' />
                    <Container className='mx-auto grid max-w-7xl grid-cols-1  items-center gap-8 md:grid-cols-2' >
                        <div className='flex flex-row items-start gap-3 order-2 md:order-1 z-20 ' >
                            <motion.div 
                            variants={slideDown}
                            initial="initial"
                            animate="animate"
                            className='flex flex-col justify-center items-center'>
                                <div className='w-4 h-4 md:w-5 md:h-5 rounded-full bg-hover' />
                                <div className='w-1 sm:h-80 h-40 gradient' />
                            </motion.div>
                            <div className='flex flex-col gap-5 '>
                                <motion.h1
                                variants={fadeInUp}
                                initial="initial"
                                animate="animate" 
                                className=" font-black font-h1 text-2xl md:text-4xl md:w-[350px] xl:w-[450px] xl:text-5xl text-gray  tracking-wid ">
                                {localizedTitle}
                                </motion.h1>
                                <motion.h2 
                                variants={fadeInUpDelayed}
                                initial="initial"
                                animate="animate"
                                className=' text-light z-20 text-base md:text-xl xl:text-2xl font-text md:w-[350px] lg:w-[600px]'>
                                {localizedSubtitle}
                                </motion.h2>  
                                <div className='py-10 z-50 cursor-pointer flex flex-col lg:flex-row items-start  lg:items-center gap-5'>
                                    <Link 
                                    href="/#contact" >
                                        <Button 
                                        className='hover:bg-basic/50 text-sm text-gray md:py-8 md:px-10 md:font-bold md:text-base z-50  cursor-pointer uppercase hover:text-light'>
                                        {localizedButton}
                                        </Button>
                                    </Link>
                                    <Link 
                                    href='https://cal.com/codecrafters/30min'
                                    target='_blank'>
                                        <button 
                                        className="md:inline-flex flex items-center justify-center rounded-md font-tag text-sm ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-4 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  bg-light text-basic uppercase hover:bg-slate-100/80  h-10 py-4 md:py-8 md:px-10 md:text-base md:font-bold w-full gap-2 px-6">
                                        <PiCalendarBlankThin className='font-bold text-xl'  /> 
                                        {localizedBtn}
                                        </button>
                                    </Link>
                                </div>                                      
                            </div>      
                        </div>
                        <div className='w-full order-1 md:order-2 z-10 md:flex md:flex-col md:gap-3'>
                        <div
                        className='w-full h-full absolute top-0 left-0 z-10'
                        >
                            <Image
                            key={homeItem._id}
                            src={urlFor(homeItem.image).url()}
                            alt={homeItem.title}
                            width={1400}
                            height={800}
                            priority={true}
                            className='object-cover z-10 opacity-70 w-[500px] md:w-full '
                            /> 
                            
                        </div>
{/* //<Circle className='' /> */}
                        </div>      
                    </Container>
                </div>
                )})
        }     
        </div>
    )
}