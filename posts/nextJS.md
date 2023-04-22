---
title: "NextJS Note"
date: "2023-04-2"
image: nextJS.png
description: The React Framework for the Web. Next.js enables you to create full-stack Web applications by extending the latest React features, and integrating powerful Rust-based JavaScript tooling for the fastest builds.
isFeatured: true
---

# NextJs notes

This is a note for Next.js knowledge

## File Base system

## useRouter

```javascript
const router = useRouter();

console.log(router.pathname);
console.log(router.query);
```

### catch-all routes

## Navigate with Link component

### the way with React"

```javascript
const ClientPage = () => {
    const clients = [
        { id: "max", name: "max" },
        { id: "ricky", name: "ricky" },
    ];

    return (
        <div>
            <h1>ClientPage</h1>
            <ul>
                {clients.map((client) => {
                    return (
                        <li key={client.id}>
                            <Link href={`/clients/${client.id}`}>
                                {client.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ClientPage;
```

### different way to set the dynamic link comoponent:

```javascript
const ClientPage = () => {
    const clients = [
        { id: "max", name: "max" },
        { id: "ricky", name: "ricky" },
    ];

    return (
        <div>
            <h1>ClientPage</h1>
            <ul>
                {clients.map((client) => {
                    return (
                        <li key={client.id}>
                            <Link
                                href={{
                                    pathname: "/clients/[id]",
                                    query: { id: client.id },
                                }}
                            >
                                {client.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
```

## Navigate Programmatically

```javascript
router.push("/clients/max");
router.push("/clients/max"); //can't go back
router.push({
    pathname: "/clients/[id]/[clientprojectId]",
    query: { id: "max", clientprojectId: "1" },
});
```

## \_app.js:

-   this is the root componet where all the page components render in, you could add the layout component here

## useRouter access the url data on the second time render

## Data Fetching

![renderings](renderings.png)

By default, NextJS pre-renders all pages on server side.

-   Pre-rendering only affects the initial load(first time the website or refresh the website), so just the initial page which we visited is pre-rendered, so only the pages file coudl use it

### Static Generation (general in build time, before deployment, you could also set re-run using revalidate so you do not need to re-build it all the time)

-   You could run any code that could normally run on the server side only, not any client side, no access to any client API. Codes inside will NOT be included in the bundle sent back to the client. The code will never end up in client side

-   it run the getStaticProps first, then your component code, must always return an object with props key

#### getStaticProps

```js
export async function getStaticProps() {
    return { props: {} };
}
```

-   Incremental Static Generation:
    ![static-generation-1](static-generation-1.png)

    ```javascript
    export async function getStaticProps() {
        const fs = require("fs").promises;
        const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
        const jsonData = await fs.readFile(filePath);
        const data = JSON.parse(jsonData);

        return {
            props: {
                product: data.products,
            },
            revalidate: 10,
        };
    }
    ```

    when the user load(like refresh the page) the page, the server will check if the time of pages last time got generated is more than 10 second ago, if yes, re-run the getStaticProps function

-   the notFound and redirect:

    ```javascript
    export async function getStaticProps() {
        const fs = require("fs").promises;
        const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
        const jsonData = await fs.readFile(filePath);
        const data = JSON.parse(jsonData);

        if (!data) {
            return { redirect: { destination: "https://google.com" } };
        }

        if (!data.products) {
            return { notFound: true };
        }

        return {
            props: {
                product: data.products,
            },
            revalidate: 120,
        };
    }
    ```

-   `context` to get hold of the url param values in the path

#### getStaticPaths

-   `getStaticPaths` - for dynamic page, the default behavior is not to pre-generate the page since nextjs will not know what dynamic value need to be support - `Pre-Generated Paths (Routes)`
    ![static-generation-2](static-generation-2.png) - `getStaticPaths` is to tell nextjs which dynamic path should be generated

    ```javascript
    export const getStaticProps = async (context) => {
        const { params } = context;
        const productId = params.pid;

        const fs = require("fs").promises;
        const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
        const jsonData = await fs.readFile(filePath);
        const data = JSON.parse(jsonData);
        if (!data) {
            return { redirect: { destination: "https://google.com" } };
        }

        if (!data.products) {
            return { notFound: true };
        }

        return {
            props: {
                product: data.products.find(
                    (product) => product.id === productId
                ),
            },
        };
    };

    export const getStaticPaths = async () => {
        return {
            paths: [{ params: { pid: "p1" } }, { params: { pid: "p2" } }],
            fallback: false,
        };
    };
    ```

    `getStaticProps` will get called two times since there are two elements in the paths array

