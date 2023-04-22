import Layout from "@/components/layout/layout";
import NotificationContextProvider from "@/store/notification-context";
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
    return (
        <NotificationContextProvider>
            <Head>
                <title>Ricky&apos;s Blog</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </NotificationContextProvider>
    );
}
