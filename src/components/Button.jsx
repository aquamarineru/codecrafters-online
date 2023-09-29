import React from 'react';


export default function Button({ children, onClick, className }) {
    return (
        <button 
            onClick={onClick}
            className={`md:inline-flex flex items-center justify-center rounded-md text-sm ring-offset-hover text-light font-tag transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hover focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  bg-hover  hover:bg-hover/50 h-10 py-4 md:py-6 md:px-6  md:text-lg w-full gap-4 px-6 z-30 cursor-pointer ${className}`}
        >
            {children}
        </button>
    );
}

/* export default function Button({ children, onClick }) {
    return (
        <button 
        onClick={onClick}
        className="md:inline-flex flex items-center justify-center rounded-md text-sm ring-offset-hover text-light font-tag transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hover focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  bg-hover  hover:bg-hover/50 h-10 py-4 md:py-6 md:px-6  md:text-lg w-full gap-4 px-6 z-30 cursor-pointer">
            {children}
        </button>
    )
} */