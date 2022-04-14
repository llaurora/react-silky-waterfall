import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import ResizeObserver from "resize-observer-polyfill";
import Item from "@/item";
import { WaterfallProps, ContainerRectInfo, IDType } from "@/interface";
import { getImageCalcSize, throttle, debounce } from "./utils";
import Collection from "./Collection";
import loadingSrc from "./loading.gif";
import "./index.scss";

const Waterfall = ({
    dataSource,
    className,
    itemClassName,
    children,
    onLoadMore,
    loadingNode,
    loadingClassName,
    extraSizeGetter,
    onImgClick,
    interval = 500,
    rowHeight = 100,
    overscanRatio = 1,
    itemRadius = 4,
    gap = 16,
    columns = 8,
    width: propWidth = "100%",
    height: propHeight = "100%",
}: WaterfallProps) => {
    const [containerRectInfo, setContainerRectInfo] = useState<ContainerRectInfo>({
        width: typeof propWidth === "number" ? propWidth : 0,
        height: typeof propHeight === "number" ? propHeight : 0,
        scrollTop: 0,
    });
    const containerRef = useRef<HTMLDivElement>();
    const loadingRef = useRef<HTMLDivElement>();
    const waterfallRef = useRef<HTMLDivElement>();
    const containerRectInfoRef = useRef<ContainerRectInfo>(null);
    const resizeSwitchRef = useRef<boolean>(false);
    const sliceStartIndexRef = useRef<number>(0);
    const collectionRef = useRef<any>(null);
    const { width: containerWidth, height: containerHeight, scrollTop } = containerRectInfo;
    containerRectInfoRef.current = containerRectInfo;
    const [columnGap, rowGap] = Array.isArray(gap) ? gap : [gap, gap];
    const showLoadingNode = typeof onLoadMore === "function";
    if (!collectionRef.current) {
        collectionRef.current = new Collection(columns, rowHeight);
    }

    const [columnWidth, overscanHeight] = useMemo(() => {
        return [
            Math.max(0, Number.parseInt(`${(containerWidth - columnGap * (columns - 1)) / columns}`, 10)),
            containerHeight * overscanRatio,
        ];
    }, [columnGap, columns, containerHeight, containerWidth, overscanRatio]);

    const waterfallHeight = useMemo(() => {
        if (dataSource.length === 0 || containerHeight === 0) {
            return 0;
        }
        let bottom = 0;
        const sliceDatasource = dataSource.slice(sliceStartIndexRef.current);
        const { length } = sliceDatasource;
        for (let i = 0; i < length; i += 1) {
            const item = sliceDatasource[i];
            const { id, width: imageOriginWidth, height: imageOriginHeight } = item;
            const [hitTop, hitIndex] = collectionRef.current.getCurrentLocation();
            const [imageWidth, imageHeight] = getImageCalcSize(imageOriginWidth, imageOriginHeight, columnWidth);
            const hitLeft = (hitIndex + 1 - 1) * (columnWidth + columnGap);
            const extraHeight = extraSizeGetter?.(item, columnWidth) ?? 0;
            const itemHeight = imageHeight + extraHeight + rowGap;
            collectionRef.current.updateCurrentLocation(hitIndex, hitTop + itemHeight);
            collectionRef.current.registerOverlapCell(id, { top: hitTop, height: itemHeight });
            collectionRef.current.registerMetadataMap(id, {
                id,
                imageWidth,
                imageHeight,
                top: hitTop,
                left: hitLeft,
                originData: item,
            });
            if (hitTop + itemHeight > bottom) {
                bottom = hitTop + itemHeight;
            }
        }
        return bottom;
    }, [columnGap, columnWidth, containerHeight, dataSource, extraSizeGetter, rowGap]);

    const metadataIds = useMemo(() => {
        if (dataSource.length === 0 && containerHeight === 0) {
            return [];
        }
        const list = [];
        const startBuffer = scrollTop - overscanHeight;
        const calcTop = Math.max(0, startBuffer);
        const calcHeight =
            scrollTop >= overscanHeight
                ? containerHeight + overscanHeight * 2
                : containerHeight + overscanHeight + scrollTop;
        const seriesRows = collectionRef.current.getSeriesRows({ top: calcTop, height: calcHeight });
        seriesRows.forEach((key: string) => {
            const ids = collectionRef.current.getIdsByRowKey(key);
            list.push(...ids);
        });
        return [...new Set(list)];
    }, [containerHeight, overscanHeight, scrollTop, dataSource.length]);

    const onLoadMoreCallback = useCallback(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !resizeSwitchRef.current) {
                    onLoadMore();
                }
            });
        },
        [onLoadMore],
    );

    const itemInfoGetter = useCallback((id: IDType) => {
        return collectionRef.current.getMetadataMap(id);
    }, []);

    const onScroll = throttle((event) => {
        const { clientHeight, scrollHeight, scrollTop: currentScrollTop } = event.target;
        setContainerRectInfo((prevState: ContainerRectInfo) => ({
            ...prevState,
            scrollTop: Math.min(currentScrollTop, scrollHeight - clientHeight),
        }));
    }, interval);

    const renderLayout = () => {
        if (metadataIds.length === 0) {
            return null;
        }
        return (
            <>
                {metadataIds.map((id: IDType) => (
                    <Item
                        key={id}
                        id={id}
                        radius={itemRadius}
                        className={itemClassName}
                        columnWidth={columnWidth}
                        itemInfoGetter={itemInfoGetter}
                        onImgClick={onImgClick}
                    >
                        {children}
                    </Item>
                ))}
            </>
        );
    };

    const renderLoadingNode = () => {
        if (showLoadingNode) {
            return (
                <div
                    ref={loadingRef}
                    className={classNames("loading-more", { [loadingClassName]: !!loadingClassName })}
                >
                    {loadingNode || (
                        <>
                            <img src={loadingSrc} alt="loading" />
                            <span className="loading-text">loading more...</span>
                        </>
                    )}
                </div>
            );
        }
        return null;
    };

    useEffect(() => {
        if (containerRef.current) {
            const { offsetWidth, offsetHeight } = containerRef.current;
            if (
                containerRectInfoRef.current.width === offsetWidth &&
                containerRectInfoRef.current.height === offsetHeight
            ) {
                return;
            }
            setContainerRectInfo({
                width: offsetWidth,
                height: offsetHeight,
                scrollTop: 0,
            });
        }
    }, []);

    useEffect(() => {
        sliceStartIndexRef.current = dataSource.length;
    }, [dataSource]);

    useEffect(() => {
        let loadMoreObserver;
        const target = loadingRef.current;
        if (showLoadingNode && containerRef.current) {
            loadMoreObserver = new IntersectionObserver(onLoadMoreCallback, {
                root: containerRef.current,
                rootMargin: "0px 200px 0px 0px",
            });
            if (target) {
                loadMoreObserver.observe(target);
            }
        }
        return () => {
            if (target) {
                loadMoreObserver.unobserve(target);
            }
        };
    }, [showLoadingNode, onLoadMoreCallback]);

    useEffect(() => {
        let resizeObserver;
        const target = containerRef.current;
        if (target) {
            resizeObserver = new ResizeObserver(
                debounce((entries: ResizeObserverEntry[]) => {
                    entries.forEach((entry: ResizeObserverEntry) => {
                        const { offsetWidth, offsetHeight } = entry.target as HTMLDivElement;
                        if (
                            containerRectInfoRef.current.width === offsetWidth &&
                            containerRectInfoRef.current.height === offsetHeight
                        ) {
                            return;
                        }
                        collectionRef.current.clearCollecttion();
                        sliceStartIndexRef.current = 0;
                        containerRef.current.scrollTop = 0;
                        setContainerRectInfo({
                            width: offsetWidth,
                            height: offsetHeight,
                            scrollTop: 0,
                        });
                    });
                }, interval),
            );
            resizeObserver.observe(target);
        }
        return () => {
            if (target) {
                resizeObserver.unobserve(target);
            }
        };
    }, [interval]);

    return (
        <div
            ref={containerRef}
            onScroll={onScroll}
            className={classNames("container", { [className]: !!className })}
            style={{ width: propWidth, height: propHeight }}
        >
            <div ref={waterfallRef} className="waterfall" style={{ height: waterfallHeight }}>
                {renderLayout()}
            </div>
            {renderLoadingNode()}
        </div>
    );
};

export default Waterfall;
