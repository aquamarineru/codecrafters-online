{/* <div 
                            className='absolute top-0 left-0 right-0 bottom-0 h-screen items-center bg-gradient-to-b from-dark via-dark to-hover z-0' /> 
                            <Image
                                key={homeItem._id}
                                src={urlFor(homeItem.image).url()}
                                alt={homeItem.title}
                                width={800}
                                height={700}
                                priority={true}
                                className='object-cover w-full h-screen z-10' 
                            />
<Container>
                    {
                        Array.isArray(homeData) && homeData.map((homeItem) => {
                            const localizedTitle = homeItem.title?.find(item => item._key === locale)?.value;
                            const localizedSubtitle = homeItem.subtitle?.find(item => item._key === locale)?.value;
                            const localizedButton = homeItem.button?.find(item => item._key === locale)?.value;
                            const localizedBtn = homeItem.btn?.find(item => item._key === locale)?.value;
                                return (
                                    <>
                                    <div key={homeItem._id} className='flex flex-col justify-center items-center mt-5'>
                                        <div className='w-5 h-5 rounded-full bg-hover z-20' />
                                        <div className='w-1 sm:h-80 h-40 z-20 gradient' />
                                        </div>
                                        <div>
                                            <h1 className=" font-black font-h1 text-2xl md:text-4xl md:w-[500px] xl:text-7xl text-light opacity-75 xl:w-[1000px] tracking-wid ">{localizedTitle}</h1>
                                        <h2 className=' text-light opacity-70 z-20 text-xl md:text-2xl xl:text-3xl font-tag'>{localizedSubtitle}</h2>
                                        <div className='py-10 z-20 cursor-pointer flex items-center gap-5'>
                                        <Link href="/#contact" >
                                            <Button>{localizedButton}</Button>
                                        </Link>
                                        <Link href="#" >
                                            <button 
                                            className="md:inline-flex flex items-center justify-center rounded-md font-tag text-sm ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  bg-slate-100 text-slate-900 hover:bg-slate-100/80  h-10 py-6 md:text-lg w-full gap-4 px-8"
                                            >
                                                <PiCalendarBlankThin  /> {localizedBtn}
                                            </button>
                                             https://cal.com/
                                            </Link>
                                        </div>                                        </div>
                                        </>
                                        


                                )
                        })

                    }

                </Container> */}

                /*  {
                Array.isArray(sortedServiceTabsData) &&
                sortedServiceTabsData.map((serviceTabItem) => {
                    const localizedButton = serviceTabItem.button?.find(item => item._key === locale)?.value;
                    return(
                        <div
                        key={serviceTabItem._id} 
                        className="flex justify-center items-center gap-10">
                            { serviceTabItem.tabName === "web" ? (
                                <>
                                    <div
                                    className='hidden md:block md:text-6xl xl:text-9xl uppercase font-black text-blue-600 relative z-0 pt-8 text-gray/70'>
                                        {serviceTabItem.tabName}
                                    </div>
                                    {serviceTabItem.body && (
                                        <div className='md:w-[40%] font-light '>
                                            <BlockContent
                                                blocks={serviceTabItem.body[locale]} 
                                                serializers={serializers}
                                                projectId={clientConfig.projectId}
                                                dataset={clientConfig.dataset}
                                            />
                                            <button>{localizedButton} </button>
                                        </div>
                                    )}
                                    
                                </>
                            ) : (
                                <>
                                    {serviceTabItem.body && (
                                        <div className='md:w-[40%] font-light '>
                                            <BlockContent
                                                blocks={serviceTabItem.body[locale]} 
                                                serializers={serializers}
                                                projectId={clientConfig.projectId}
                                                dataset={clientConfig.dataset}
                                            />
                                            <button>{localizedButton} </button>
                                        </div>
                                    )}
                                    <div 
                                    
                                    className='hidden md:block md:text-6xl xl:text-9xl uppercase font-black text-blue-600 relative z-0 pt-8 text-gray/70'>
                                        {serviceTabItem.tabName}
                                    </div>  
                                </>
                            )}
                        </div>
                    )
                })
            }  */