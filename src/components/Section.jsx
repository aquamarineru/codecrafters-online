import React from 'react'

export default function Section({ children  }) {
    return (
        <section className='w-full h-screen'>
            {children}
        </section>
    )
}