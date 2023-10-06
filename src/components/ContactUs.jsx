import React from 'react';
import {Container, Social} from "."
import Image from "next/image"
import Link from 'next/link';
import { urlFor, clientConfig } from "../../lib/client"
import BlockContent from '@sanity/block-content-to-react';
import { PiCalendarBlankThin } from 'react-icons/pi'
const serializers = {
    types: {
        block: (props) => {
            switch (props.node.style) {
                case 'normal':
                    return <p className="text-sm text-light font-tag mb-4">{props.children}</p>;
                case 'h2':
                    return <h2 className="text-3xl font-semibold font-h1 mb-5">{props.children}</h2>;
                default:
                    return <p className=" text-sm md:text-base text-light font-light mb-4">{props.children}</p>;
            }
        },
        listItem: (props) => <li className="mb-2">{props.children}</li>,
        span: (props) => <span className='font-tag'>{props.children}</span>,
    },
};
export default function ContactUs({ contactData, locale}) {
    console.log(contactData)
    return (
        <div className='flex items-center bg-dark bg-hero justify-center text-light h-full w-full relative'>
        {
            Array.isArray(contactData) && contactData.length > 0 && contactData.map((item, index) => {
                const localizedTitle = item.title?.find(entry => entry._key === locale)?.value;
                const localizedSubtitle = item.subtitle?.find(entry => entry._key === locale)?.value;
                const localizedButton = item.button?.find(entry => entry._key === locale)?.value;
                const localizedTermsText = item.termsText[locale];

                return (
                    <div className='flex flex-col justify-center items-center w-full h-screen md:h-full z-0' key={item._id}>
                        <Image
                            src={urlFor(item.image).url()}
                            alt={item.image.alt}
                            width={1000}
                            height={800}
                            className='object-cover w-full h-screen -z-10 opacity-60'
                        />
                        <div className='hidden lg:block absolute top-[40%] transform -translate-x-1/2 -translate-y-1/2 z-10 bg-dark px-16 py-24 rounded w-[40%]'>
                            <div className='flex flex-col justify-between items-start gap-10 pl-10'>
                                <h2 className='font-black font-h1 text-4xl md:text-5xl text-gray '> 
                                Have a project in mind? 
                                </h2>
                                <p>From enhancing your content creation speed to migrating and supercharging your websites performance, were here to elevate your business. Lets connect.</p>
                                <Link 
                                    href='https://calendly.com/'>
                                        <button 
                                        className="md:inline-flex flex items-center justify-center rounded-md font-tag text-sm ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-4 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  bg-slate-100 text-slate-900 hover:bg-slate-100/80  h-10 py-4 md:py-6 md:px-4 md:text-sm w-full gap-2 px-6">
                                        <PiCalendarBlankThin  /> 
                                        book a meeting
                                        </button>
                                    </Link>
                            </div>
                            
                        </div>
                        <div className='absolute top-1/2 left-1/2 xl:top-1/2 lg:left-2/3 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-dark/80 px-10 py-8 sm:px-16 xl:px-24 xl:py-24 rounded'>
                            <h2 className='font-black font-h1 text-xl md:text-5xl text-gray'>{localizedTitle}</h2>
                            <p className='text-light font-light mt-5 text-sm'>{localizedSubtitle}</p>
                            <div className="flex justify-around text-sm items-center pt-5 font-tag">
                                <form action="#">
                                <div className='relative mb-2 h-[4rem]'>
                                <label
                                className=' uppercase bg-dark/40 rounded  absolute top-[-.5rem] left-[1.25rem] p-[0.25rem]'>Name</label>
                                <input 
                                type="text" 
                                name="name" 
                                placeholder='Your name' 
                                required
                                className="border-[1px] bg-dark/80 border-gray rounded-md px-3 py-3 mt-2 w-full "/>
                                </div>
                                <div className='relative mb-2 h-[4rem]'>
                                    <label
                                    className=' uppercase bg-dark/40 rounded  absolute top-[-.5rem] left-[1.25rem] p-[0.25rem] '>Email</label>
                                    <input 
                                    
                                    type="email" 
                                    name="email"  
                                    placeholder='Your email' 
                                    required
                                    className="border-[1px] border-gray bg-dark/70 rounded-md px-3 py-3 mt-2 w-full "/>
                                </div>
                                <div className='relative mb-2 h-[4rem]'>
                                    <label
                                    className='uppercase absolute top-[-.5rem] left-[1.25rem] p-[0.25rem] bg-dark/40 rounded '>Message</label>
                                    <textarea
                                    name='message' 
                                    cols="30" 
                                    rows="5" 
                                    placeholder='Send me your message'
                                    required
                                    className="border-[1px] border-gray bg-dark/80 rounded px-3 py-3 mt-2 w-full ">
                                    </textarea>
                                </div>
                                <div className="relative top-24 mb-4 flex items-center">
                                    <input 
                                    type="checkbox" 
                                    id="agreeTerms" 
                                    required
                                    defaultChecked={item.termsAgreement} 
                                    className="mr-2"/>
                                    <label 
                                    htmlFor="agreeTerms" 
                                    className="text-xs text-light ">
                                        <BlockContent 
                                            blocks={localizedTermsText}
                                            serializers={serializers}
                                            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                                            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                                        />
                                    </label>
                                </div>
                                <button
                                type="submit"
                                className="mt-24 md:inline-flex flex items-center justify-center rounded-md font-tag text-sm ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-4 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  bg-slate-100 text-slate-900 hover:bg-slate-100/80  h-10 py-4 md:py-6 md:px-4 md:text-sm w-full gap-2 px-6"
                                >
                                {localizedButton} 
                                </button>

                                </form>
                                
                            </div>
                            
                        </div>
                        <div className='absolute top-0 left-0 right-0 bottom-0 bg-hero -z-10' />
                    </div>
                );
            })
        }
    </div>
    )
}