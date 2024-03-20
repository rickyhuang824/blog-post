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

### Typescript interface vs type aliase

1. interfaces will detect property or method name conflicts at compile time and generate an error, whereas type intersections will merge the properties or methods without throwing errors. Therefore, if we need to overload functions, type aliases should be used

![typescript-1](typescript-1.png)
![typescript-2](typescript-2.png)

2. Declaration merging is a feature that is exclusive to interfaces.
```js

interface Client {
    name: string;
}

interface Client {
    age: number;
}

const harry: Client = {
    name: "Harry";
    age: 18;
}

```
