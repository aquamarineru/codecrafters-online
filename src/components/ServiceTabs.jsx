import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BlockContent from '@sanity/block-content-to-react';
import { clientConfig } from '../../lib/client';
import { motion, useAnimation } from 'framer-motion';


const serializers = {
    types: {
      mainImage: (props) => (
        <div className="">
          <Image
            src={props.node.asset.url}
            alt={props.node.alt}
            className="w-full h-auto"
            width={1000}
            height={800}
          />
        </div>
      ),
    },
  };
  

export default function ServiceTabs ({ serviceTabsData, locale }) {


  const sortOrder = ["Design", "web", "dev"];
  const sortedServiceTabsData = serviceTabsData.sort((a, b) => {
    return sortOrder.indexOf(a.tabName) - sortOrder.indexOf(b.tabName);
  });

    return (
        <div className="flex flex-wrap pt-10 text-light gap-10">
        {Array.isArray(sortedServiceTabsData) &&
                sortedServiceTabsData.map((serviceTabItem) => {
                    const localizedButton = serviceTabItem.button?.find(item => item._key === locale)?.value;
                    return(
                        <div
                        key={serviceTabItem._id} 
                        className="flex justify-center items-center gap-10">
                            { serviceTabItem.tabName === "web" ? (
                                <>
                                    <div
                                    className='hidden md:block md:text-6xl xl:text-9xl uppercase font-black text-blue-600 relative z-0 pt-8 text-gray/70'>
                                        {serviceTabItem.tabName}
                                    </div>
                                    {serviceTabItem.body && (
                                        <div className='md:w-[40%] font-light '>
                                            <BlockContent
                                                blocks={serviceTabItem.body[locale]} 
                                                serializers={serializers}
                                                projectId={clientConfig.projectId}
                                                dataset={clientConfig.dataset}
                                            />
                                            <button>{localizedButton} </button>
                                        </div>
                                    )}
                                    
                                </>
                            ) : (
                                <>
                                    {serviceTabItem.body && (
                                        <div className='md:w-[40%] font-light '>
                                            <BlockContent
                                                blocks={serviceTabItem.body[locale]} 
                                                serializers={serializers}
                                                projectId={clientConfig.projectId}
                                                dataset={clientConfig.dataset}
                                            />
                                            <button>{localizedButton} </button>
                                        </div>
                                    )}
                                    <div 
                                    
                                    className='hidden md:block md:text-6xl xl:text-9xl uppercase font-black text-blue-600 relative z-0 pt-8 text-gray/70'>
                                        {serviceTabItem.tabName}
                                    </div>  
                                </>
                            )}
                        </div>
                    )})}
        </div>
    )
}
