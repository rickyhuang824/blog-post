import PostConent from "@/components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "@/lib/posts-util";
import Head from "next/head";

const PostDetailPage = ({ post }) => {
    return (
        <>
            <Head>
                <title>{post.slug}</title>
                <meta name="description" content={post.description} />
            </Head>
            <PostConent post={post} />
        </>
    );
};

export const getStaticProps = (context) => {
    const { params } = context;
    const post = getPostData(params.slug);

    return { props: { post }, revalidate: 600 };
};

export const getStaticPaths = (context) => {
    const postsFileNames = getPostsFiles();
    const slugs = postsFileNames.map((filename) =>
        filename.replace(/\.md$/, "")
    );

    return {
        paths: slugs.map((slug) => ({ params: { slug: slug } })),
        fallback: false,
    };
};

export default PostDetailPage;
