import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BlockContent from '@sanity/block-content-to-react';
import { clientConfig } from '../../lib/client';
import { motion, useAnimation } from 'framer-motion';
import { PiArrowRight } from "react-icons/pi";


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
        const maxTranslation = 150;
        const translationFactor = maxTranslation / window.innerHeight;
        const webXValue = -scrollY * translationFactor;
        const otherTabsXValue = scrollY * translationFactor;

        webControls.start({ x: webXValue });
        otherTabsControls.start({ x: otherTabsXValue });
    }, [scrollY, webControls, otherTabsControls]);

    return (
        <div className="flex flex-wrap gap-3 pt-10 mx-auto text-light">

            {Array.isArray(sortedServiceTabsData) &&
                sortedServiceTabsData.map((serviceTabItem) => {
                    const localizedButton = serviceTabItem.button?.find(item => item._key === locale)?.value;
                    const controls = serviceTabItem.tabName === "web" ? webControls : otherTabsControls;
                    return (
                        <div
                            key={serviceTabItem._id}
                            className="flex justify-center items-center mx-auto xl:w-[900px] ">
                            {serviceTabItem.tabName === "web" ? (
                                <>
                                    <motion.div
                                        animate={controls}
                                        className='hidden md:block md:text-6xl xl:text-9xl uppercase font-black text-blue-600 relative z-0 pt-8 text-gray/70'>
                                        {serviceTabItem.tabName}
                                    </motion.div>
                                    {serviceTabItem.body && (
                                        <div className='md:w-[50%] font-light from-white-5 to-white-10 max-w-[calc(100%-2rem)] rounded-xl border-[1px] border-light border-opacity-20 px-8 py-4 bg-opacity-40 bg-glass'>
                                            <BlockContent
                                                blocks={serviceTabItem.body[locale]}
                                                serializers={serializers}
                                                projectId={clientConfig.projectId}
                                                dataset={clientConfig.dataset}
                                            />
                                            <Link href='/'>
                                            <button className="flex items-center justify-center gap-2 font-tab text-lg mt-3 cursor-pointer">
                                                {localizedButton}
                                                <PiArrowRight 
                                                className='transition-all duration-400 ease-in-out hover:transform hover:translate-x-1 cursor-pointer' 
                                                />   
                                            </button>
                                            </Link>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    {serviceTabItem.body && (
                                        <div className='md:w-[50%] font-light from-white-5 to-white-10 max-w-[calc(100%-2rem)] rounded-xl border-[1px] border-light border-opacity-20 px-8 py-4 bg-opacity-40 bg-glass'>
                                            <BlockContent
                                                blocks={serviceTabItem.body[locale]}
                                                serializers={serializers}
                                                projectId={clientConfig.projectId}
                                                dataset={clientConfig.dataset}
                                            />
                                            <Link href='/'>
                                            <button className="flex items-center justify-center gap-2 font-tab text-lg mt-3 cursor-pointer">
                                                {localizedButton}
                                                <PiArrowRight 
                                                className='transition-all duration-400 ease-in-out hover:transform hover:translate-x-1 cursor-pointer' 
                                                />   
                                            </button>
                                            </Link>
                                        </div>
                                    )}
                                    <motion.div
                                        animate={controls}
                                        className='hidden md:block md:text-6xl xl:text-9xl uppercase font-black text-blue-600 relative z-0 pt-8 text-gray/70'>
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
