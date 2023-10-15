import React from "react";
import { client, urlFor } from "../../lib/client";
import { Container, Breadcrumb } from "@/components";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import { PiArrowLeftLight } from "react-icons/pi";


function AboutPage({ aboutPageData, locale }) {
    return (
    <div className="w-full h-full bg-dark/95 bg-hero text-light relative">
        {Array.isArray(aboutPageData) && aboutPageData.map((aboutPageItem) => {
            const localizedBtn = aboutPageItem.btn.find(item => item._key === locale)?.value;
            const localizedTitle = aboutPageItem.title.find(item => item._key === locale)?.value;
            const localizedDescription = aboutPageItem.description.find(item => item._key === locale)?.value;
            const paths = [ localizedTitle]

            return(
                <div key={aboutPageItem._id} style={{background: 'radial-gradient(circle at center top, rgb(52, 35, 89) 0%, rgba(15, 25, 38, 0) 50%)'}}>
                    <Head> 
                        <title> {localizedTitle} | CodeCrafters </title>
                    </Head>
                    <Breadcrumb paths={paths} />
                    <Container className='pt-24 h-full' >
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
                                key={aboutPageItem._id}
                                src={urlFor(aboutPageItem.image).url()}
                                width={700}
                                height={600}
                                className='md:absolute md:top-0 md:right-0 md:w-[500px] xl:left-1/2 rounded opacity-40 object-cover  shadow-custom'
                                alt="about image"
                                />
                            </div>
                            

                        </div>
                        <div className="mt-24 h-full from-white-5 to-white-10 rounded border-[1px] border-light border-opacity-20 px-8 py-10 bg-opacity-40 bg-glass flex flex-col justify-between gap-5">
                            {Array.isArray(aboutPageItem.mission) && aboutPageItem.mission.map((missionItem) => {
                                const localizedTitle = missionItem.title.find(item => item._key === locale)?.value;
                                const localizedSlogan = missionItem.slogan.find(item => item._key === locale)?.value;
                                const localizedDescription = missionItem.description.find(item => item._key === locale)?.value;
                                return(
                                    <div 
                                    key={missionItem._id} 
                                    >
                                        {localizedTitle === 'Our Vision' || localizedTitle === 'unsere Vision' ? (
                                        <div className="flex flex-col gap-3 md:flex-row items-center justify-around ">
                                            <Image
                                                key={missionItem._id}
                                                src={urlFor(missionItem.image).url()}
                                                width={300}
                                                height={300}
                                                className="rounded shadow"
                                                alt="vision image"
                                            />
                                            <div className="flex flex-col justify-between gap-3 md:w-[50%] ">
                                                <h3 className="font-tag text-sm md:text-base text-center md:text-start">{localizedTitle}</h3>
                                                <h2 className="font-black font-h1 text-gray/80 text-xl md:text-2xl text-center md:text-start">{localizedSlogan}</h2>
                                                <p className="text-base font-light text-center md:text-start">{localizedDescription}</p>
                                            </div>
                                        </div>
                                        ) : (
                                        <div className="flex flex-col-reverse gap-3 md:flex-row items-center justify-around ">
                                            <div className="flex flex-col justify-between gap-3 md:w-[50%] ">
                                                <h3 className="font-tag text-sm md:text-base text-center md:text-start">{localizedTitle}</h3>
                                                <h2 className="font-black text-center md:text-start font-h1 text-gray/80 text-xl md:text-2xl">{localizedSlogan}</h2>
                                                <p className="text-center text-base  font-light md:text-start">{localizedDescription}</p>  
                                            </div>
                                                <Image
                                                key={missionItem._id}
                                                src={urlFor(missionItem.image).url()}
                                                width={300}
                                                height={300}
                                                className="rounded shadow"
                                                alt="mission image"
                                                />

                                        </div>
                                        
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="h-full w-full py-24 ">
                            { Array.isArray(aboutPageItem.aboutBenefits) && aboutPageItem.aboutBenefits.map((aboutBenefitsItem) => {
                                const localizedTitle = aboutBenefitsItem.title.find(item => item._key === locale)?.value;
                                return(
                                    <div 
                                    key={aboutBenefitsItem._id} 
                                    className="flex flex-col items-center justify-center">
                                        <h2 className="uppercase text-center text-2xl font-h1 md:text-3xl md:w-[500px] font-black  text-gray/70 lg:w-[750px] "> {localizedTitle} </h2>
                                        <div className="pt-16 md:pt-24 flex flex-col items-center gap-6 lg:flex-row md:items-start justify-center md:w-[400px] lg:w-full " >
                                        {aboutBenefitsItem.benefits && aboutBenefitsItem.benefits.map((benefit) => {
                                            const localizedBenefitTitle = benefit.title.find(item => item._key === locale)?.value;
                                            const localizedBenefitDescription = benefit.description.find(item => item._key === locale)?.value;
                                            return (
                                                <div 
                                                key={benefit.title} className="flex flex-col items-center m-4 from-white-5 to-white-10 rounded border-[1px] border-light border-opacity-20 px-4 py-8 bg-opacity-40 bg-glass relative w-full ">
                                                     {benefit.image && <Image
                                                        src={urlFor(benefit.image).url()}
                                                        width={250}
                                                        height={150}
                                                        className="absolute -top-[100px]"
                                                        alt={localizedBenefitTitle}
                                                    />}
                                                    <h3 className=" pt-16 font-text text-center text-lg">{localizedBenefitTitle}</h3>
                                                    <p className="text-center font-light text-base pt-5">{localizedBenefitDescription}</p>
                                                </div>
                                            );
                                        })}

                                        </div>
                                    </div>
                                )

                            })}
                            
                        </div>
                    </Container>

                </div>
            )
        })}
    </div>
    )
  }
  
  export default AboutPage
  export async function getStaticProps({ locale }) {
    const aboutPageQuery = `*[_type == "aboutContent"]{
        _id,
        btn,
        title,
        description,
        image,
        mission[]->{
            _id,
            title,
            slogan,
            description,
            image,
        },
        aboutBenefits[]->{
            _id,
            title,
            benefits[]->{
                image,
                title,
                description,
            }
        },
    }`
    const aboutPageData = await client.fetch(aboutPageQuery)
    return{
        props: {
            aboutPageData,
            locale,
        },
    }
  }