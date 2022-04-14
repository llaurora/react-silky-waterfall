import { useCallback, useState, CSSProperties } from "react";
import ReactDOM from "react-dom";
import Waterfall, { ItemData, ItemExtraNodeProps } from "../src";
import { getStyleCssText, getElementSize } from "./utils";
import request from "./request";
import "./reset.scss";
import "./global.scss";
import "./index.scss";

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
