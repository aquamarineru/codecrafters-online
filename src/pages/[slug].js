import React from 'react'
import { client } from '../../lib/client'
import { Container, Breadcrumb } from '@/components'
import Link from "next/link";
import Head from 'next/head';
import { PiArrowLeftLight } from 'react-icons/pi';
import BlockContent from '@sanity/block-content-to-react';

const serializers = {
  types: {
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

function FooterLinks({ item, locale}) {
  const localizedTitle = item.title.find(item => item._key === locale)?.value;
  const localizedBtn = item.button.find(item => item._key === locale)?.value;
  const paths = [ localizedTitle ]
  return(
    <div className='bg-dark bg-hero h-full py-10 px-2 text-light flex items-center'>
      <Head> 
        <title> {localizedTitle} | CodeCrafters </title>
      </Head>
      <Breadcrumb paths={paths} />
      <Container className='pt-10 md:pt-24 h-full'>
        <Link href='/' >
            <button 
            role='button'
                    aria-label='back button'
                    className="flex items-center font-tag gap-3 before-element pt-10">
                    <PiArrowLeftLight className="transition-all duration-400 ease-in-out hover:transform hover:translate-x-1 cursor-pointer" />
                    {localizedBtn}
                    </button>
          </Link>
          <div className='flex flex-col items-center md:w-[550px] lg:w-[700px]'>
            <BlockContent 
            blocks={item.body[locale]}
            serializers={serializers}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            />
          </div>

      </Container>
    </div>
  ) 
}

export default FooterLinks

export async function getStaticPaths() {
  const query = `*[_type == "footerItem"]{
    'slug': slug.current
}`
const itemData = await client.fetch(query);
    const paths = itemData.map((item) => ({
        params: { slug: String(item.slug) },
    }));
    return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params: { slug }, locale }) {
  try{
    const query = `*[_type == "footerItem" && slug.current == $slug]{
      _id,
      title,
      slug,
      button,
      body,
      language,
    }`
    const [item] = await client.fetch(query, { slug });
        return{
            props: {
                item,
                locale,
            },
        }
  }
  catch(error) {
    console.log(error)
  }
}