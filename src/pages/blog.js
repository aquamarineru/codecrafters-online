import React, { useState } from "react";
import { Container, Button, PostGrid, Post } from "@/components";
import Link from "next/link";
import { PiArrowLeftLight } from 'react-icons/pi';
import { loadPosts } from './api/posts';

const LOAD_MORE = 4;

export default function Blog({ initialPosts, total, locale }) {
    console.log(initialPosts)
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
        <div className="bg-dark h-full w-full text-light">
            {Array.isArray(posts) && posts.map(post => {
                return (
                    <div key={post._id} className="px-6">
                        <Container className='pt-24'>
                            <PostGrid className=' '>
                                <Post 
                                        title={post.title}
                                        image={post.image}
                                        slug={post.slug}
                                        subtitle={post.subtitle}
                                        tags={post.tags}
                                        locale={locale}
                                    />
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
