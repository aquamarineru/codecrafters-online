import React from 'react';
import { ServiceTabs, Container } from '.';

export default function Services({ servicesData, locale, serviceTabsData }) {
    return (
        <div className="bg-hover h-screen w-full bg-hero pt-24">
          <Container>
            {
              Array.isArray(servicesData) && servicesData.map((serviceItem) => {
                const localizedTitle = serviceItem.title?.find(item => item._key === locale)?.value;
                const localizedDescription = serviceItem.allServices.map(service =>
                  service.description?.find(item => item._key === locale)?.value
                );                
                return (
                  <>
                    <h2 className='uppercase font-h1 text-3xl text-center font-black md:text-7xl text-gray/30'>{localizedTitle} </h2>
                    <h3 className='hidden md:block uppercase font-h1 text-left  md:text-5xl text-light font-light'>
                    {localizedTitle}
                    </h3>
                    <div className=''>
                      <ServiceTabs serviceTabsData={serviceTabsData} locale={locale} />
                    </div>
                  </>
                )
              })
            }
      </Container>
    </div>
    )
}
