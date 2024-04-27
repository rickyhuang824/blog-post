---
title: "React Note"
date: "2024-03-06"
image: reactjs.png
description: React is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript.
isFeatured: true
---

# React notes

## Preserving and Resetting State

-   It's the position in the UI tree -- not in the JSX markup - that matters to React! 
-   Re-rendering will not reset states, mounted and unmounted will reset states

-   There are two ways to reset state when switching between them:
    - render components in different positions
    - give each components an explicit identiy with `key` (State is associated with the tree position. A key lets you specify a named position instead of relying on order.)

### resetting state at the same position ( The two Counters appear in the same position, so React sees them as the same Counter whose person prop has changed )
```js
export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA ? (
        <Counter person="Taylor" />
      ) : (
        <Counter person="Sarah" />
      )}
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        Next player!
      </button>
    </div>
  );
}
```

### rendering a components in different positions
```js
export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA &&
        <Counter person="Taylor" />
      }
      {!isPlayerA &&
        <Counter person="Sarah" />
      }
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        Next player!
      </button>
    </div>
  );
}
```
![react-1](react-1.png)

-   the reason why the above code snippet is different: the `false` matters when we're talking about the positon of nodes.

    - the second code: This code produces 2 child nodes. If isPlayerA is true, we are outputting a <Counter> element, followed by false. If isPlayerA is false, the two children are now false followed by a <Counter> element. So since the first child has changed types (Counter -> false), it gets unmounted. And since the second child has changed types (false -> Counter), it mounts.

    - the first code: If isPlayerA is true, we output a <Counter>. If isPlayerA is false, we also output a <Counter>. Since the type hasn't changed, no unmounting/remounting occurs, and react just updates the props of the existing instance.

### Resetting state with a key
(In this example, the two <Counter />s don’t share state even though they appear in the same place in JSX)

```js
export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA ? (
        <Counter key="Taylor" person="Taylor" />
      ) : (
        <Counter key="Sarah" person="Sarah" />
      )}
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        Next player!
      </button>
    </div>
  );
```

### hot reloading
- This means every time a change is detected, the browser auto reloads the page and has the ability to build and bundle the entire application when the time comes

### JWT vs Session

- JWT Authentication: Here, the server generates a token that the client stores and presents with each request. It's a stateless method, meaning the server doesn't need to keep a record of the token.
- Session-Based Authentication: Contrarily, it's stateful. The server creates a session for the user and stores session data on the server-side. The client holds only a session identifier, typically in a cookie.


- JWT in Action:
     - Upon user authentication, the server generates a JWT.
     - This JWT is sent back to the client and stored, often in local storage or an HTTP-only cookie.
     - The client includes this token in the HTTP Authorization header for subsequent requests.
     - The server validates the token and grants access if valid.

 - Session in Action:
    - User Authentication: The user provides credentials, which the server verifies.
    - Session Creation: Upon successful authentication, the server creates a session record with a unique identifier, user identifier, session start time, expiry, and possibly additional context like IP address and User Agent. Stores that in Database.
    - Cookie Storage: This session identifier is sent back and stored as a cookie in the user’s browser.
    - Session Validation: Each request from the user’s browser includes this cookie, then server validates the session by querying to Database. If valid, the request is processed.
