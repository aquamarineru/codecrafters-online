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
        // Assuming the maximum translation is 225 pixels as per your example
        const maxTranslation = 150;
        const translationFactor = maxTranslation / window.innerHeight;  // Adjust this factor based on your needs
        const webXValue = -scrollY * translationFactor;
        const otherTabsXValue = scrollY * translationFactor;

        webControls.start({ x: webXValue });
        otherTabsControls.start({ x: otherTabsXValue });
    }, [scrollY, webControls, otherTabsControls]);

    return (
        <div className="flex flex-wrap pt-10 text-light">
            {Array.isArray(sortedServiceTabsData) &&
                sortedServiceTabsData.map((serviceTabItem) => {
                    const localizedButton = serviceTabItem.button?.find(item => item._key === locale)?.value;
                    const controls = serviceTabItem.tabName === "web" ? webControls : otherTabsControls;
                    return (
                        <div
                            key={serviceTabItem._id}
                            className="flex justify-center items-center">
                            {serviceTabItem.tabName === "web" ? (
                                <>
                                    <motion.div
                                        animate={controls}
                                        className='hidden md:block md:text-6xl xl:text-9xl uppercase font-black text-blue-600 relative z-0 pt-8 text-gray/70'>
                                        {serviceTabItem.tabName}
                                    </motion.div>
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
