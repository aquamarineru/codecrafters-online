export default function Circle() {

    return(
        <div className="from-white-5 to-white-10 max-w-[calc(100%-2rem)] rounded-xl border-[2px] border-light border-opacity-5 bg-opacity-40 md:px-4 md:py-4 mx-auto ml-0 md:-mb-32 w-full ">
           <div className="grid md:grid-cols-2 gap-3 xl:grid-cols-4">
                {["Performance", "Accessibility", "Best Practices", "SEO"].map((label, index) => (
                    <div className="flex flex-col items-center" key={label}>
                        <h2 className="mb-2  text-center font-light text-light text-xs font-bold ">{label}</h2>
                        <div className="relative flex aspect-square md:w-[60px] md:h-[60px]  lg:h-[88px] lg:w-[88px] items-center justify-center text-2xl font-bold text-green-400 md:text-xl">
                        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="5" class={`h-full w-full -rotate-90 rounded-full bg-green-500 bg-opacity-40 fill-mode-forwards animation-delay-[${200 + index * 200}ms]`}>
                        <circle cx="50" cy="50" r="48" stroke-dasharray="301.59" className="animate-stroke-up"></circle>
                    </svg>
                            <div className={`absolute animate-fadeUp text-center text-light opacity-0 font-tag fill-mode-forwards animation-delay-[${200 + index * 200}ms]`}>
                                100
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

{/* <div className="from-white-5 to-white-10 mx-auto -mt-40 ml-auto w-full max-w-[calc(100%-2rem)] rounded-xl border-[1px] border-white border-opacity-5 bg-grape-900 bg-opacity-40 bg-glass px-8 py-8 backdrop-blur-lg sm:mx-0 sm:-mt-60 sm:max-w-[50%] md:-mt-40 lg:-mt-60 lg:max-w-[60%] xl:-ml-16 xl:-mt-32 xl:mr-8 xl:w-full xl:max-w-none">
            <div className="grid grid-cols-2 gap-8 xl:grid-cols-4">
                <div className="flex flex-col items-center">
                    <h2 className=" text-light mb-2 text-center font-tag text-sm font-bold"> Perfomens</h2>
                    <div className="relative flex aspect-square h-[88px] w-[88px] items-center justify-center text-2xl font-bold text-green-400 md:h-[120px] md:w-[120px] md:text-3xl">
                        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="5" class="h-full w-full -rotate-90 animate-stroke-up rounded-full bg-green-300 bg-opacity-40 fill-mode-forwards animation-delay-[200ms]" style={{ strokeDashoffset: 320 }}><circle cx="50" cy="50" r="48"></circle></svg>
                        <div className="absolute animate-fade-up text-center opacity-0 fill-mode-forwards animation-delay-[200ms]">
                            100
                        </div>

                    </div>
                </div>

            </div>

        </div> */}