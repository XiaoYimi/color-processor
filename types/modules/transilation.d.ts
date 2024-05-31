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
export declare const LEVEL: readonly [1, 2, 3, 4, 5, 6, 7, 8, 9];
export type LevelColor = Record<(typeof LEVEL)[number], HEX>;
export interface BlendLevelColor {
    DEFAULT: HEX;
    LIGHT: LevelColor;
    DARK: LevelColor;
}
/**
 * 颜色转换: 其它格式颜色转换为 RGB 颜色
 * @param {HEX | HSL | RGB} color 其它格式颜色
 * @return {RGB} RGB 颜色对象
 */
export declare function TO_RGB(color: HEX | HSL | RGB): RGB;
/**
 * 颜色转换: 其它格式颜色转换为 HEX 颜色
 * @param {HEX | HSL | RGB} color 其它格式颜色
 * @return {HEX} HEX 颜色对象
 */
export declare function TO_HEX(color: HEX | HSL | RGB): HEX;
/**
 * 颜色转换: 其它格式颜色转换为 HSL 颜色
 * @param {HEX | HSL | RGB} color 其它格式颜色
 * @return {HSL} HSL 颜色对象
 */
export declare function TO_HSL(color: HEX | HSL | RGB): HSL;
/**
 * 颜色转换: RGB TO HSL
 * @param  {RGB} rgb 颜色对象
 * @return {HSL} HSL 颜色对象
 */
export declare function RGB_TO_HSL(rgb: RGB): HSL;
/**
 * 颜色转换: HSL TO RGB
 * @param  {HSL} hsl 颜色对象
 * @return {RGB} RGB 颜色对象
 */
export declare function HSL_TO_RGB(hsl: HSL): RGB;
/**
 * 颜色转换: RGB TO HEX
 * @param {RGB} rgb 颜色对象
 * @return {HEX} HEX 颜色对象
 */
export declare function RGB_TO_HEX(rgb: RGB): string;
/**
 * 颜色转换: HEX TO RGB
 * @param  {HEX} hex 颜色对象
 * @return {RGB} RGB 颜色对象
 */
export declare function HEX_TO_RGB(hex: HEX): RGB;
/**
 * 颜色转换: HEX TO HSL
 * @param  {HEX} hex 颜色对象
 * @return {HSL} HSL 颜色对象
 */
export declare function HEX_TO_HSL(hex: HEX): HSL;
/**
 * 颜色转换: HSL TO HEX
 * @param  {HSL} hsl 颜色对象
 * @return {HEX} HEX 颜色对象
 */
export declare function HSL_TO_HEX(hsl: HSL): HEX;
/**
 * 颜色混合: 获取基础色、混合色所构成一定亮度的色值
 * @param {HEX | HSL | RGB} base 基础色彩
 * @param {HEX | HSL | RGB} blend 混合色彩
 * @param {number} level 混合程度
 * @return {RGB} 混合效果色
 */
export declare function BLEND_COLOR(base: HEX | HSL | RGB, blend: HEX | HSL | RGB, level: number): RGB;
/**
 * 颜色混合: 获取基础色与不同亮度下的色值
 * @param {HEX | HSL | RGB} base 基础色彩
 * @return {BlendLevelColor} 基础色与不同亮度下的色值
 */
export declare function BLEND_LEVEL_COLOR(base: HEX | HSL | RGB): BlendLevelColor;
//# sourceMappingURL=transilation.d.ts.map