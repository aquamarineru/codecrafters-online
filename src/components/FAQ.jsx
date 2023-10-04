import React, { useState } from "react";
import { Container } from ".";
import Image from 'next/image';
import BlockContent from '@sanity/block-content-to-react';
import { RxCaretDown, RxCaretUp } from "react-icons/rx";

const serializers = {
    types: {
        block: (props) => {
            switch (props.node.style) {
                case 'h1':
                    return <h1 className="text-4xl font-bold font-h1 mb-6">{props.children}</h1>;
                case 'h2':
                    return <h2 className="text-3xl font-semibold font-h1 mb-5">{props.children}</h2>;
                default:
                    return <p className="text-base font-light mb-4">{props.children}</p>;
            }
        },
        listItem: (props) => <li className="mb-2">{props.children}</li>,
    },
};

function FaqItem({ title, body }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);
    return (
        <div className="w-full">
            <div 
                className=" border-b border-light border-opacity-20 p-3 flex flex-row justify-between items-center cursor-pointer" 
                onClick={toggleOpen}   
            >
                <h2 className="uppercase font-h1 text-gray flex">{title}</h2>
                <button className="">{isOpen ? <RxCaretUp /> : <RxCaretDown />}</button>
            </div>
            {isOpen && 
            <div className="p-4 transition-all duration-500 ease-in-out">
                <BlockContent 
                    blocks={body}
                    serializers={serializers}
                    projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                    dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                />
            </div>
                
            }
        </div>
    );
}

export default function FAQs({ faqData, locale}) {
    return(
        <div id="fqa" className="w-full h-full py-24 bg-dark bg-hero text-light">
            {Array.isArray(faqData) && faqData.map((faqItem) => {
                const localizedTitle = faqItem.title?.find(item => item._key === locale)?.value;
                const localizedDescription = faqItem.description?.find(item => item._key === locale)?.value;
    
                return(
                    <div key={faqItem._id}>
                        <Container className="flex flex-row justify-between items-start">
                            <div className='flex flex-col items-center justify-center w-1/3 gap-5'>
                                <h2 className="uppercase font-h1 text-4xl  font-black  text-gray/70">{localizedTitle}</h2>
                                <p className='font-light '>{localizedDescription} </p>
                            </div>
                            <div className="flex flex-col items-start gap-5 w-1/2">
                            {faqItem.faqPoints?.map((faqPoint) => {
                            const faqPointTitle = faqPoint.title?.find(item => item._key === locale)?.value;
                            const localizedBody = faqPoint.body[locale];
                            return (
                                <FaqItem key={faqPoint._id} title={faqPointTitle} body={localizedBody}  />
                            );
                        })}

                            </div>
                            
                        
                        </Container>
                    </div>
                )
            })}
        </div>
    )
}