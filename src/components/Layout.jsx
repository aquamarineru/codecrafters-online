import React from "react";
import { Footer, Social } from "./index";


export default function Layout({ children  }) {
    return(
        <div className="flex flex-col min-h-screen">
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