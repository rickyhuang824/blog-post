import React from "react";
import classes from "./hero.module.css";
import Image from "next/image";

const Hero = () => {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image
                    src={"/images/site/profile.jpg"}
                    alt="My Portfolio Image"
                    width={300}
                    height={267}
                />
            </div>
            <h1>Hi, I am Ricky</h1>
            <p>I blog about web development knowledges I have learn</p>
        </section>
    );
};

export default Hero;
