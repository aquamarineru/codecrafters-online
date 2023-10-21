import React from 'react';
import Link from 'next/link';
import { Container } from '.';

export default function Breadcrumb({ paths }) {
    return (
        <div className="hidden md:flex absolute top-[65px] left-0 z-1 w-full  px-4 py-4 bg-hero" style={{background: 'radial-gradient(circle at center top, rgb(52, 35, 89) 0%, rgba(15, 25, 38, 0) 70%)'}}>
            <Container className="">
                <nav 
                className="flex items-center justify-center font-tag text-light text-sm" 
                aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2 sm:space-x-1">
                        <li className='flex items-center'>
                            <Link 
                            href="/" 
                            className="cursor-pointer font-tag text-light/70 text-lg before-element hover:text-light/50 ">
                            Home
                            </Link>
                        </li>
                        {paths.map((path, index) => (
                            <li 
                            key={index} 
                            className={`cursor-pointer flex space-x-2 sm:space-x-1 ${index === paths.length - 1 ? 'whitespace-nowrap' : ''}`}>
                                <span className="text-light/80 text-lg opacity-40">/</span>
                                {index === paths.length - 1 ? (
                                    <span className="flex items-center capitalize text-lg text-light">
                                    {path}
                                    </span>
                                    ) : (
                                        <Link 
                                        href={`/${path}`}
                                        className="flex capitalize items-center text-lg text-light/70 before-element hover:text-light/50 ">
                                        {path}
                                        </Link>
                                    )
                                }
                            </li>
                        ))}
                    </ol>
                </nav>
            </Container>
        </div>
      );
}