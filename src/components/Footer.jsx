import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container  from './Container';

export default function Footer({ footerData, locale}) {
    const currentYear = new Date().getFullYear(); 
    return (
        <div className='sticky bottom-0 shadow-custom bg-dark bg-hero w-full border-t border-light/40 backdrop-blur-[10px]'>
            <Container>
                <nav className='text-light mx-auto max-w-7xl px-8 flex flex-row items-center justify-between py-5 relative'>
                <Link 
                    href='/'
                    className='flex items-center gap-2 text-light font-tag uppercase cursor-pointer transition-colors text-md hover:text-hover'
                    >
                        <Image
                        src="/favicon-16x16.png"
                        alt="Code Crafters"
                        width={30}
                        height={30}
                        />
                    Code Crafters
                    </Link>
                    <div className='flex flex-col md:flex-row md:gap-10 font-tag'>
                        {
                            Array.isArray(footerData) && footerData.flatMap(item => item.footerItems).map(footerItem => {
                                const localizedTitle = footerItem.title.find(t => t._key === locale)?.value || "No title";
                                const slugPath = footerItem.slug?.current;
                                return(
                                    <Link 
                                    key={footerItem._id} href={`/${slugPath}`}
                                    className='before-element hover:text-hover'>
                                            {localizedTitle}
                                    </Link>
                                )
                            })
                        }
                       
                    </div>
                    
                </nav>
                <div className='text-xs font-tag text-light flex flex-col items-center py-2'>© {currentYear} Code Crafters. All Rights Reserved.</div>
            </Container>
        </div>
    )
}