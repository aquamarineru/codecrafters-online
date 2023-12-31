import React, { useState } from "react";
import Link from 'next/link';
import Image from "next/image";
import Container from './Container';
import { useRouter } from 'next/router';
import { CgMenuLeft } from 'react-icons/cg';
import { TfiClose } from 'react-icons/tfi';


const links = [
    { href: '/', label: 'home' },
    { href: '/about', label: 'why us?' },
    { href: '/services', label: 'our services' },
    { href: '/projects', label: 'projects' },
    { href: '/#fqa', label: 'fqa' },
    { href: '/blog', label: 'blog' },
    { href: '/#contact', label: 'contact us' },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);  
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();
    const { locale: activeLocal, locales } = router;
    const otherLocales = locales.filter((locale) => locale !== activeLocal);

    const changeLocale = (locale) => {
        document.cookie = `NEXT_LOCALE=${locale}`;
    };
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return(
        <div className="fixed top-0 left-0 w-full z-50 shadow-custom bg-dark border-b bg-hero border-light/40 backdrop-blur-[10px]">
            <Container>
                <nav className="mx-auto max-w-7xl px-8 flex items-center justify-between py-5 relative ">
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
                    <div className="flex items-center gap-4">
                    <CgMenuLeft 
                    className="text-light text-2xl cursor-pointer" 
                    onClick={toggleMenu} 
                    /> 
                        <div 
                        className="relative cursor-pointer"
                        onClick={toggleDropdown}>
                        <span className="bg-basic bg-glass px-4 py-2 rounded-xl uppercase text-light font-bold text-sm">{activeLocal} </span>
                       {isDropdownOpen && (
                        <div className="absolute left-0 mt-2 bg-dark/90 rounded-xl uppercase text-sm text-light px-4 py-2 z-0">
                             {otherLocales.map((locale, localeIndex) => {
                            const { pathname, query} = router;
                            return (
                                <Link 
                                    key={localeIndex} 
                                    href={{ pathname, query }} 
                                    locale={locale}
                                    onClick={() => changeLocale(locale)}
                                
                                    className="">
                                        {locale}
                                </Link>
                            );
                        })} 

                        </div>
                       )}  
                        </div>
                         
                    </div>
                    <div className={`fixed top-0 left-0 w-full h-screen bg-dark bg-hero transition-transform duration-300 ${isMenuOpen ? 'transform translate-x-0' : 'transform -translate-x-full'}`} >
                        <div className=" flex flex-col items-center justify-center gap-10">
                            <div className='flex flex-col items-center justify-center gap-6 pt-32'>
                                {links.map(({ href, label }, index) => (
                                    <Link 
                                    href={href} 
                                    key={index}
                                    onClick={() => setIsMenuOpen(false)}
                                    className='text-light md:text-lg xl:text-xl before-element font-tag  cursor-pointer transition-colors tracking-wider hover:text-hover'>
                                            {label}
                                    
                                    </Link>
                                ))}
                                <div className="absolute top-10 right-10">
                                    <TfiClose className="text-light text-2xl cursor-pointer" onClick={toggleMenu} />
                                </div>

                        </div>
                            
                        </div>
                    </div>

                </nav>
            </Container>
        </div>
    )
}