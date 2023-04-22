const { createContext, useState, useEffect } = require("react");

export const NotificationContext = createContext({
    notifications: { title: "", message: "", status: "" },
    showNotifications: () => {},
    hideNotifications: () => {},
});

const NotificationContextProvider = (props) => {
    const [activeNotification, setActiveNotification] = useState(null);

    useEffect(() => {
        if (
            activeNotification &&
            (activeNotification.status === "success" ||
                activeNotification.status === "error")
        ) {
            const timer = setTimeout(() => hideNotifications(), 3000);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [activeNotification]);

    const showNotifications = ({ title, message, status }) => {
        setActiveNotification({ title, message, status });
    };

    const hideNotifications = () => {
        setActiveNotification(null);
    };

    const context = {
        notifications: activeNotification,
        showNotifications: showNotifications,
        hideNotifications: hideNotifications,
    };

    return (
        <NotificationContext.Provider value={context}>
            {props.children}
        </NotificationContext.Provider>
    );
};

export default NotificationContextProvider;
