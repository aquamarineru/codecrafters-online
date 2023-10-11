import React from 'react'
import Link from 'next/link'
import Button from './Button'

function Error404() {
  return (
    <div className="flex items-center justify-between bg-hero flex-col h-screen text-center font-sans text-gray-500 m-0 bg-dark pt-32">
        <svg 
        width="380px" 
        height="500px" 
        viewBox="0 0 837 1045" 
        version="1.1"
        className="float-animation">
            <g 
            id="Page-1" 
            stroke="none" 
            stroke-width="1" 
            fill="none" 
            fill-rule="evenodd">
                <path 
                d="M353,9 L626.664028,170 L626.664028,487 L353,642 L79.3359724,487 L79.3359724,170 L353,9 Z" 
                id="Polygon-1" 
                stroke="#007FB2" 
                stroke-width="6"
                className="float-animation"></path>
                <path 
                d="M78.5,529 L147,569.186414 L147,648.311216 L78.5,687 L10,648.311216 L10,569.186414 L78.5,529 Z" 
                id="Polygon-2" 
                stroke="#3c6e71" 
                stroke-width="6"
                className="float-animation delay-200"></path>
                <path 
                d="M773,186 L827,217.538705 L827,279.636651 L773,310 L719,279.636651 L719,217.538705 L773,186 Z" 
                id="Polygon-3" 
                stroke="#795D9C" 
                stroke-width="6"
                className="float-animation delay-400"></path>
                <path 
                d="M639,529 L773,607.846761 L773,763.091627 L639,839 L505,763.091627 L505,607.846761 L639,529 Z" 
                id="Polygon-4" 
                stroke="#284b63" 
                stroke-width="6"
                className="float-animation delay-600"></path>
                <path 
                d="M281,801 L383,861.025276 L383,979.21169 L281,1037 L179,979.21169 L179,861.025276 L281,801 Z" 
                id="Polygon-5" 
                stroke="#36B455" 
                stroke-width="6"
                className="float-animation delay-800"></path>
            </g>
        </svg>
        <div className="absolute transform -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 h-52 md:w-[500px] text-white font-light">
        <h1 className="text-5xl font-h1 font-black leading-[46px] mb-10">404</h1>
        <p className="font-tag text-xl">Page not found</p>
        <div className="mt-10">
          <div className="flex items-center justify-center  ">
            <Link href='/'>
              <button
              aria-label='Go back'
              role='button'
              className="md:inline-flex flex items-center justify-center rounded-md font-tag text-sm ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400  disabled:opacity-50 border text-light bg-hero hover:bg-light/80 hover:text-dark  h-10 md:py-6 md:px-8 md:text-lg w-full gap-4 px-6">
                Go back
              </button>
            </Link>
           
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Error404 