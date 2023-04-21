import Image from "next/image";
import Link from "next/link";
import React from "react";
import classes from "./post-item.module.css";

const PostItem = (props) => {
    const { title, image, description, date, slug } = props.post;

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <li className={classes.post}>
            <Link>
                <div className={classes.iamge}>
                    <Image />
                </div>
                <div className={classes.content}>
                    <h3>{title}</h3>
                    <time>{formattedDate</time>
                    <p>{description}</p>
                </div>
            </Link>
        </li>
    );
};

export default PostItem;
