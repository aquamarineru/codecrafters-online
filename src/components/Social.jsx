import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Social() {
    return (
        <div className='fixed left-3 bottom-24 z-50 space-y-4'>
            <div className='after-element fixed bottom-10' />
            <ShareButton 
            iconSrc="/twitter.svg" 
            text="share on twitter" 
            href="https://twitter.com" />
            <ShareButton 
            iconSrc="/fb.svg" 
            text="share on facebook" 
            href="https://facebook.com" />
            <ShareButton 
            iconSrc="/insta.svg" 
            text="pin on instagram" 
            href="https://instagram.com" />
    </div>

        
    )
}
function ShareButton({iconSrc, text, href}){
    return (
        <Link 
        href={href} 
        passHref 
        rel='noopener noreferrer'
        target='_blank'
        className="relative h-7 group block">
                <div className="absolute w-8 h-8 bg-light rounded-full top-1/2 transform -translate-y-1/2 hover:shadow group-hover:translate-x-px z-10">
                    <Image src={iconSrc} alt={text} width={30} height={30} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="hidden md:block overflow-hidden ml-4 h-7">
                    <div className="bg-gray text-dark font-tag h-7 text-sm text-gray-700 px-6 py-1 transform translate-x-full transition-transform duration-175 ease-in group-hover:translate-x-0">
                        {text}
                    </div>
                </div>
        </Link>
    );

}