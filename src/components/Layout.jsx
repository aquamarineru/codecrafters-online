import React from "react";
import Head from "next/head";
import Script from "next/script";
import { Footer, Social } from "./index";


export default function Layout({ children  }) {

    return(
        <div className="flex flex-col min-h-screen">
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Code Crafters Online | Web Developers  </title>
                <meta name="description" content="At Code Crafters, we architect web solutions that are not only highly performant and scalable but also tailored to your unique needs. Discover the potential of our tech stack for your project." />
                <meta name="keywords" content="your, project, keywords, here" />
                <meta name="author" content="Marina " />
                <meta name="creator" content="Code Crafters" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://codecrafters.online/"></link>
                <meta property="og:title" content="Code Crafters Online | Web Developers" />
                <meta property="og:description" content="At Code Crafters, we architect web solutions that are not only highly performant and scalable but also tailored to your unique needs. Discover the potential of our tech stack for your project." />
                <meta property="og:image" content="" />
                <meta property="og:url" content="https://codecrafters.online/" />
                <meta property="og:email" content="codecraftersdev@gmail.com"></meta>
                <meta property="og:type" content="website" />
                <meta name="google-site-verification" content="AJ8nK6Q4nHJgsQxUBhlsO6ChsTgPAs75k9PIPuXgb_M" />
                <link rel="icon" href="/logo.png" />
                
            </Head>
                <Social />
            <main role="main" className="flex-grow ">
                {children}
            </main>
            <footer role="contentinfo">
                <Footer />
            </footer>
        </div>      

    )

}