-   getStaticPaths and Link Prefetching:
    -   For the links that are going to the dynamice generated page, it will use the pre-generated json file that contains the props data for that dynamice generated page to render a new page, so it will not make a server request, just render the page like regular react. (pre-generated json file, run build to see this in action)
-   fallback:
    fallback: true is useful if your app has a very large number of static pages that depend on data (such as a very large e-commerce site). If you want to pre-render all product pages, the builds would take a very long time.

    Instead, you may statically generate a small subset of pages and use fallback: true for the rest. When someone requests a page that is not generated yet, the user will see the page with a loading indicator or skeleton component.
    (Refer to the nextjs docs)

    -   when fallback set to true, when you land on the dynamice page by entering the url, it acts like the standard React client side rendering, like using useEffect and setState, so you need to add the logic when the page is still generating on server

    -   when fallback is set to true, we could also set the not found page in the case that the user enter a url with an invalid url param, like a non-exist product id.

    ```javascript
    export const getStaticProps = async (context) => {
        const { params } = context;
        const productId = params.pid;

        const data = await getData();

        if (!data) {
            return { redirect: { destination: "https://google.com" } };
        }

        const product = data.products.find(
            (product) => product.id === productId
        );
        if (!product) {
            return { notFound: true };
        }

        return {
            props: {
                product: product,
            },
        };
    };

    export const getStaticPaths = async () => {
        const { products } = await getData();
        const ids = products.map((product) => product.id);
        const pathsWithParams = ids.map((id) => ({
            params: {
                pid: id,
            },
        }));

        return {
            paths: pathsWithParams,
            fallback: true,
        };
    };
    ```

### Server-side rendering (runs in server after deployments)

-   static generation make the request in build time, so it does not have access for the actual incoming user request
-   server-side rendering is re-executed for every incoming request other than the revalidate in staticProps that only re-executed after a set period of time

-   both SSR and Static generation get props for the component

    ![server-side-rendering](server-side-rendering.png)

    ```javascript
    import React from "react";

    const UserIdPage = (props) => {
        return <div>{props.id}</div>;
    };

    export default UserIdPage;

    export const getServerSideProps = async (context) => {
        const { params, req, res } = context;
        return {
            props: { id: "user-id" + params.uid },
        };
    };
    ```

### Client Side Rendering

![client-side](client-side.png)

```javascript
import React, { useEffect, useState } from "react";

const LastSale = () => {
    const [sales, setSales] = useState();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetch(
            "https://nextjs-course-e7f0b-default-rtdb.firebaseio.com/sales.json"
        )
            .then((response) => response.json())
            .then((data) => {
                const transformedSales = [];

                for (const key in data) {
                    transformedSales.push({
                        id: key,
                        username: data[key].username,
                        volume: data[key].volume,
                    });
                }
                setSales(transformedSales);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <ul>
            {sales.map((sale) => (
                <li key={sale.id}>
                    {sale.username} - {sale.volume}
                </li>
            ))}
        </ul>
    );
};

export default LastSale;
```

#### useSWR

-   this hook will bundle multiple requests to the same URL, which are sent in a certain time frame into one request to avoid sending dozens of small requests

```javascript
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((response) => response.json());
const LastSale = () => {
    const [sales, setSales] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    const { data, error, isLoading } = useSWR(
        "https://nextjs-course-e7f0b-default-rtdb.firebaseio.com/sales.json",
        fetcher
    );

    useEffect(() => {
        if (data) {
            const transformedSales = [];
            for (const key in data) {
                transformedSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume,
                });
            }
            setSales(transformedSales);
        }
    }, [data]);

    // useEffect(() => {
    //     console.log(data);
    //     if (data) {
    //         setSales(data);
    //     }
    // }, [data]);

    // useEffect(() => {
    //     fetch(
    //         "https://nextjs-course-e7f0b-default-rtdb.firebaseio.com/sales.json"
    //     )
    //         .then((response) => response.json())
    //         .then((data) => {
    //             const transformedSales = [];

    //             for (const key in data) {
    //                 transformedSales.push({
    //                     id: key,
    //                     username: data[key].username,
    //                     volume: data[key].volume,
    //                 });
    //             }
    //             console.log(transformedSales);
    //             setSales(transformedSales);
    //             setIsLoading(false);
    //         });
    // }, []);

    if (error) {
        return <p>There is an error</p>;
    }

    if (isLoading || !data || !sales) {
        return <p>Loading...</p>;
    }

    return (
        <ul>
            {sales.map((sale) => (
                <li key={sale.id}>
                    {sale.username} - {sale.volume}
                </li>
            ))}
        </ul>
    );
};

export default LastSale;
```

