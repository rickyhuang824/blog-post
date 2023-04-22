import AllPosts from "@/components/posts/all-posts";
import { getAllPosts } from "@/lib/posts-util";
import Head from "next/head";

const AllPostsPage = ({ posts }) => {
    return (
        <>
            <Head>
                <title>All Posts</title>
            </Head>
            <AllPosts posts={posts} />
        </>
    );
};

export const getStaticProps = () => {
    const allPosts = getAllPosts();

    return {
        props: {
            posts: allPosts,
        },
    };
};

export default AllPostsPage;
