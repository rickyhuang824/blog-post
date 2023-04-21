import FeaturedPosts from "@/components/home-page/featured-posts";
import Hero from "@/components/home-page/hero";

const DUMMY_POSTS = [
    {
        title: "title 1",
        slug: "slug-1",
        description: "d 1",
        date: "2022-02-02",
        image: "next.png",
    },
    {
        title: "title 1",
        slug: "slug-2",
        description: "d 1",
        date: "2022-02-02",
        image: "next.png",
    },
    {
        title: "title 1",
        slug: "slug-3",
        description: "d 1",
        date: "2022-02-02",
        image: "next.png",
    },
    {
        title: "title 1",
        slug: "slug-4",
        description: "d 1",
        date: "2022-02-02",
        image: "next.png",
    },
];

const HomePage = () => {
    return (
        <>
            <Hero />
            <FeaturedPosts posts={DUMMY_POSTS} />
        </>
    );
};

export default HomePage;