### Combining Pre-fetching with Client-side fetching

```javascript
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((response) => response.json());
const LastSale = (props) => {
    const [sales, setSales] = useState(props.sales);
    // const [isLoading, setIsLoading] = useState(true);

    const { data, error, isLoading } = useSWR(
        "https://nextjs-course-e7f0b-default-rtdb.firebaseio.com/sales.json",
        fetcher
    );

    useEffect(() => {
        if (data) {
            const transformedSales = [];
            for (const key in data) {
                transformedSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume,
                });
            }
            setSales(transformedSales);
        }
    }, [data]);

    if (error) {
        return <p>There is an error</p>;
    }

    return (
        <ul>
            {sales.map((sale) => (
                <li key={sale.id}>
                    {sale.username} - {sale.volume}
                </li>
            ))}
        </ul>
    );
};

export const getStaticProps = async () => {
    const data = await fetch(
        "https://nextjs-course-e7f0b-default-rtdb.firebaseio.com/sales.json"
    ).then((response) => response.json());

    const transformedSales = [];

    for (const key in data) {
        transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
        });
    }

    return {
        props: { sales: transformedSales },
        revalidate: 1000,
    };
};

export default LastSale;
```

|                   | Static Generation | Server Side Rendering        | Client Side Rendering |
| ----------------- | ----------------- | ---------------------------- | --------------------- |
| SEO               | Yes               | Yes                          | No                    |
| User-Specify      | No                | Yes                          | Yes                   |
| run in build time | Yes               | No                           | No                    |
| Update frequently | No                | render on server per request | Yes                   |

## Optimizing NextJS Apps

### Meta data

-   next/head With this hook, you can add the <Head></Head> to anywhere, nextjs will inject it to the right place in the head section of the html

#### Dynamic head content

-   by default, nextjs will initial render the page on server, not runing the useEffect

#### \_app.js:

root component of your website, you could add universal meta data there like: head

```javascript
<Layout>
        <Head>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
        </Head>
        <Component {...pageProps} />
</Layout>
);
```

-   Merge <Head> and solve the conflict with the latest tag

#### \_document.js

You can imagine app JS as the root component

inside of the body section of your HTML document.

Document JS allows you to customize

the entire HTML document.

So all the elements that make up an HTML document,

if you need to do that,

you can add to the \_documented JS file.

And then you need to add a special component in there,

a class-based component, as it turns out,

which you could name my document,

and it has to be a class-based component

because it must extend some component offered

and provided by next JS

### Optimize for images

-   next/image

-   You still override width and height, as you set it here with your CSS styles. So if you give the image a hard-coded width and height, those CSS styles still kick in. The width and height, you set here only determine the image size that will be fetched in the end. The final styling is still being done with CSS.

```javascript
<Image src={`/${image}`} alt={imageAlt} width={300} height={300} />
```

## API Routes

![api-route](api.png)

## How to Build a NextJS App

-   set up the core page
-   Layout (`<main>` tag)

## \_document.js vs. \_app.js

You can use the \_document to set lang, load fonts, load scripts before page interactivity, collect style sheets for CSS in JS solutions like Styled Components, among a few other things.

-   https://nextjs.org/docs/advanced-features/custom-document
-   https://nextjs.org/docs/basic-features/font-optimization
-   https://nextjs.org/docs/basic-features/script#beforeinteractive
-   https://github.com/vercel/next.js/blob/canary/examples/with-styled-components/pages/_document.tsx

For example, applying a CSS class to the body of the page, as part of the render logic, is not possible in \_app. It is only possible via side-effects.

And that's about it. Some often try to inject initial data, and other discouraged things in \_document, which you're probably better off ignoring.

\_app in the other hand, is more of a page initialiser, from the docs:

Next.js uses the App component to initialize pages. You can override it and control the page initialization. Which allows you to do amazing things like:

Persisting layout between page changes
Keeping state when navigating pages
Custom error handling using componentDidCatch
Inject additional data into pages
-Add global CSS
All of that because \_app actually does get executed at runtime!
also you could use \_document along with React Portals

## Deploy NextJS Apps

![deployment](deployment.png)

-   deploy steps && considerations:

    ![deployment-1](deployment-1.png)

-   .env.local always overrides the defaults set.

-   connect git with vercel
