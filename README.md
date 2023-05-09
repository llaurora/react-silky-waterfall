# <img src="https://cultofthepartyparrot.com/parrots/hd/everythingsfineparrot.gif" width="30" height="30"/> react-silky-waterfall
A React waterfall component that supports virtual scrolling, image lazy loading, and more.
Source code at [https://github.com/llaurora/react-silky-waterfall](https://github.com/llaurora/react-silky-waterfall).

➡️ [Here is an example](https://github.com/llaurora/react-silky-waterfall/tree/main/example)
<a href="https://github.com/llaurora/react-silky-waterfall/tree/main/example">
    <img src="./waterfall.gif" alt="Shows a screenshot of the Waterfall component in a browser’s window." />
</a>

## <img src="https://cultofthepartyparrot.com/guests/hd/partygopher.gif" width="30" height="30"/> Main features
* 🤖 Virtual scrolling and support for lazy loading of images;
* 🍁 Loading more data  when scroll to bottom;
* 🍂 Support for customizing nodes outside the image, such as adding descriptions；
* 🌿 Rearrange the waterfall when the container size changes；

## <img src="https://cultofthepartyparrot.com/guests/hd/partygeeko.gif" width="30" height="30"/> Installation
```shell
# if you prefer npm
npm install react-silky-waterfall

# if you prefer yarn
yarn add react-silky-waterfall

# if you prefer pnpm
pnpm add react-silky-waterfall
```

## <img src="https://cultofthepartyparrot.com/guests/hd/party-wizard.gif" width="30" height="30"/> Example
```tsx
import { useCallback, useState } from "react";
import Waterfall from "react-silky-waterfall";
import type { ItemData, ItemExtraNodeProps } from "react-silky-waterfall";
import axios from "axios";

const extraHeight = 32;
const App = () => {
    const [dataSource, setDataSource] = useState<ItemData[]>([]);
    const getDatasource = useCallback(async () => {
        const responseData = await axios.post<ItemData[]>("/test/search/images");
        const responseDataSource = Array.isArray(responseData) ? responseData : [];
        setDataSource((prevDataSource: ItemData[]) => [...prevDataSource, ...responseDataSource]);
    }, []);

    const onLoadMore = useCallback(() => {
        getDatasource();
    }, [getDatasource]);

    return (
        <div className="app-container">
            <Waterfall dataSource={dataSource} extraHeight={extraHeight} onLoadMore={onLoadMore}>
                {({ data }: ItemExtraNodeProps) => <div style={{ height: extraHeight }}>{data.description}</div>}
            </Waterfall>
        </div>
    );
};
```
If the height of the extra content is not fixed, refer to the [example](https://github.com/llaurora/react-silky-waterfall/tree/main/example)

## <img src="https://cultofthepartyparrot.com/guests/hd/trollparrot.gif" width="30" height="30"/> Props
For the interface definition, please refer to the [API documentation](https://github.com/llaurora/react-silky-waterfall/tree/main/docs/API.md)
```tsx
interface WaterfallProps {
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
```
