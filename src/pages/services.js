import React from "react"
import Link from "next/link";
import Image from "next/image";
import { PiArrowLeftLight } from 'react-icons/pi';
import { Container, Breadcrumb, ServicesPageItems } from "@/components";
import { client, urlFor } from "../../lib/client";

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
                    console.log(servicesItem)
                    return(
                        <div key={servicesItem._id} style={{background: 'radial-gradient(circle at center top, rgb(52, 35, 89) 0%, rgba(15, 25, 38, 0) 70%)'}}>
                            <Breadcrumb paths={paths} />
                            <Container className='pt-32 h-screen' >
                            <Link href='/' >
                                <button className="flex items-center font-tag gap-3 before-element pt-10">
                                    <PiArrowLeftLight className="transition-all duration-400 ease-in-out hover:transform hover:translate-x-1 cursor-pointer" />
                                    {localizedBtn}
                                </button>
                            </Link>
                            <div className="flex items-center justify-around gap-5">
                            <div className="hidden md:block">
                                <Image
                                key={servicesItem._id}
                                src={urlFor(servicesItem.image).url()}
                                width={800}
                                height={600}
                                className='md:absolute md:top-0 md:right-0 md:w-[500px] xl:left-1/2 rounded opacity-40 object-cover  shadow-custom'
                                alt="services abstract image"
                                />
                            </div>
                            <div className="flex flex-col items-center pt-5 gap-10 ">
                            <h1 className="uppercase font-h1 text-3xl text-center md:text-5xl  font-black  text-gray/70" >{localizedTitle} </h1>
                                <p className="text-base md:text- font-light md:w-[50%]" > {localizedDescription} </p>
                            </div>
                            </div>
                            <ServicesPageItems servicesPageData={servicesPageData} locale={locale}  />
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
            title,
            description,
            button,
            image,
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
