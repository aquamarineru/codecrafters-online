import React from "react";
import { Footer } from "./index";


export default function Layout({ children  }) {
    return(
        <div className="flex flex-col min-h-screen">
            <main role="main" className="flex-grow">
                {children}
            </main>
            <footer role="contentinfo">
                <Footer />
            </footer>
        </div>      

    )

}