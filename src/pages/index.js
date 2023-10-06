import React from "react"
import { client } from "../../lib/client"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import {  Hero, HowWeWork, Services, Statistic, ProjectHero, FAQ, ContactUs } from "../components"


export default function Home({ homeData, aboutData, projectData, servicesData, serviceTabsData, statisticData, faqData, contactData, locale }) {
  console.log(faqData)
  return (
    <>
      <Hero homeData={homeData} locale={locale} />
      <HowWeWork aboutData={aboutData} locale={locale} />
      <ProjectHero projectData={projectData}  locale={locale} />
      <Services locale={locale} servicesData={servicesData} serviceTabsData={serviceTabsData} />
      <Statistic statisticData={statisticData} locale={locale} />
      <FAQ faqData={faqData} locale={locale}  />
      <ContactUs contactData={contactData} locale={locale} />
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

    const aboutQuery = `*[_type == "about"]{
      _id,
      title,
      description,
      button,
      aboutPoints[]->{
        _id,
        title,
        description,
        image,
      }
    }`
    const projectQuery = `*[_type == "project"]{
      _id,
      title,
      image,
      body,
      button,
      language,
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

    const statisticQuery = `*[_type == "statistic"]{
      _id,
      title,
      description,
      statisticNumbers[]->{
        _id,
        title,
        description,
      }
    }`
    const faqQuery = `*[_type == "faq"]{
      _id,
      title,
      description,
      faqPoints[]->{
        _id,
        title,
        body,
        language,
      }
    }`
    const contactQuery = `*[_type == "contact"]{
      _id,
      title,
      subtitle,
      image,
      termsAgreement,
      termsText,
      language,
      button,
      mainTitle,
      description,
      btn,
      modalBtn,
    }`
    const homeData = await client.fetch(homeQuery)
    const aboutData = await client.fetch(aboutQuery)
    const projectData = await client.fetch(projectQuery)
    const servicesData = await client.fetch(servicesQuery, { language: locale })
    const serviceTabsData = await client.fetch(serviceTabQuery, { language: locale })
    const statisticData = await client.fetch(statisticQuery)
    const faqData = await client.fetch(faqQuery)
    const contactData = await client.fetch(contactQuery)

    return {
      props: {
        homeData,
        aboutData,
        projectData,
        servicesData,
        serviceTabsData,
        statisticData,
        faqData,
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
