import React from 'react';
import Link from 'next/link';
import { Container } from '.';

export default function Footer() {

    return (
        <div className=' sticky bottom-0 shadow-custom bg-dark bg-hero w-full border-t border-light/40 backdrop-blur-[10px]'>
            <Container>
                <nav className='text-light mx-auto max-w-7xl px-8 flex items-center justify-between py-5 relative'>
                    <Link 
                        href='/'
                        className='text-light font-tag uppercase cursor-pointer transition-colors text-md hover:text-hover'
                        >
                        Code Crafters
                    </Link>
                </nav>
            </Container>
        </div>
    )
}