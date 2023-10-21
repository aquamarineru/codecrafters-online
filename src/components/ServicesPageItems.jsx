import React from "react";
import Image from "next/image";
import { urlFor } from "../../lib/client";
import { Container } from ".";
import BlockContent from '@sanity/block-content-to-react';

const serializers = {
    types: {
        mainImage: (props) => (
            <div className="">
              <Image
                src={props.node.asset.url}
                alt={props.node.alt}
                className=" h-auto rounded shadow my-10 "
                width={1000}
                height={800}
              />
            </div>
          ),
        block: (props) => {
            switch (props.node.style) {
                case 'h2':
                    return <h2 className="font-h1 mb-5">{props.children}</h2>;
                case 'h3':
                    return <h3 className="text-light text-sm font-light mb-4">{props.children}</h3>;
                case 'paragraph':
                    return <p className="text-sm font-light mb-4">{props.children}</p>;
                case 'bullet':
                    return <ul className="text-light list-disc pl-6 mb-4 font-light text-sm md:text-base"><li className="mb-2">{props.children}</li></ul>;
                case 'number':
                    return <ol className="text-light list-decimal pl-6 mb-4 font-light"><li className="mb-2">{props.children}</li></ol>;
                default:
                    return <p className="text-light text-sm font-light mb-4">{props.children}</p>;
            }
        },
        listItem: (props) => <li className="mb-2">{props.children}</li>,
    },
};
export default function ServicesPageItems({ title, image, body, locale }) {
    const localizedTitle = title?.find(entry => entry._key === locale)?.value || "";
   
    return(
        <div className="rounded-xl border-[1px] border-white border-opacity-5 bg-glass p-4">
            <div className="relative flex flex-col items-center">
                <Image
                src={urlFor(image).crop('center').fit('crop').width(400).height(400).url()}
                alt={title && title[0]?.value || "Post Image"}
                width={200}
                height={150}
                className='absolute -top-[100px]'
                />
            </div>
                        
            <h2 className="text-gray font-bold font-h1 text-lg text-center pt-16 pb-3">{localizedTitle} </h2>
            <BlockContent
                blocks={body[locale]}
                serializers={serializers}
                projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                className='w-full  text-light text-sm'
            />
                        

        </div>
    )
}