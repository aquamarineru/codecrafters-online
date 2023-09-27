import React from 'react';
import Container from "./Container"
import Image from "next/image"
import { urlFor } from "../../lib/client"

export default function ContactUs({ contactData, locale}) {
    return (
        <div className='flex items center justify-center h-screen'>
            {Array.isArray(contactData) && contactData.map((contactItem) =>{ 
            return(  
                <div key={contactItem._id}  className='h-full w-full bg-center bg-no-repeat opacity-75 bg-zinc-300 -z-10'>
                    {/* <Image
                    key={contactItem._id}
                    src={urlFor(contactItem.image).url()}
                    alt={contactItem.title}
                    width={800}
                    height={700}
                    priority={true}
                    className='object-cover w-full h-screen -z-10' 
                    /> */}
                </div>
                )
            })}
            {
                Array.isArray(contactData) && contactData.map((contactItem) => {
                    const localizedTitle = contactItem.title?.find(item => item._key === locale)?.value;
                    const localizeSubTitle = contactItem.subtitle.find(item => item._key === locale)?.value; 
                    const localizedBtn = contactItem.button?.find(item => item._key === locale)?.value;

                    return(
                        <div 
                        key={contactItem._id}
                        className='flex flex-col justify-between items-center'>
                            <h2 className='z-20'>{localizedTitle} </h2>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"></path>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"></path>
                </svg>
                        </div>
                    )
                })
            }
        </div>
    )
}