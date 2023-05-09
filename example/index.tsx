import { useCallback, useState } from "react";
import type { CSSProperties } from "react";
import ReactDOM from "react-dom";
// 本地开发调试时用的下面路径
// import Waterfall from "../src";
// import type { ItemData, ItemExtraNodeProps } from "../src";
// 1、本地跑example可用软链接；2、在实际项目中使用的时候直接安装react-silky-waterfall包引入使用
import Waterfall from "react-silky-waterfall";
import type { ItemData, ItemExtraNodeProps } from "react-silky-waterfall";
import { getStyleCssText, getElementSize } from "./utils";
import request from "./utils/request";
import "./styles/reset.scss";
import "./styles/global.scss";
import "./styles/index.scss";

const extraStyle: CSSProperties = {
    margin: "14px 0",
    padding: "0 16px",
    fontSize: 14,
    wordBreak: "break-all",
    color: "rgb(0 0 0 / 65%)",
};

const extraSizeGetter = (data: ItemData, columnWidth: number) => {
    const { description } = data;
    if (!description) {
        return 0;
    }
    const box = document.createElement("div");
    box.style.width = `${columnWidth}px`;
    const extra = document.createElement("p");
    extra.style.cssText = getStyleCssText(extraStyle);
    extra.textContent = description;
    box.append(extra);
    document.body.append(box);
    const size = getElementSize(extra);
    box.remove();
    return size;
};

const App = () => {
    const [dataSource, setDataSource] = useState<ItemData[]>([]);
    const getDatasource = useCallback(async () => {
        const responseData = await request<ItemData[]>("/test/search/images", {
            mock: true,
            method: "get",
            data: { limit: 45 },
        });
        const responseDataSource = Array.isArray(responseData) ? responseData : [];
        setDataSource((prevDataSource: ItemData[]) => [...prevDataSource, ...responseDataSource]);
    }, []);

    const onLoadMore = useCallback(() => {
        getDatasource();
    }, [getDatasource]);

    console.log(dataSource.length, "length");

    return (
        <div className="app-container">
            <Waterfall dataSource={dataSource} extraSizeGetter={extraSizeGetter} onLoadMore={onLoadMore}>
                {({ data }: ItemExtraNodeProps) => {
                    const { description } = data;
                    if (!description) {
                        return null;
                    }
                    return <p style={extraStyle}>{description}</p>;
                }}
            </Waterfall>
        </div>
    );
};

ReactDOM.render(<App />, document.querySelector("#root"));
