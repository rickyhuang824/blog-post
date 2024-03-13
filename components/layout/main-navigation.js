import React from "react";
import Logo from "./logo";
import Link from "next/link";
import classes from "./main-navigation.module.css";

const MainNavigation = () => {
    return (
        <header className={classes.header}>
            <Link href="/">
                <Logo />
            </Link>
            <nav>
                <ul>
                    <li>
                        <Link href="/posts">Posts</Link>
                    </li>
                    <li>
                        <Link href="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link
                            href="https://drive.google.com/file/d/1X13jQRwZgE1F4GFPys9-TgKB1QOuOpB5/view?usp=drive_link"
                            target="_blank"
                        >
                            Resume
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;
