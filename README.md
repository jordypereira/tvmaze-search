# tvmaze-search

> 29 May 2021

Demo project using TVMaze.

Using Vue3 + TypeScript + Setup Sugar Syntax

Autocomplete component
1. Tried out Github-Elements autocomplete. Seems ahrd to use, it expects the server to return <li> elements.

Then I implemented my own search with `<input type="search">` and composables.

1. Tried out HeadlessUI Lists. These Lists seemed to not work without the button to toggle them open.
2. Tried out HeadlessUI RadioGroup. Even though they are not made for this, it worked.

## Tech
  - Vite
  - Vue3
  - WindiCSS
  - TypeScript
  - Setup Sugar Syntax
  - HeadlessUI

## Todo
- Add unit & E2E Testing