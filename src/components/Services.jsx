import React from 'react';
import Link from 'next/link';
import { ServiceTabs, Container, Button } from '.';
import { PiArrowRight } from "react-icons/pi";

export default function Services({ servicesData, locale, serviceTabsData }) {
    return (
        <div className="relative h-full w-full">
            {
              Array.isArray(servicesData) && servicesData.map((serviceItem) => {
                const localizedTitle = serviceItem.title?.find(item => item._key === locale)?.value;
                const localizedDescription = serviceItem.allServices.map(service =>
                  service.description?.find(item => item._key === locale)?.value
                );    
                const localizedButton = serviceItem.button?.find(item => item._key === locale)?.value;            
                return (
                  <div className='z-0 py-24 bg-gradient-to-t from-dark via-dark to-basic' key={servicesData._id}>
                    <div className='absolute top-0 left-0 right-0 bottom-0 bg-hero -z-0' />
                    <Container className='z-20 flex flex-col items-center justify-center'>
                    <h2 className='uppercase font-h1 text-4xl text-center font-black md:text-6xl text-gray/60'>{localizedTitle} </h2>
                      <ServiceTabs serviceTabsData={serviceTabsData} locale={locale} />
                      
                        <Button
                        aria-label='Learn more'
                        role='button' 
                        className="flex items-center justify-center gap-2 font-tag mt-10 cursor-pointer font-light hover:bg-basic/50 text-sm text-gray md:py-8 md:px-10 md:font-bold md:text-base z-50   uppercase hover:text-light">
                        <Link href='/services' className='z-10 flex items-center gap-2'>
                          {localizedButton}
                          <PiArrowRight 
                          className='transition-all duration-400 ease-in-out hover:transform hover:translate-x-1 cursor-pointer' 
                          /> 
                          </Link>  
                        </Button>
                    </Container>
                  </div>
                )
              })
            }
     
    </div>
    )
}
