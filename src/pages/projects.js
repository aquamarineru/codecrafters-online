import React from "react"
import Link from "next/link";
import Image from "next/image";
import { PiArrowLeftLight } from 'react-icons/pi';
import { Container, Breadcrumb,  } from "@/components";
import { client, urlFor } from "../../lib/client";

export default function ProjectPage ({locale, projectPageData}) {
    console.log(projectPageData)
    return (
        <div className="bg-dark bg-hero h-full w-full text-light"
        >
            {
                Array.isArray(projectPageData) && projectPageData.map((projectItem) => {
                    const localizedBtn = projectItem.button.find(item => item._key === locale)?.value;
                    const localizedTitle = projectItem.title.find(item => item._key === locale)?.value;
                    const localizedDescription = projectItem.description.find(item => item._key === locale)?.value;
                    const paths = [ localizedTitle] 
                    console.log(projectItem)
                    return(
                        <div key={projectItem._id} style={{background: 'radial-gradient(circle at center top, rgb(52, 35, 89) 0%, rgba(15, 25, 38, 0) 70%)'}}>
                            <Breadcrumb paths={paths} />
                            <Container className='pt-32 h-screen' >
                            <Link href='/' >
                                <button className="flex items-center font-tag gap-3 before-element pt-10">
                                    <PiArrowLeftLight className="transition-all duration-400 ease-in-out hover:transform hover:translate-x-1 cursor-pointer" />
                                    {localizedBtn}
                                </button>
                            </Link>
                            <div className="flex items-center justify-between gap-5 " >
                            <div className="flex flex-col pt-5 gap-10 md:w-[50%] ">
                                <h1 className="uppercase font-h1 text-3xl md:text-5xl  font-black  text-gray/70" >{localizedTitle} </h1>
                                <p className="text-base md:text- font-light" > {localizedDescription} </p>
                            </div>
                            <div className="hidden md:block">
                                <Image
                                key={projectItem._id}
                                src={urlFor(projectItem.image).url()}
                                width={700}
                                height={600}
                                className='md:absolute md:top-0 md:right-0 md:w-[500px] xl:left-1/2 rounded opacity-40 object-cover  shadow-custom'
                                alt="about image"
                                />
                            </div>
                            

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
        const projectPageQuery = `*[_type == "projectPage"]{
            _id,
            title,
            description,
            button,
            image,
        }`
        const projectPageData = await client.fetch(projectPageQuery);
        return {
            props: {
                projectPageData,
                locale,
            },
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                projectPageData: [],
                locale,
            },
        }
    }
}
