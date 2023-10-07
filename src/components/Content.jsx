import React from "react";
import { clientConfig } from "../../lib/client";
import Image from "next/image";
import BlockContent from '@sanity/block-content-to-react';

const serializers = {
    types: {
        image: (props) => (
            <div className="">
                <Image
                    src={props.node.asset.url}
                    alt={props.node.alt}
                    className="w-full h-auto"
                    width={1000}
                    height={800}
                />
            </div>
        ),
        block: (props) => {
            switch (props.node.style) {
                case 'normal':
                    return <p className="text-sm text-light font-tag mb-4">{props.children}</p>;
                case 'h2':
                    return <h2 className="text-3xl font-semibold font-h1 mb-5">{props.children}</h2>;
                case 'bullet':
                    return <ul className="list-disc pl-6 mb-4 font-light text-sm md:text-base"><li className="mb-2">{props.children}</li></ul>;
                case 'number':
                    return <ol className="list-decimal pl-6 mb-4 font-light"><li className="mb-2">{props.children}</li></ol>;
                default:
                    return <p className=" text-sm md:text-base text-light font-light mb-4">{props.children}</p>;
            }
        },
        listItem: (props) => <li className="mb-2">{props.children}</li>,
        span: (props) => <span className='font-tag'>{props.children}</span>,
    },
};

export default function Content({body, locale}){
    return(
        <>
        <BlockContent
            block={body}
                imageOptions={{ w: 1000, h: 800, fit: 'max',  }}
                projectId={clientConfig.projectId}
                dataset={clientConfig.dataset}
                serializers={serializers}
                className=' text-light '
            />
        </>
    )
}