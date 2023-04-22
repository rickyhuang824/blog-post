import { useContext, useRef } from "react";
import classes from "./contact-form.module.css";
import { NotificationContext } from "@/store/notification-context";
import Notification from "../ui/notification";

const ContactForm = () => {
    const emailRef = useRef();
    const nameRef = useRef();
    const messageRef = useRef();
    const notificationCtx = useContext(NotificationContext);
    const notifications = notificationCtx.notifications;

    const formSubmitHandler = (e) => {
        e.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredName = nameRef.current.value;
        const enteredMessage = messageRef.current.value;

        notificationCtx.showNotifications({
            title: "sending info",
            message: "sending info to the backend",
            status: "pending",
        });

        fetch("/api/contact", {
            method: "POST",
            body: JSON.stringify({
                email: enteredEmail,
                name: enteredName,
                message: enteredMessage,
            }),
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }

                return response.json().then((data) => {
                    throw new Error(data.message || "Something went wrong");
                });
            })
            .then((responseData) => {
                notificationCtx.showNotifications({
                    title: "Sucessfully sent info",
                    message: "Sent info to the backend",
                    status: "success",
                });
                emailRef.current.value = "";
                nameRef.current.value = "";
                messageRef.current.value = "";
            })
            .catch((error) => {
                notificationCtx.showNotifications({
                    title: "Failed sent info",
                    message: "Somthing wrong when sending the info",
                    status: "error",
                });
            });
    };

    return (
        <section className={classes.contact}>
            {notifications && (
                <Notification
                    title={notifications.title}
                    message={notifications.message}
                    status={notifications.status}
                />
            )}
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
