import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "posts");

const getPostsFiles = () => {
    return fs.readdirSync(postsDir);
};

const getPostData = (postIdentifier) => {
    const postSlug = postIdentifier.replace(/\.md$/, "");
    const filePath = path.join(postsDir, `${postSlug}.md`);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    const postData = {
        slug: postSlug,
        ...data,
        content,
    };

    return postData;
};

const getAllPosts = () => {
    const postsFiles = getPostsFiles();
    const allPosts = postsFiles.map((postFile) => getPostData(postFile));
    const sortedPosts = allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));

    return sortedPosts;
};

const getFeaturedPosts = () => {
    const allPosts = getAllPosts();
    const featuredPosts = allPosts.filter((post) => post.isFeatured);

    return featuredPosts;
};

export { getPostData, getFeaturedPosts, getAllPosts, getPostsFiles };
