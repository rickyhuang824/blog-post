import React from "react";
import PostHeader from "./post-header";
import classes from "./post-content.module.css";
import ReactMarkdown from "react-markdown";

const DUMMY_POSTS = {
    title: "title 1",
    slug: "slug-1",
    date: "2022-02-02",
    image: "next.png",
    content: "# This is a first post",
};

const PostConent = () => {
    const imagePath = `/images/posts/${DUMMY_POSTS.slug}/${DUMMY_POSTS.image}`;

    return (
        <article className={classes.content}>
            <PostHeader title={DUMMY_POSTS.title} image={imagePath} />
            <ReactMarkdown>{DUMMY_POSTS.content}</ReactMarkdown>
        </article>
    );
};

export default PostConent;
