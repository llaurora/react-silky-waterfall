import { CSSProperties } from "react";

/**
 * pxToNumber
 * @param value
 * @returns number
 */
export const pxToNumber = (value: string): number => {
    if (!value) {
        return 0;
    }
    const match = value.match(/^\d*(\.\d*)?/);
    return match ? Number(match[0]) : 0;
};

/**
 * getStyleCssText
 * @param styleObj
 * @returns string
 */
export const getStyleCssText = (styleObj: CSSProperties): string => {
    let str = "";
    Object.entries(styleObj).forEach(([key, value]) => {
        const formatKey = key.replace(/[A-Z]/g, (v) => `-${v.charAt(0).toLowerCase()}`);
        const formatValue = typeof value === "number" ? `${value}px` : value;
        str += `${formatKey}: ${formatValue};`;
    });
    return str;
};

/**
 * getElementSize
 * @param element
 * @returns number
 */
export const getElementSize = (element: HTMLElement): number => {
    const { height, marginTop, marginBottom, paddingTop, paddingBottom, borderTopWidth, borderBottomWidth } =
        getComputedStyle(element);
    return [
        pxToNumber(height),
        pxToNumber(marginTop),
        pxToNumber(marginBottom),
        pxToNumber(paddingTop),
        pxToNumber(paddingBottom),
        pxToNumber(borderTopWidth),
        pxToNumber(borderBottomWidth),
    ].reduce((prev: number, cur: number) => prev + cur);
};
