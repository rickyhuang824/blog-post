import React from "react";
import classes from "./logo.module.css";
import Image from "next/image";

const Logo = () => {
    return (
        <div className={classes.logo}>
            {/* <Image
                src={"/images/site/logo.jpg"}
                alt="logo"
                width={300}
                height={300}
            /> */}
            Ricky&apos;s Blog
        </div>
    );
};

export default Logo;
