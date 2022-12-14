/*
I make this because sometimes i have to create a function only to get a value. example: if condition
This happens because in TS/JS not all things are expressions.
So i create this shorthand to receive a function and execute to get this behaviour.
See an example of this in: src/components/Form/SignInModal/SignIn/index.tsx in line 61.
*/
export const f = <A>(fn: () => A) => fn()
