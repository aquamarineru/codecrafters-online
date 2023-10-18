import React from 'react';


export default function Button({ children, onClick, className, ariaLabel }) {
    return (
        <button 
            aria-label={ariaLabel}
            onClick={onClick}
            className={`md:inline-flex rounded-md  ring-offset-basic transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-basic focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  bg-basic bg-glass   h-10 py-4 px-6 z-30 flex items-center justify-center gap-2 font-tag cursor-pointer font-light hover:bg-basic/50 text-sm text-gray md:py-8 md:px-10 md:font-bold md:text-base  uppercase hover:text-light ${className}`}
        >
            {children}
        </button>
    );
}
