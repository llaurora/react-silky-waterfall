import React, { memo, useState, useRef, useCallback } from "react";
import classNames from "classnames";
import type { ItemProps, ImgBoxProps, ItemData } from "../interface";
import "./index.scss";

const ImgBox = memo(({ id, width, height, src, onImgClick }: ImgBoxProps) => {
    const imgBoxRef = useRef<HTMLDivElement>();
    const [loaded, setLoaded] = useState<boolean>(false);

    const onLoad = () => {
        setLoaded(true);
    };
    return (
        <div ref={imgBoxRef} data-id={id} className="img-box">
            <div className={classNames("loading", { "hidden-loading": loaded })}>loading...</div>
            <img
                src={src}
                className={classNames("image", { "image-visible": loaded })}
                width={width}
                height={height}
                onClick={onImgClick}
                onLoad={onLoad}
                alt=""
            />
        </div>
    );
});

const Item = ({
    id,
    radius,
    className,
    columnWidth,
    children,
    itemInfoGetter,
    onImgClick: propOnImgClick,
}: ItemProps) => {
    const { imageWidth, imageHeight, top, left, originData } = itemInfoGetter(id);
    const { src } = originData;
    const originDataRef = useRef<ItemData>(null);
    originDataRef.current = originData;

    const onImgClick = useCallback(() => {
        propOnImgClick?.(originDataRef.current);
    }, [propOnImgClick]);

    return (
        <div
            className={classNames("waterfall-item", { [className]: !!className })}
            style={{
                transform: `translate(${left}px,${top}px)`,
                width: columnWidth,
                borderRadius: radius,
            }}
        >
            <ImgBox id={id} width={imageWidth} height={imageHeight} src={src} onImgClick={onImgClick} />
            {children?.({ data: originData })}
        </div>
    );
};

export default memo(Item);
