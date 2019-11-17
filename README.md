# Prototype of React to Figma renderer using bridge communication
Renders React components to the Figma's canvas

## Motivation
It's just a proof of concept that rendering is possible using "bridge" abstraction (React Native-like architecture)

## Pros
- Provides DX that react developers are familiar with
- Allows to use React DevTools (and probably React Refresh in future)
- No need to polyfill `fetch` and other browser's APIs

## Cons
- ⚠️ **Possible performance drop**
- It's just a concept