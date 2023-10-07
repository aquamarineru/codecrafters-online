import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../../lib/client";
import { PiArrowRight } from "react-icons/pi";
import { format } from "date-fns";

export default function Post({ title, image, slug, publishedAt, button, locale }) {
    const date = format(new Date(), 'dd MMM yyyy');
    const localizedTitle = title?.find(entry => entry._key === locale)?.value || "";
    const localizedBtn = button?.find(entry => entry._key === locale)?.value || "";

    return (
        <Link className="text-light border border-light/10 bg-glass bg-dark/40 py-4 px-4 rounded-md  " href={`/blog/${encodeURIComponent(slug?.current || "")}`}>
            
                <div className="flex flex-col items-start justify-center gap-3 relative">
                    <div className="">
                        {image && (
                            <Image 
                                src={urlFor(image).crop('center').fit('crop').width(400).height(400).url()}
                                alt={title && title[0]?.value || "Post Image"}
                                width={400}
                                height={400}
                                priority={true}
                                className='object-cover h-full z-10 rounded-md shadow-custom opacity-50 transition-opacity duration-500 hover:opacity-100'
                            />
                        )}
                    </div>
                    <h2 className="font-h1 text-base lg:text-xl font-bold text-gray" >{localizedTitle}</h2>
                    <p className="font-tag text-sm" >{date} </p>
                </div>
        </Link>
    );
}

