export type RGB = {
  r: number;
  g: number;
  b: number;
};

export type HSL = {
  h: number;
  s: number;
  l: number;
};

export type HEX = string;

/** ======== 颜色混合等级色 ======== */
export const LEVEL = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
export type LevelColor = Record<(typeof LEVEL)[number], HEX>;
export interface BlendLevelColor {
  DEFAULT: HEX;
  LIGHT: LevelColor;
  DARK: LevelColor;
}

import {
  RGB_MIN,
  RGB_MAX,
  RGB_BLACK,
  RGB_WHITE,
  HEX_REGEXP,
} from './variables';

/**
 * 基础概念
 * RGB: 红绿蓝三颜色
 * HEX: 十六进制颜色
 * HSL: 色相、饱和度、亮度
 *
 * 实现功能
 * 1. 颜色转换: RGB TO HSL
 * 2. 颜色转换: HSL TO RGB
 * 3. 颜色转换: RGB TO HEX
 * 4. 颜色转换: HEX TO RGB
 * 5. 颜色转换: HEX TO HSL
 * 6. 颜色转换: HSL TO HEX
 * 7. 颜色转换: TO_RGB
 * 8. 颜色转换: TO_HEX
 * 9. 颜色转换: TO_HSL
 * 10. 颜色混合: BLEND_COLOR
 * 11. 颜色混合(层级): BLEND_LEVEL_COLOR
 */

/** 添加前缀字符 0 */
function AddZero(num: number | string): string {
  return String(num)[1] ? `${num}` : `0${num}`;
}

/**
 * 颜色转换: 其它格式颜色转换为 RGB 颜色
 * @param {HEX | HSL | RGB} color 其它格式颜色
 * @return {RGB} RGB 颜色对象
 */
export function TO_RGB(color: HEX | HSL | RGB): RGB {
  const type = typeof color;
  if (type === 'string') return HEX_TO_RGB(color as string);
  if ('h' in (color as HSL)) return HSL_TO_RGB(color as HSL);
  return color as RGB;
}

/**
 * 颜色转换: 其它格式颜色转换为 HEX 颜色
 * @param {HEX | HSL | RGB} color 其它格式颜色
 * @return {HEX} HEX 颜色对象
 */
export function TO_HEX(color: HEX | HSL | RGB): HEX {
  const type = typeof color;
  if (type !== 'string') {
    if ('h' in (color as HSL)) return HSL_TO_HEX(color as HSL);
    if ('r' in (color as RGB)) return RGB_TO_HEX(color as RGB);
  }
  return color as HEX;
}

/**
 * 颜色转换: 其它格式颜色转换为 HSL 颜色
 * @param {HEX | HSL | RGB} color 其它格式颜色
 * @return {HSL} HSL 颜色对象
 */
export function TO_HSL(color: HEX | HSL | RGB): HSL {
  const type = typeof color;
  if (type === 'string') return HEX_TO_HSL(color as string);
  if ('r' in (color as RGB)) return RGB_TO_HSL(color as RGB);
  return color as HSL;
}

/**
 * 颜色转换: RGB TO HSL
 * @param  {RGB} rgb 颜色对象
 * @return {HSL} HSL 颜色对象
 */
export function RGB_TO_HSL(rgb: RGB): HSL {
  let { r, g, b } = rgb;
  const hsl = { h: 0, s: 0, l: 0 };

  // 计算rgb基数 ∈ [0, 1]
  r /= RGB_MAX;
  g /= RGB_MAX;
  b /= RGB_MAX;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  // 计算h
  if (max === min) {
    hsl.h = 0;
  } else if (max === r) {
    hsl.h = 60 * ((g - b) / (max - min)) + (g >= b ? 0 : 360);
  } else if (max === g) {
    hsl.h = 60 * ((b - r) / (max - min)) + 120;
  } else {
    hsl.h = 60 * ((r - g) / (max - min)) + 240;
  }
  hsl.h = hsl.h > 360 ? hsl.h - 360 : hsl.h;

  // 计算l
  hsl.l = (max + min) / 2;

  // 计算s
  if (hsl.l === 0 || max === min) {
    // 灰/白/黑
    hsl.s = 0;
  } else if (hsl.l > 0 && hsl.l <= 0.5) {
    hsl.s = (max - min) / (max + min);
  } else {
    hsl.s = (max - min) / (2 - (max + min));
  }

  return hsl;
}

/**
 * 颜色转换: HSL TO RGB
 * @param  {HSL} hsl 颜色对象
 * @return {RGB} RGB 颜色对象
 */
export function HSL_TO_RGB(hsl: HSL): RGB {
  const { h, s, l } = hsl;
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hUnit = h / 360; // 色相转换为 [0, 1]

  const Cr = fillCircleVal(hUnit + 1 / 3);
  const Cg = fillCircleVal(hUnit);
  const Cb = fillCircleVal(hUnit - 1 / 3);

  // 保持 [0, 1] 环状取值
  function fillCircleVal(val: number): number {
    return val < 0 ? val + 1 : val > 1 ? val - 1 : val;
  }

  function computedRgb(val: number): number {
    let colorVal: number;
    if (val < 1 / 6) {
      colorVal = p + (q - p) * 6 * val;
    } else if (val >= 1 / 6 && val < 1 / 2) {
      colorVal = q;
    } else if (val >= 1 / 2 && val < 2 / 3) {
      colorVal = p + (q - p) * 6 * (2 / 3 - val);
    } else {
      colorVal = p;
    }
    return colorVal * 255;
  }

  return {
    r: Number(computedRgb(Cr).toFixed(0)),
    g: Number(computedRgb(Cg).toFixed(0)),
    b: Number(computedRgb(Cb).toFixed(0)),
  };
}

