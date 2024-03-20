---
title: "remixJS Note"
date: "2024-03-06"
image: remixJS.jpg
description: Remix is a full stack web framework that lets you focus on the user interface and work back through web standards to deliver a fast, slick, and resilient user experience. People are gonna love using your stuff.
isFeatured: true
---

# RemixJS notes
Remix is NOT an HTTP server, but rather a handler inside an existing HTTP server

## Adapters
The adapter's job is to 

1. convert the incoming request into a Web Fetch Request, then
2. run the Remix handler, then
3. adapt the Web Fetch Response back to the host server's response API

## Remix vs NextJS
![remix-1](remix-1.png)

## Search Params vs Params

1. To get search params like: http://localhost:3000/?q=alex use the request.url since the params argument will not include anything from the ? mark
```javascript
export const loader = async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const q = searchParams.get("q");
    const contacts = await getContacts(q);
    return json({ contacts, q });
};
```

2. To get params like: http://localhost:3000/contacts/alex-anderson use the params argument since it's from the routing (the file name is contacts.$contactId.tsx)
```javascript
export const action = async ({ request, params }: ActionFunctionArgs) => {
    invariant(params.contactId, "Missing contactId param");
    const formData = await request.formData();
    const favorite = formData.get("favorite");
    return updateContact(params.contactId, { favorite: favorite === "true" });
};
```

## fetcher.Form vs Form

With fetcher, it's not a navigation, so the URL doesn't change and the history stack is unaffected.

## FormData

Note the name attribute on the inputs is coupled to the formData.get(fieldName) getter.

## Form Submission and Revalidate

When the user submit the forms:

1. Remix send the formData to the router action via fetch, state becomes submiting, re-render the component
2. after the action complete, loaders are revalidated to get the new data, state becomes loading, re-render the component
3. `useLoaderData` then return the updated value, state becomes idle, re-render the compoent

## Performance 

![remix-1](remix-2.png)
 
 ## Resillient

1. The simplest case is a <Link to="/account">. These render an <a href="/account"> tag that works without JavaScript. When JavaScript loads, Remix will intercept clicks and handle the navigation with client side routing. This gives you more control over the UX instead of just spinning favicons in the browser tab--but it works either way.

2. While your users probably don't browse the web with JavaScript disabled, everybody has JavaScript disabled until it has finished loading. 
