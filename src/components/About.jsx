import React from 'react';
import { Container } from '.';
import Link from 'next/link';
import { PiArrowLeftLight} from 'react-icons/pi'

export default function About({ }) {
    return(
        <div className="w-full h-screen bg-basic/30 bg-hero">
            <Container className='pt-10'>
                <Link href='/' >
                    <button 
                    role="button" 
                    aria-label='button'
                    className="flex items-center gap-3 before-element pt-10">
                        <PiArrowLeftLight className="transition-all duration-400 ease-in-out hover:transform hover:translate-x-1 cursor-pointer" />
                        Back
                    </button>
                </Link>
            </Container>
            
        </div>
    )
}