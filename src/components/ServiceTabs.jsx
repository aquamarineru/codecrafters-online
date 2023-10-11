import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BlockContent from '@sanity/block-content-to-react';
import { clientConfig } from '../../lib/client';
import { motion, useAnimation } from 'framer-motion';



const serializers = {
    types: {
        
    },
};
export default function ServiceTabs({ serviceTabsData, locale }) {
    const webControls = useAnimation();
    const otherTabsControls = useAnimation();
    const [scrollY, setScrollY] = useState(0);

    const sortedServiceTabsData = useMemo(() => {
        const sortOrder = ["Design", "web", "dev"];
        return [...serviceTabsData].sort((a, b) => {
            return sortOrder.indexOf(a.tabName) - sortOrder.indexOf(b.tabName);
        });
    }, [serviceTabsData]);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const maxTranslation = 50;
        const isMdBreakpoint = window.innerWidth >= 768 && window.innerWidth < 1024;
        const isLgBreakpoint = window.innerWidth >= 1024 && window.innerWidth < 1280; // Assuming lg breakpoint is between 1024px and 1280px

        let translationFactor = maxTranslation / window.innerHeight;

        if (isMdBreakpoint) {
            translationFactor *= 0.15;
        } else if (isLgBreakpoint) {
            translationFactor *= 0.2; // Reduced even further for lg breakpoint, adjust as needed
        }

        const webXValue = -scrollY * translationFactor;
        const otherTabsXValue = scrollY * translationFactor;

        webControls.start({ x: webXValue });
        otherTabsControls.start({ x: otherTabsXValue });
    }, [scrollY, webControls, otherTabsControls]);

    return (
        <div className="flex flex-wrap gap-3 pt-10 mx-auto overflow-x-hidden text-light">

            {Array.isArray(sortedServiceTabsData) &&
                sortedServiceTabsData.map((serviceTabItem) => {
                    const controls = serviceTabItem.tabName === "web" ? webControls : otherTabsControls;
                    return (
                        <div
                            key={serviceTabItem._id}
                            className="flex justify-center items-center mx-auto md:w-[650px] md:px-10 lg:w-[900px] ">
                            {serviceTabItem.tabName === "web" ? (
                                <>
                                    <motion.div
                                        animate={controls}
                                        className='hidden md:block md:text-6xl xl:text-9xl uppercase font-black text-blue-600 relative  pt-8 text-gray/70'>
                                        {serviceTabItem.tabName}
                                    </motion.div>
                                    {serviceTabItem.body && (
                                        <div className='md:w-[50%] font-light text-sm lg:text-base from-white-5 to-white-10 max-w-[calc(100%-2rem)] rounded-xl border-[1px] border-light border-opacity-20 px-8 py-4 md:p-4 bg-opacity-40 bg-glass'>
                                            <BlockContent
                                                blocks={serviceTabItem.body[locale]}
                                                serializers={serializers}
                                                projectId={clientConfig.projectId}
                                                dataset={clientConfig.dataset}
                                            />
                                            
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    {serviceTabItem.body && (
                                        <div className='md:w-[50%] font-light text-sm lg:text-base from-white-5 to-white-10 max-w-[calc(100%-2rem)] rounded-xl border-[1px] border-light border-opacity-20 px-8 py-4 md:p-4 bg-opacity-40 bg-glass'>
                                            <BlockContent
                                                blocks={serviceTabItem.body[locale]}
                                                serializers={serializers}
                                                projectId={clientConfig.projectId}
                                                dataset={clientConfig.dataset}
                                            />
                                        </div>
                                    )}
                                    <motion.div
                                        animate={controls}
                                        className='hidden md:block md:text-6xl xl:text-9xl uppercase font-black text-blue-600 relative  pt-8 text-gray/70'>
                                        {serviceTabItem.tabName}
                                    </motion.div>
                                </>
                            )}
                        </div>

                    )
                })
            }
        </div>
    )
}