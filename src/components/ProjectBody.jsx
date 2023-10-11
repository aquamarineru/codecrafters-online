import React from 'react';
import Image from "next/image"
import { urlFor } from "../../lib/client" 
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
                    return <h2 className=" text-xl md:text-3xl font-semibold font-h1 mb-5 text-center text-light/80">{props.children}</h2>;
                case 'h3':
                    return <h3 className="text-light text-2xl font-medium mb-4">{props.children}</h3>;
                case 'paragraph':
                    return <p className="text-sm text-light md:text-base font-light mb-4">{props.children}</p>;
                case 'bullet':
                    return <ul className="text-light list-disc pl-6 mb-4 font-light text-sm md:text-base"><li className="mb-2">{props.children}</li></ul>;
                case 'number':
                    return <o className="text-light list-decimal pl-6 mb-4 font-light"><li className="mb-2">{props.children}</li></o>;
                default:
                    return <p className="text-light text-sm md:text-base font-light mb-4">{props.children}</p>;
            }
        },
        listItem: (props) => <li className="mb-2">{props.children}</li>,
    },
};

export default function ProjectBody({item, locale}) {
    console.log(item)
    return(
        <div className='pt-16 flex flex-col items-center'>
            <BlockContent
            blocks={item.body[locale] }
            serializers={serializers}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            className='xl:w-[800px]'
            />
        </div>
    )
}