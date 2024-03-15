---
title: "remixJS Note"
date: "2024-03-06"
image: remixJS.jpg
description: Remix is a full stack web framework that lets you focus on the user interface and work back through web standards to deliver a fast, slick, and resilient user experience. People are gonna love using your stuff.
isFeatured: true
---

# RemixJS notes

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

