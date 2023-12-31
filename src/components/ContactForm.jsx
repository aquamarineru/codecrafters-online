import React, { useRef, useState } from 'react'
import emailjs from 'emailjs-com';
import BlockContent from '@sanity/block-content-to-react';
const serializers = {
    types: {
        block: (props) => {
            switch (props.node.style) {
                case 'normal':
                    return <p className="text-sm text-light font-tag mb-4">{props.children}</p>;
                case 'h2':
                    return <h2 className="text-3xl font-semibold font-h1 mb-5">{props.children}</h2>;
                default:
                    return <p className=" text-sm md:text-base text-light font-light mb-4">{props.children}</p>;
            }
        },
        listItem: (props) => <li className="mb-2">{props.children}</li>,
        span: (props) => <span className='font-tag'>{props.children}</span>,
    },
};
export default function ContactForm({ contactData, locale }) {
    const [popup, setPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const form = useRef();
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_USER_ID);

    function hidePopup() {
        setPopup(false);
    }
    function sendEmail(e) {
        e.preventDefault();
        const { name, email, message } = e.target.elements;
        const templateParams = {
            from_name: name.value,
            from_email: email.value,
            message: message.value,
          };

        emailjs.sendForm(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, e.target, process.env.NEXT_PUBLIC_EMAILJS_USER_ID)
            .then((result) => {
                setPopupMessage('Message sent successfully!');
                setPopup(true);
                form.current.reset(); 
            }, (error) => {
                setPopupMessage('An error occurred. Please try again.');
                setPopup(true);
                console.log(error.text);
            });
    }
    return(
        <div>
            {
                Array.isArray(contactData) && contactData.map((item) => {
                    const localizedTitle = item.title?.find(entry => entry._key === locale)?.value;
                    const localizedSubtitle = item.subtitle?.find(entry => entry._key === locale)?.value;
                    const localizedButton = item.button?.find(entry => entry._key === locale)?.value;
                    const localizedTermsText = item.termsText[locale];
                return(
                    <div key={item._id}>
                    <h2 className='font-black font-h1 text-xl md:text-2xl text-gray'>{localizedTitle}</h2>
                            <p className='text-light font-light mt-5 text-sm'>{localizedSubtitle}</p>
                            <div className="flex justify-around text-sm items-center pt-5 font-tag">
                                <form 
                                ref={form}
                                action=""
                                onSubmit={sendEmail} >
                                <div className='relative mb-2 h-[4rem]'>
                                <label
                                className=' uppercase bg-dark rounded  absolute top-[-.5rem] left-[1.25rem] p-[0.25rem]'>Name</label>
                                <input 
                                type="text" 
                                name="name" 
                                placeholder='Your name' 
                                required
                                className="border-[1px] bg-dark/80 border-gray rounded-md px-3 py-3 mt-2 w-full "/>
                                </div>
                                <div className='relative mb-2 h-[4rem]'>
                                    <label
                                    className=' uppercase bg-dark rounded  absolute top-[-.5rem] left-[1.25rem] p-[0.25rem] '>Email</label>
                                    <input 
                                    
                                    type="email" 
                                    name="email"  
                                    placeholder='Your email' 
                                    required
                                    className="border-[1px] border-gray bg-dark/70 rounded-md px-3 py-3 mt-2 w-full "/>
                                </div>
                                <div className='relative mb-2 h-[4rem]'>
                                    <label
                                    className='uppercase absolute top-[-.5rem] left-[1.25rem] p-[0.25rem] bg-dark rounded '>Message</label>
                                    <textarea
                                    name='message' 
                                    cols="30" 
                                    rows="5" 
                                    placeholder='Send me your message'
                                    required
                                    className="border-[1px] border-gray bg-dark/80 rounded px-3 py-3 mt-2 w-full ">
                                    </textarea>
                                </div>
                                <div className="relative top-24 mb-4 flex items-center">
                                    <input 
                                    type="checkbox" 
                                    id="agreeTerms" 
                                    required
                                    defaultChecked={item.termsAgreement} 
                                    className="mr-2"/>
                                    <label 
                                    htmlFor="agreeTerms" 
                                    className="text-xs text-light ">
                                        <BlockContent 
                                            blocks={localizedTermsText}
                                            serializers={serializers}
                                            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                                            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                                        />
                                    </label>
                                </div>
                                <button
                                aria-label="Submit form"
                                type="submit"
                                className="md:inline-flex flex items-center justify-center rounded-md font-tag text-sm ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-4 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-100 md:text-base text-basic hover:bg-slate-100/80 h-10 py-4 md:py-8 md:px-10 md:font-bold w-full gap-2 px-6 uppercase mt-24"
                                >
                                {localizedButton} 
                                </button>
                                {popup && <div className="absolute top-0 left-0 right-0 bottom-0 bg-dark/80 flex items-center justify-center z-50">
                                    <div className="bg-light rounded-md p-5 flex flex-col items-center justify-center gap-5">
                                        <p className="text-dark text-center">{popupMessage}</p>
                                        <button
                                        aria-label="Close popup"
                                        role="Close popup"
                                        onClick={hidePopup}
                                        className="bg-dark text-light px-4 py-2 rounded-md"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>}

                                </form>
                                
                            </div>
                    </div>
                )
                })
                
            }
            
        </div>
    )
}