import { useRef } from "react";
import classes from "./contact-form.module.css";

const ContactForm = () => {
    const emailRef = useRef();
    const nameRef = useRef();
    const messageRef = useRef();

    const formSubmitHandler = (e) => {
        e.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredName = nameRef.current.value;
        const enteredMessage = messageRef.current.value;

        fetch("/api/contact", {
            method: "POST",
            body: JSON.stringify({
                email: enteredEmail,
                name: enteredName,
                message: enteredMessage,
            }),
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                emailRef.current.value = "";
                nameRef.current.value = "";
                messageRef.current.value = "";
            });
    };

    return (
        <section className={classes.contact}>
            <h1>How can I help you ?</h1>
            <form className={classes.form} onSubmit={formSubmitHandler}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor="email">Your Email</label>
                        <input
                            type="email"
                            id="email"
                            required
                            ref={emailRef}
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="name">Your Name</label>
                        <input type="text" id="name" required ref={nameRef} />
                    </div>
                </div>

                <div className={classes.control}>
                    <label htmlFor="message">Your Message</label>
                    <textarea
                        name=""
                        id="message"
                        rows="5"
                        required
                        ref={messageRef}
                    />
                </div>

                <div className={classes.action}>
                    <button>Send Message</button>
                </div>
            </form>
        </section>
    );
};

export default ContactForm;
