import ContactForm from "@/components/contact/contact-form";
import Head from "next/head";
import React from "react";

const ContactPage = () => {
    return (
        <>
            <Head>
                <title>Contact Me</title>
            </Head>
            <ContactForm />;
        </>
    );
};

export default ContactPage;
