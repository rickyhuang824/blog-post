import FeaturedPosts from "@/components/home-page/featured-posts";
import Hero from "@/components/home-page/hero";
import { getFeaturedPosts } from "@/lib/posts-util";

const HomePage = ({ featuredPosts }) => {
    return (
        <>
            <Hero />
            <FeaturedPosts posts={featuredPosts} />
        </>
    );
};

export const getStaticProps = () => {
    const featuredPosts = getFeaturedPosts();

    return {
        props: {
            featuredPosts,
        },
        // revalidate: 1800
    };
};

export default HomePage;
