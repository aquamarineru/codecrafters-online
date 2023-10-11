import React, { useState } from 'react';
import { Container, Button, ContactForm } from "."
import Image from "next/image"
import Link from 'next/link';
import { urlFor } from "../../lib/client"
import { PiCalendarBlankThin } from 'react-icons/pi'
import { MdOutlineClose } from 'react-icons/md'


const ModalWrapper = ({ children, isOpen, toggleModal }) => {
    if (!isOpen) return null;
    return (
        <>
            <div 
                className='w-full h-full absolute top-0 left-0 bg-black/80 bg-hero' 
                onClick={toggleModal}></div>
            <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-7 bg-dark bg-hero rounded shadow-lg w-[300px] md:w-[400px] ">
                {children}
            </div>
        </>
    );
}

export default function ContactUs({ contactData, locale}) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <div id='contact' className='flex items-center bg-dark bg-hero justify-center text-light h-full w-full relative'>
            {
                Array.isArray(contactData) && contactData.length > 0 && contactData.map((item, index) => {
                    const localizedBtn = item.btn?.find(entry => entry._key === locale)?.value;
                    const localizedModalBtn = item.modalBtn?.find(entry => entry._key === locale)?.value;
                    const localizedMainTitle = item.mainTitle?.find(entry => entry._key === locale)?.value;
                    const localizedDescription = item.description?.find(entry => entry._key === locale)?.value;
                    return (
                        <div className='w-full h-screen md:h-full z-0' key={item._id}>
                            <Image
                                src={urlFor(item.image).url()}
                                alt={item.image.alt}
                                width={1000}
                                height={800}
                                className='object-cover w-full h-full -z-10 opacity-60'
                            />
                            <div className='absolute top-0 left-0 right-0 bottom-0 bg-hero -z-10' />
                            <Container className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-dark rounded w-[300px] p-4 md:w-[400px] md:px-10 md:py-16 flex justify-center items-center bg-hero'>
                                <div className='flex flex-col justify-between items-start gap-10 '>
                                    <h2 className='font-black font-h1 text-xl md:text-2xl text-gray '>
                                        {localizedMainTitle}
                                    </h2>
                                    <p className='text-light font-light'>
                                        {localizedDescription}
                                    </p>
                                    <Button
                                        onClick={toggleModal}
                                        className='hover:bg-dark/60 text-sm z-20 cursor-pointer md:py-8 md:px-10 md:font-bold uppercase hover:text-light md:text-base'>
                                        {localizedModalBtn}
                                    </Button>
                                    <Link 
                                    className='w-full'
                                    href='https://calendly.com/'
                                    target='_blank'>
                                        <button className="md:inline-flex flex items-center justify-center rounded-md font-tag text-sm ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-4 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-100 md:text-base text-basic hover:bg-slate-100/80 h-10 py-4 md:py-8 md:px-10 md:font-bold w-full gap-2 px-6 uppercase">
                                            <PiCalendarBlankThin />
                                            {localizedBtn}
                                        </button>
                                    </Link>
                                </div>
                            </Container>
                        </div>
                    );
                })
            }
            <ModalWrapper 
            isOpen={isOpen} 
            toggleModal={toggleModal}
            className="w-[300px]">
                <button className="absolute top-3 right-3 text-2xl" onClick={toggleModal}>
                    <MdOutlineClose />
                </button>
                <ContactForm contactData={contactData} locale={locale} /> 
            </ModalWrapper>
        </div>
    );
        

}

