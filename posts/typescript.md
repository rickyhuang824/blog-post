---
title: "Typescirt Note"
date: "2024-03-25"
image: typescript.png
description: TypeScript is JavaScript With Syntax For Types
isFeatured: false
---


# Typescript interface vs type aliase

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

# Generics

1. Generic programming is a style of computer programming in which algorithms are written in terms of data types to-be-specified-later that are then instantiated when needed for specific types provided as parameters.

2. A type variable is a special kind of variable that works on types rather than values.

3. Generic Constraints: They enable us to limit (restrict or constrain) the types that can be provided for our type variables. This way, our function will accept arrays, but it will not accept non-array types

- 
```js
function loggingIdentity<Type>(arg: Type): Type {
  console.log(arg.length);
// error message: Property 'length' does not exist on type 'Type'.
  return arg;
}
```

-
```js
interface Lengthwise {
  length: number;
}
 
function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}
```
