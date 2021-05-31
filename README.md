# tvmaze-search

> 29 May 2021

Demo project using TVMaze.

Using Vue3 + TypeScript + Setup Sugar Syntax

Autocomplete component
1. Tried out Github-Elements autocomplete. Seems difficult to use because for one it expects the server to return `<li>` elements.

So I implemented my own search with `<input type="search">` and composables.

1. Tried out HeadlessUI Lists. These Lists seemed to not work without the button to toggle them open.
2. Tried out HeadlessUI RadioGroup. Even though they are not made for this, they seem to work well and have accessibility out of the box.

## Tech
  - Vite
  - Vue3
  - WindiCSS
  - TypeScript
  - Setup Sugar Syntax
  - HeadlessUI

## Todo
- Add unit & E2E Testing