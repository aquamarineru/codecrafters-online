import React, { useState } from "react";
import { Container, Button, PostGrid, Post, Breadcrumb } from "@/components";
import Link from "next/link";
import { PiArrowLeftLight } from 'react-icons/pi';
import { loadPosts } from './api/posts';

const LOAD_MORE = 4;

export default function Blog({ initialPosts, total, locale }) {
    const [posts, setPosts] = useState(initialPosts);
    const [loadedAmount, setLoadedAmount] = useState(LOAD_MORE);
    const [loading, setLoading] = useState(false);

    const isLoadButtonVisible = loadedAmount < total;

    const getMorePosts = async () => {
        setLoading(true);
        try {
            const data = await fetch(`/api/posts?start=${loadedAmount}&end=${loadedAmount + LOAD_MORE}`).then(res => res.json());
            setLoadedAmount(prevAmount => prevAmount + LOAD_MORE);
            setPosts(prevPosts => [...prevPosts, ...data.posts]);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-dark bg-hero h-full w-full text-light">
            {Array.isArray(posts) && posts.map(post => {
                const localizedTitle = post.title.find(item => item._key === locale)?.value;
                const localizedDescription = post.description.find(item => item._key === locale)?.value;
                const localizedBtn = post.button.find(item => item._key === locale)?.value;
                const paths = [localizedTitle]
                return (
                    <div key={post._id} className="px-6" style={{background: 'radial-gradient(circle at center top, rgb(52, 35, 89) 0%, rgba(15, 25, 38, 0) 70%)'}}>
                        <Breadcrumb paths={paths} />
                        <Container className='pt-24 h-full'>
                        <Link href='/' >
                            <button className="flex items-center font-tag gap-3 before-element pt-10">
                                <PiArrowLeftLight className="transition-all duration-400 ease-in-out hover:transform hover:translate-x-1 cursor-pointer" />
                                {localizedBtn}
                            </button>
                        </Link>
                        <div className="flex flex-col pt-5 gap-10 md:w-[50%] ">
                                <h1 className="uppercase font-h1 text-3xl md:text-5xl  font-black  text-gray/70" >{localizedTitle} </h1>
                                <p className="text-sm md:text-base font-light" > {localizedDescription} </p>
                            </div>
                     
                            <PostGrid className=''>
                            {post.postMains.map(postMain => {
                                const tagTitle = postMain.tags[0]?.title || "";
                                    return(

                                        <Post 
                                        key={postMain._id}
                                        title={postMain.title}
                                        image={postMain.image}
                                        slug={postMain.slug}
                                        tags={tagTitle}  
                                        button={postMain.button}
                                        locale={locale}
                                        publishedAt={postMain.publishedAt}
                                    />
                                    )
                                })}
                            </PostGrid>
                            {isLoadButtonVisible && (
                                <div className="flex justify-center py-10">
                                    <Button onClick={getMorePosts} disabled={loading}>
                                        Load more post
                                    </Button>
                                </div>
                            )}
                        </Container>
                    </div>
                );
            })}
        </div>
    );
}

export async function getServerSideProps({ locale }) {
    const { posts, total } = await loadPosts(0, LOAD_MORE);

    return {
        props: {
            initialPosts: posts,
            total,
            locale
        }
    };
}
