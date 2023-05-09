import type { ReactNode } from "react";

export type IDType = string | number;

export interface ItemRequireData {
    id: IDType;
    src: string;
    width: number;
    height: number;
}

export interface ItemData extends ItemRequireData {
    [propName: string]: any;
}

export interface ItemExtraNodeProps {
    data: ItemData;
}

export type ItemGap = number | [number, number];

export interface WaterfallProps {
    dataSource: ItemData[];
    height?: number | string;
    width?: number | string;
    rowHeight?: number;
    gap?: ItemGap;
    interval?: number;
    columns?: number;
    className?: string;
    itemClassName?: string;
    loadingClassName?: string;
    itemRadius?: number;
    overscanRatio?: number;
    loadingNode?: ReactNode;
    extraHeight?: number;
    extraSizeGetter?: (data: ItemData, columnWidth: number) => number;
    onLoadMore?: () => void;
    onImgClick?: (data: ItemData) => void;
    children?: (props: ItemExtraNodeProps) => ReactNode;
}

export interface Metadata {
    id: IDType;
    top: number;
    left: number;
    imageWidth: number;
    imageHeight: number;
    originData: ItemData;
}

export interface ItemProps {
    id: IDType;
    columnWidth: number;
    radius: number;
    className: string;
    itemInfoGetter: (id: IDType) => Metadata;
    children: WaterfallProps["children"];
    onImgClick: WaterfallProps["onImgClick"];
}

export interface ImgBoxProps {
    id: IDType;
    width: number;
    height: number;
    src: string;
    onImgClick: () => void;
}

export interface RequiredSeriesRowsParams {
    top: number;
    height: number;
}

export interface ContainerRectInfo {
    width: number;
    height: number;
    scrollTop: number;
}

export interface SeriesRowsMap {
    [propName: string]: IDType[];
}
