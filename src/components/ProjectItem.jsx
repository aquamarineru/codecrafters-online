import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../../lib/client";


export default function ProjectItem({slug, title, image, locale, bg, tags, description,}){
    const localizedTitle = title?.find(entry => entry._key === locale)?.value || "";
    const localizedDescription = description?.find(entry => entry._key === locale)?.value || "";



    return(
        <Link href={`/projects/${encodeURIComponent(slug?.current || "")}`} className=' overflow-hidden rounded-md shadow-md group border-[1px] border-gray border-opacity-20 bg-glass pl-4'>
            <div className='flex items-center flex-row gap-2'>
                <div className='flex flex-col justify-around py-2 gap-2 md:px-2 md:w-[50%] '>
                    <h2 className='font-h1 font-bold text-sm text-gray md:text-xl'> {localizedTitle} </h2>
                    <p className='hidden md:block text-sm md:text-base font-light mb-3'>{ localizedDescription} </p>
                    <div className='hidden sm:flex flex-col md:flex-row gap-3'>
                        {
                            tags?.map(tag => (
                                <span key={tag._id} className="rounded-md border-[1px] border-light uppercase border-opacity-20 bg-glass px-2 py-1 font-tag text-xs md:text-base"> 
                                {tag.title}
                                </span>
                            ))
                        }
                    </div>
                </div>
                <div className='overflow-hidden opacity-50 transition-opacity duration-500 hover:opacity-100 xl:w-[50%] '>
                    <Image
                    src={urlFor(image).crop('center').fit('crop').width(800).height(800).url()}
                    alt={title && title[0]?.value || "Post Image"}
                    width={420}
                    height={420}
                    className='relative block w-[300px] h-full  md:w-[400px] md:h-[300px] lg:w-[500px] lg:h-[350px] object-cover transition-all duration-800 transform group-hover:scale-110 z-0'
                     />
                </div>
            </div>
        </Link>
    )
}