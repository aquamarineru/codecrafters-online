import React from "react"
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { PiArrowLeftLight } from 'react-icons/pi';
import { Container, Breadcrumb, ServicesPageItems } from "@/components";
import { client, urlFor } from "../../lib/client";

const serializers = {
    types: {
        block: props => props.children.join('')
    }
};

function blockToPlainText(blockContent) {
    if (!blockContent || !Array.isArray(blockContent)) {
        return '';
    }

    return blockContent
        .map(block => {
            if (block._type === 'block') {
                return block.children
                    .map(child => child.text || '')
                    .join('');
            }
            return '';
        })
        .join('\n');
}

export default function ServicesPage ({locale, servicesPageData}) {
    return (
        <div className="bg-dark bg-hero h-full w-full text-light"
        >
            
            {
                Array.isArray(servicesPageData) && servicesPageData.map((servicesItem) => {
                    const localizedBtn = servicesItem.button.find(item => item._key === locale)?.value;
                    const localizedTitle = servicesItem.title.find(item => item._key === locale)?.value;
                    const localizedDescription = servicesItem.description.find(item => item._key === locale)?.value;
                    const paths = [ localizedTitle]
                    const localizedSeoTitle = servicesItem.seoTitle.find(item => item._key === locale)?.value;
                    const localizedSeoDescription = servicesItem.seoDescription && servicesItem.seoDescription[locale]
                    ? blockToPlainText(servicesItem.seoDescription[locale])
                    : null;
                    const localizedSeoImage = servicesItem.seoImage && urlFor(servicesItem.seoImage.asset).url();
               
                    return(
                        <div key={servicesItem._id} style={{background: 'radial-gradient(circle at center top, rgb(52, 35, 89) 0%, rgba(15, 25, 38, 0) 70%)'}}>
                            <Head>
                                <title>{localizedSeoTitle}</title>
                                <meta name='og:title' content={localizedSeoTitle} />
                                {localizedSeoDescription && <meta name="og:description" content={localizedSeoDescription} />}
                                {localizedSeoDescription && <meta name="description" content={localizedSeoDescription} />}
                                {localizedSeoImage && <meta name="og:image" content={localizedSeoImage} />}
                                <meta property="og:type" content="website" />
                            </Head>
                            <Breadcrumb paths={paths} />
                            <Container className='pt-32' >
                            <Link 
                            href='/'
                            className="flex items-center font-tag gap-3 hover:text-hover hover:transform pt-10" >
                                
                                    <PiArrowLeftLight className="transition-all duration-400 ease-in-out hover:transform hover:translate-x-1 cursor-pointer" />
                                    {localizedBtn}
                                
                            </Link>
                            <div className="flex items-center justify-between gap-5 " >
                            <div className="flex flex-col pt-5 gap-10 md:w-[50%] ">
                                <h1 className="uppercase font-h1 text-3xl md:text-5xl  font-black  text-gray/70" >{localizedTitle} </h1>
                                <p className="text-base md:text- font-light" > {localizedDescription} </p>
                            </div>
                            <div className="hidden md:block">
                                <Image
                                key={servicesItem._id}
                                src={urlFor(servicesItem.image).url()}
                                width={700}
                                height={600}
                                className='md:absolute md:top-0 md:right-0 md:w-[500px] xl:left-1/2 rounded opacity-40 object-cover  shadow-custom'
                                alt="about image"
                                />
                            </div>
                            

                        </div>
                            <div className="py-16 mx-auto grid max-w-7xl grid-cols-1 flex-col gap-8  md:grid-cols-2 lg:grid-cols-3">
                                {
                                    servicesItem.ourServiceItems.map(item => {
                                        return (
                                            <ServicesPageItems
                                            key={item._id}
                                            title={item.title}
                                            image={item.image}
                                            body={item.body}
                                            locale={locale}
                                            />
                                        )
                                    })
                                }
                            </div>
                            </Container>

                        </div>
                    )
                })
            }
        </div>
    )
}

export async function getStaticProps({ locale }) {
    try {
        const servicesPageQuery = `*[_type == "servicesPage"]{
            _id,
            seoTitle,
            seoDescription,
            seoImage,
            title,
            description,
            button,
            image,
            ourServiceItems[]->{
                _id,
                title,
                image,
                body,
                language,
            },
        }`
        const servicesPageData = await client.fetch(servicesPageQuery);
        return {
            props: {
                servicesPageData,
                locale,
            },
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                servicesPageData: [],
                locale,
            },
        }
    }
}
