import React from 'react';
import { Container } from '.';

export default function Statistic({ locale, statisticData }) {
    return (
        <div className=" py-10 md:py-24 bg-dark bg-hero w-full h-full text-light">
            {Array.isArray(statisticData) && statisticData.map((statisticItem) => {
                const localizedTitle = statisticItem.title?.find(item => item._key === locale)?.value;
                const localizedDescription = statisticItem.description?.find(item => item._key === locale)?.value;
                return (
                    <div 
                    key={statisticItem._id}
                    >
                        <Container  className='flex flex-col items-center justify-center px-4'>
                        <h2 className=" font-black font-h1 text-2xl md:text-4xl  lg:text-5xl text-light/80 tracking-wid "> {localizedTitle} </h2>
                        <p className=' text-light text-center  text-sm md:text-base lg:text-lg  font-light pt-5 lg:w-[600px]'> {localizedDescription} </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 pt-8">
                            {statisticItem.statisticNumbers && statisticItem.statisticNumbers.map((numberItem) => {
                                const localizedNumberTitle = numberItem.title.find(item => item._key === locale)?.value;
                                const localizedNumberDescription = numberItem.description.find(item => item._key === locale)?.value;

                                return (
                                    <div key={numberItem._id} className="flex flex-col items-center ">
                                        <div className="flex flex-col items-center m-4 w-1/4 from-white-5 to-white-10 rounded border-[1px] border-light border-opacity-20 px-24 py-16 lg:px-32 lg:py-24  bg-opacity-40 bg-glass">
                                            <h3 className=' text-3xl lg:text-6xl font-black font-h1'>{localizedNumberTitle} </h3>
                                        </div>
                                        <p className="text-sm lg:text-base font-light text-center w-[270px] md:w-[220px] lg:w-[300px]">{localizedNumberDescription}</p>
                                    </div>
                                )
                            })}
                        </div> 
                        </Container>
                    </div>
                )
            })}
        </div>
    )
}