import React from "react";
import classes from "./all-posts.module.css";
import PostsList from "./posts-grid";

const AllPosts = (props) => {
    return (
        <section className={classes.posts}>
            <h1>All Posts</h1>
            <PostsList posts={props.posts} />
        </section>
    );
};

export default AllPosts;
