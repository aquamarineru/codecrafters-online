import React from 'react'
import { Container } from '.'

export default function Section({ children  }) {
    return (
        <section className='w-full h-screen bg-center bg-no-repeat bg-zinc-300 bg-cover relative flex items-center justify-center'>
            {children}
        </section>
    )
}