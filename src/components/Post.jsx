import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../../lib/client";

export default function Post({ title, image, slug, subtitle, tags, locale }) {
    const localizedTitle = title?.find(entry => entry._key === locale)?.value || "";
    const localizedSubtitle = subtitle?.find(entry => entry._key === locale)?.value || "";

    return (
        <Link className="text-light border-light bg-hover/40 p-4 rounded-md  " href={`/blog/${encodeURIComponent(slug?.current || "")}`}>
            
                <div className="flex flex-col gap-3 relative">
                    <div className="">
                        {image && (
                            <Image 
                                src={urlFor(image).crop('center').fit('crop').width(300).height(300).url()}
                                alt={title && title[0]?.value || "Post Image"}
                                width={300}
                                height={300}
                                priority={true}
                                className='object-cover h-full z-10 rounded-md shadow-custom '
                            />
                        )}
                    </div>
                    <h2>{localizedTitle}</h2>
                    <p>{localizedSubtitle}</p>
                </div>
        </Link>
    );
}

