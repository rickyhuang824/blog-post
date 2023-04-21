import PostConent from "@/components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "@/lib/posts-util";

const PostDetailPage = ({ post }) => {
    return <PostConent post={post} />;
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
