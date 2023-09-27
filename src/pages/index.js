import React from "react"
import { client } from "../../lib/client"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import {  Hero, Services, Section  } from "../components"


export default function Home({ homeData, servicesData, serviceTabsData, contactData, locale }) {
  console.log(serviceTabsData)

  return (
    <>
      <Section>
        <Hero homeData={homeData} locale={locale} />
      </Section>
      <Services locale={locale} servicesData={servicesData} serviceTabsData={serviceTabsData} />
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
      btn,
    }`
    const servicesQuery = `*[_type == "services"]{
      _id,
      title,
      description,
      image,
      button,
      allServices[]->{
        _id,
        title,
        description,
        image,
        button,
        slug,
        body,
      }
    }`
    const serviceTabQuery = `*[_type == "serviceTab"]{
      _id,
      tabName,
      body,
      language,
      button,
    }`

    const contactQuery = `*[_type == "contact"]{
      _id,
      title,
      subtitle,
      image,
      button,
    }`
    const homeData = await client.fetch(homeQuery)
    const servicesData = await client.fetch(servicesQuery, { language: locale })
    const serviceTabsData = await client.fetch(serviceTabQuery, { language: locale })
    const contactData = await client.fetch(contactQuery)

    return {
      props: {
        homeData,
        servicesData,
        serviceTabsData,
        contactData,
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
