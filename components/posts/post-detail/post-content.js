import React from "react";
import PostHeader from "./post-header";
import classes from "./post-content.module.css";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import remarkGfm from "remark-gfm";

SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("css", css);

const PostConent = ({ post }) => {
    const imagePath = `/images/posts/${post.slug}/${post.image}`;

    const customRenderes = {
        img: (image) => {
            return (
                <Image
                    src={`/images/posts/${post.slug}/${image.src}`}
                    alt={image.alt}
                    width={800}
                    height={500}
                />
            );
        },
        code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const returnValue =
                !inline && match ? (
                    <SyntaxHighlighter
                        {...props}
                        style={atomDark}
                        language={match[1]}
                        PreTag="div"
                    >
                        {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                ) : (
                    <code {...props} className={className}>
                        {children}
                    </code>
                );

            return returnValue;
        },
    };

    return (
        <article className={classes.content}>
            <PostHeader title={post.title} image={imagePath} />
            <ReactMarkdown
                components={customRenderes}
                remarkPlugins={[remarkGfm]}
            >
                {post.content}
            </ReactMarkdown>
        </article>
    );
};

export default PostConent;
