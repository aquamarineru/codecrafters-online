import React from "react"
import { client } from "../../lib/client"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { Hero } from "../components"

export default function Home({ homeData, locale }) {
  console.log('locale:', locale)
  console.log('homeData:', homeData )
  return (
    <>
      <Hero homeData={homeData} locale={locale} />
      
    </>
  )
}
export async function getStaticProps({ locale }) {
  try{
    const homeQuery = `*[_type == "home"]{
      _id,
      seoImage,
      seoTitle,
      seoDescription,
      seoKeywords,
      title,
      subtitle,
      image,
      "videoFileUrl": videoAnimation.fallback.asset->url,
      button,
      buttonLink,

      
    }`
    const homeData = await client.fetch(homeQuery)
    console.log(homeData)

    return {
      props: {
        homeData,
        locale: locale,
        ...(await serverSideTranslations(locale, ['common'])),
      },
    }

  }
  catch(err){
      console.error(err)
      return { props: {} };
  }
}
