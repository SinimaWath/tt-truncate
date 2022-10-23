![workflow](https://github.com/SinimaWath/tt-truncate/actions/workflows/deployment.yml/badge.svg)

# TT Truncate

A tiny, fast, ssr-friendly, zero-deps string truncate React component.

- **Small**: 600 B (minified and gzipped). No dependencies. Size Limit controls the size.
- **Fast**: 500ms (slowdown x6 - mobile cpu) re-drawing time of 4000+ components.
- **SSR**: Ready for SSR. No DOM manipulation.
- **Native Functionality**: Search and copy works as expected from native truncation.

```jsx
import {Truncate} from "tt-truncate";

<div>
    <Truncate tailLength={2}>I Love JetBrains</Truncate>
</div>
```

## Showcases

See our [examples](/docs/examples) and Showcase paragraph for url.
- [Big Table Next JS](/docs/examples/big-table)
- [Create React App](/docs/examples/cra)

## Install

```bash
npm install tt-truncate
```

## Usage

Fit text to container (div). Crop string in the middle.
```jsx
<div>
    <Truncate tailLength={2}>I Love JetBrains</Truncate>
</div>
```

Add custom classes
```jsx
<div>
    <Truncate tailLength={2} className={'custom'}>I Love JetBrains</Truncate>
</div>
```

Add title

```jsx
<div>
    <Truncate tailLength={2} title={'Super Title'}>I Love JetBrains</Truncate>
</div>
```

### Props
| Prop       | Type   | Description                                                                               |
|------------|--------|-------------------------------------------------------------------------------------------|
| children   | string | Must be one line string, without special characters. Otherwise the behaviour is undefined |
| title      | string | Shown on hover                                                                            |
| tailLength | number | Length of tail                                                                            |
| className  | string | Class name applied to text                                                                |


## Browser Compatability

The package works in browsers where display: flex is supported.
