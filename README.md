<p align="center">
    <a href="https://github.com/XiaoYimi/color-processor/"><b>Website</b></a> •
    <a href="https://www.npmjs.com/package/color-processor"><b>Documentation</b></a>
</p>

<div align="center">

[![npm version](https://img.shields.io/badge/npm-v10.2.3-blue?logo=npm)](https://www.npmjs.org/package/npm) [![vite version](https://img.shields.io/badge/vite-v5.2.0-blue?logo=vite)](https://www.npmjs.org/package/npm) [![typescript version](https://img.shields.io/badge/typescript-v5.2.2-blue?logo=typescript)](https://www.npmjs.com/package/typescript)

</div>

## Table of COntents

- [Statement](#statement)
- [Features](#features)
- [Installing](#installing)
- [API](#api)

## Statement

- 版本`v0.0.1`为基础版本,软件包的类型声明引用存在问题;
- 版本`v0.0.5`及之前版本,处于开发探索、修复阶段,切勿直接使用;
- 版本`v0.0.6`,处于稳定阶段,但`README.md`文档未更新;
- 版本`v0.0.7`及之后版本,处于稳定阶段,`README.md`文档已更新;可放心使用;

## Features

## Installing

### Package manager

Using npm:

```bash
$ npm install color-processor
```

Using bower:

```bash
$ bower install color-processor
```

Using yarn:

```bash
$ yarn add color-processor
```

Using pnpm:

```bash
$ pnpm add color-processor
```

On demand import, you can handle it this way:

```ts
import { TO_HEX } from 'color-processor';
console.log(TO_HEX({ r: 12, g: 34, b: 56 }));
```

Global import, you can handle it this way:

```ts
import * as ColorProcessor from 'color-processor';
console.log(ColorProcessor.TO_HEX({ r: 12, g: 34, b: 56 }));
```

HTML Link Using:

```ts
/** 本地测试: 需开启本地服务进行测试; 否则出现跨域报错提示; */
 <script
    type="module"
    src="/node_modules/color-processor/dist/color-processor.umd.js"
></script>

<script type="module">
    /** 全局变量 ColorProcessor  */
    console.log(ColorProcessor);
</script>

```

## API

### `RGB_TO_HSL(rgb: RGB): HSL`

颜色转换: `RGB`颜色对象转换为`HSL`颜色对象;

#### Parameters

| Name | Type  | Description   |
| ---- | ----- | ------------- |
| rgb  | `RGB` | `RGB`颜色对象 |

#### Return

`HSL`

#### Example

```ts
import { RGB_TO_HSL } from 'color-processor';

console.log(RGB_TO_HSL({ r: 12, g: 34, b: 56 }));
```

### `HSL_TO_RGB(hsl: HSL): RGB`

颜色转换: `HSL`颜色对象转换为`RGB`颜色对象;

#### Parameters

| Name | Type  | Description   |
| ---- | ----- | ------------- |
| hsl  | `HSL` | `HSL`颜色对象 |

#### Return

`RGB`

#### Example

```ts
import { HSL_TO_RGB } from 'color-processor';

console.log(HSL_TO_RGB({ h: 0.5, s: 0.3, l: 0.25 }));
```

### `RGB_TO_HEX(rgb: RGB): HEX`

颜色转换:`RGB`颜色对象转换为`HEX`颜色对象;

Parameters

| Name | Type  | Description   |
| ---- | ----- | ------------- |
| rgb  | `RGB` | `RGB`颜色对象 |

#### Return

`HEX`

#### Example

```ts
import { RGB_TO_HEX } from 'color-processor';

console.log(RGB_TO_HEX({ r: 12, g: 34, b: 56 }));
```

### `HEX_TO_RGB(hex: HEX): RGB`

颜色转换:`HEX`颜色对象转换为`RGB`颜色对象;

Parameters

| Name | Type  | Description   |
| ---- | ----- | ------------- |
| hex  | `HEX` | `HEX`颜色对象 |

#### Return

`RGB`

#### Example

```ts
import { HEX_TO_RGB } from 'color-processor';

console.log(HEX_TO_RGB('#2e467f'));
```

### `HEX_TO_HSL(hex: HEX): HSL`

颜色转换:`HEX`颜色对象转换为`HSL`颜色对象;

Parameters

| Name | Type  | Description   |
| ---- | ----- | ------------- |
| hex  | `HEX` | `HEX`颜色对象 |

#### Return

`HSL`

#### Example

```ts
import { HEX_TO_HSL } from 'color-processor';

console.log(HEX_TO_HSL('#2e467f'));
```

### `HSL_TO_HEX(hsl: HSL): HEX`

颜色转换:`HSL`颜色对象转换为`HEX`颜色对象;

Parameters

| Name | Type  | Description   |
| ---- | ----- | ------------- |
| hsl  | `HSL` | `HSL`颜色对象 |

#### Return

`HEX`

#### Example

```ts
import { HSL_TO_HEX } from 'color-processor';

console.log(HSL_TO_HEX({ h: 0.5, s: 0.3, l: 0.25 }));
```

### `TO_HEX(color: HEX | HSL | RGB): HEX`

颜色转换: 任意格式颜色对象转换为`HEX`颜色对象;

Parameters

| Name  | Type                    | Description      |
| ----- | ----------------------- | ---------------- |
| color | `HEX` \| `HSL` \| `RGB` | 任意格式颜色对象 |

#### Return

`HEX`

#### Example

```ts
import { TO_HEX } from 'color-processor';

console.log(TO_HEX('#2e467f'));
console.log(TO_HEX({ r: 12, g: 34, b: 56 }));
console.log(TO_HEX({ h: 0.5, s: 0.3, l: 0.25 }));
```

### `TO_HSL(color: HEX | HSL | RGB): HSL`

颜色转换: 任意格式颜色对象转换为`HSL`颜色对象;

Parameters

| Name  | Type                    | Description      |
| ----- | ----------------------- | ---------------- |
| color | `HEX` \| `HSL` \| `RGB` | 任意格式颜色对象 |

#### Return

`HSL`

#### Example

```ts
import { TO_HSL } from 'color-processor';

console.log(TO_HSL('#2e467f'));
console.log(TO_HSL({ r: 12, g: 34, b: 56 }));
console.log(TO_HSL({ h: 0.5, s: 0.3, l: 0.25 }));
```

### `TO_RGB(color: HEX | HSL | RGB): RGB`

颜色转换: 任意格式颜色对象转换为`RGB`颜色对象;

Parameters

| Name  | Type                    | Description      |
| ----- | ----------------------- | ---------------- |
| color | `HEX` \| `HSL` \| `RGB` | 任意格式颜色对象 |

#### Return

`RGB`

#### Example

```ts
import { TO_RGB } from 'color-processor';

console.log(TO_RGB('#2e467f'));
console.log(TO_RGB({ r: 12, g: 34, b: 56 }));
console.log(TO_RGB({ h: 0.5, s: 0.3, l: 0.25 }));
```

### `BLEND_COLOR(base: HEX | HSL | RGB, blend: HEX | HSL | RGB, level: number ): RGB`

颜色混合: 获取基础色、混合色所构成一定亮度的色值

Parameters

| Name  | Type                    | Description                                |
| ----- | ----------------------- | ------------------------------------------ |
| base  | `HEX` \| `HSL` \| `RGB` | 基础色                                     |
| blend | `HEX` \| `HSL` \| `RGB` | 混合色                                     |
| level | `number`                | 亮度，取值范围 0-1，0 为基础色，1 为混合色 |

#### Return

`RGB`

#### Example

```ts
import { BLEND_COLOR } from 'color-processor';

console.log(BLEND_COLOR('#2e467f', '#ff0000', 0.5));
console.log(BLEND_COLOR({ r: 12, g: 34, b: 56 }, { r: 12, g: 34, b: 56 }, 0.5));
```

### `BLEND_LEVEL_COLOR(base: HEX | HSL | RGB): BlendLevelColor`

颜色混合: 获取基础色与不同亮度下的色值

Parameters

| Name | Type                    | Description |
| ---- | ----------------------- | ----------- |
| base | `HEX` \| `HSL` \| `RGB` | 基础色      |

#### Return

`BlendLevelColor`

#### Example

```ts
import { BLEND_LEVEL_COLOR } from 'color-processor';

console.log(BLEND_LEVEL_COLOR('#2e467f'));
```

## License

[MIT](LICENSE)
