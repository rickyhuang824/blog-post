import React from "react";
import PostItem from "./post-item";
import classes from "./posts-grid.module.css";

const PostsList = (props) => {
    const { posts } = props;
    return (
        <ul className={classes.list}>
            {posts.map((post) => (
                <PostItem post={post} />
            ))}
        </ul>
    );
};

export default PostsList;
