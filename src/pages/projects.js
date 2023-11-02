import React from "react"
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { PiArrowLeftLight } from 'react-icons/pi';
import { Container, Breadcrumb, ProjectsGrid, ProjectItem } from "@/components";
import { client, urlFor } from "../../lib/client";

export default function ProjectPage ({locale, projectPageData}) {
    return (
        <div className="bg-dark bg-hero h-full w-full text-light"
        >
            {
                Array.isArray(projectPageData) && projectPageData.map((projectItem) => {
                    const localizedBtn = projectItem.button.find(item => item._key === locale)?.value;
                    const localizedTitle = projectItem.title.find(item => item._key === locale)?.value;
                    const localizedDescription = projectItem.description.find(item => item._key === locale)?.value;
                    const paths = [ localizedTitle] 
                    return(
                        <div key={projectItem._id} style={{background: 'radial-gradient(circle at center top, rgb(52, 35, 89) 0%, rgba(15, 25, 38, 0) 70%)'}}>
                            <Head> 
                                <title> {localizedTitle} | CodeCrafters </title>
                            </Head>
                            <Breadcrumb paths={paths} />
                            <Container className='pt-32 h-full ' >
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
                                        key={projectItem._id}
                                        src={urlFor(projectItem.image).url()}
                                        width={700}
                                        height={600}
                                        className='md:absolute md:top-0 md:right-0 md:w-[500px] xl:left-1/2 rounded opacity-40 object-cover  shadow-custom'
                                        alt="about image"
                                        />
                                    </div>
                                </div>
                                <ProjectsGrid>
                                    {
                                        projectItem.ourProjectItems.map(item => {
                                            return (
                                                <ProjectItem
                                                key={item._id}
                                                title={item.title}
                                                description={item.description}
                                                image={item.image}
                                                slug={item.slug}
                                                locale={locale}
                                                tags={item.tags}
                                                />
                                            )
                                        })
                                    }
                                </ProjectsGrid>
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
            ourProjectItems[]->{
                _id,
                bg,
                title,
                description,
                button,
                image,
                slug,
                body,
                language,
                tags[]->{
                    _id,
                    title,
                }
            }
        }`
        const projectPageData = await client.fetch(projectPageQuery);
        return {
            props: {
                projectPageData,
                locale,
            },
            revalidate: 60,
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