/**
 * 颜色转换: RGB TO HEX
 * @param {RGB} rgb 颜色对象
 * @return {HEX} HEX 颜色对象
 */
export function RGB_TO_HEX(rgb: RGB): string {
  const { r, g, b } = rgb;
  return [r.toString(16), g.toString(16), b.toString(16)].reduce(
    (prev, next) => {
      return prev + AddZero(next).slice(0, 2);
    },
    '#',
  );
}

/**
 * 颜色转换: HEX TO RGB
 * @param  {HEX} hex 颜色对象
 * @return {RGB} RGB 颜色对象
 */
export function HEX_TO_RGB(hex: HEX): RGB {
  if (!HEX_REGEXP.test(hex)) {
    console.warn(`无效的十六进制颜色值`);
    return { r: 0, g: 0, b: 0 };
  }

  if (!(hex.length && hex.startsWith('#'))) {
    console.warn(`十六进制颜色值必须以 # 开头设值,且不可简写`);
    return { r: 0, g: 0, b: 0 };
  }
  const [r, g, b] = hex.replace('#', '').match(/../g) ?? [];

  return {
    r: parseInt(r ?? RGB_MIN.toString(), 16),
    g: parseInt(g ?? RGB_MIN.toString(), 16),
    b: parseInt(b ?? RGB_MIN.toString(), 16),
  };
}

/**
 * 颜色转换: HEX TO HSL
 * @param  {HEX} hex 颜色对象
 * @return {HSL} HSL 颜色对象
 */
export function HEX_TO_HSL(hex: HEX): HSL {
  const rgb = HEX_TO_RGB(hex);
  return RGB_TO_HSL(rgb);
}

/**
 * 颜色转换: HSL TO HEX
 * @param  {HSL} hsl 颜色对象
 * @return {HEX} HEX 颜色对象
 */
export function HSL_TO_HEX(hsl: HSL): HEX {
  const rgb = HSL_TO_RGB(hsl);
  return RGB_TO_HEX(rgb);
}

/**
 * 颜色混合: 获取基础色、混合色所构成一定亮度的色值
 * @param {HEX | HSL | RGB} base 基础色彩
 * @param {HEX | HSL | RGB} blend 混合色彩
 * @param {number} level 混合程度
 * @return {RGB} 混合效果色
 */
export function BLEND_COLOR(
  base: HEX | HSL | RGB,
  blend: HEX | HSL | RGB,
  level: number,
): RGB {
  base = TO_RGB(base);
  blend = TO_RGB(blend);
  return {
    r: base.r * (1 - level) + blend.r * level,
    g: base.g * (1 - level) + blend.g * level,
    b: base.b * (1 - level) + blend.b * level,
  };
}

/**
 * 颜色混合: 获取基础色与不同亮度下的色值
 * @param {HEX | HSL | RGB} base 基础色彩
 * @return {BlendLevelColor} 基础色与不同亮度下的色值
 */
export function BLEND_LEVEL_COLOR(base: HEX | HSL | RGB): BlendLevelColor {
  base = TO_HEX(base);
  return {
    DEFAULT: base,
    LIGHT: {
      1: RGB_TO_HEX(BLEND_COLOR(TO_RGB(base), RGB_WHITE, 0.1)),
      2: RGB_TO_HEX(BLEND_COLOR(TO_RGB(base), RGB_WHITE, 0.2)),
      3: RGB_TO_HEX(BLEND_COLOR(TO_RGB(base), RGB_WHITE, 0.3)),
      4: RGB_TO_HEX(BLEND_COLOR(TO_RGB(base), RGB_WHITE, 0.4)),
      5: RGB_TO_HEX(BLEND_COLOR(TO_RGB(base), RGB_WHITE, 0.5)),
      6: RGB_TO_HEX(BLEND_COLOR(TO_RGB(base), RGB_WHITE, 0.6)),
      7: RGB_TO_HEX(BLEND_COLOR(TO_RGB(base), RGB_WHITE, 0.7)),
      8: RGB_TO_HEX(BLEND_COLOR(TO_RGB(base), RGB_WHITE, 0.78)),
      9: RGB_TO_HEX(BLEND_COLOR(TO_RGB(base), RGB_WHITE, 0.85)),
    },
    DARK: {
      1: RGB_TO_HEX(BLEND_COLOR(TO_RGB(base), RGB_BLACK, 0.1)),
      2: RGB_TO_HEX(BLEND_COLOR(TO_RGB(base), RGB_BLACK, 0.2)),
      3: RGB_TO_HEX(BLEND_COLOR(TO_RGB(base), RGB_BLACK, 0.3)),
      4: RGB_TO_HEX(BLEND_COLOR(TO_RGB(base), RGB_BLACK, 0.4)),
      5: RGB_TO_HEX(BLEND_COLOR(TO_RGB(base), RGB_BLACK, 0.5)),
      6: RGB_TO_HEX(BLEND_COLOR(TO_RGB(base), RGB_BLACK, 0.6)),
      7: RGB_TO_HEX(BLEND_COLOR(TO_RGB(base), RGB_BLACK, 0.7)),
      8: RGB_TO_HEX(BLEND_COLOR(TO_RGB(base), RGB_BLACK, 0.78)),
      9: RGB_TO_HEX(BLEND_COLOR(TO_RGB(base), RGB_BLACK, 0.85)),
    },
  };
}
