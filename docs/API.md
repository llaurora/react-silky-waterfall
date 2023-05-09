# <img src="https://cultofthepartyparrot.com/guests/hd/partyfsjal.gif" width="30" height="30"/> API
The Props of waterfall component
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
#### `dataSource`

Type: `ItemData[]`
```tsx
type IDType = string | number;
interface ItemRequireData {
    id: IDType;
    src: string;
    width: number;
    height: number;
}
interface ItemData extends ItemRequireData {
    [propName: string]: any;
}
```

Required: `true`

Default: `undefined`

Each source data must have a unique id, image width and height, and image source address

### `height`
Type: `number | string`

Required: `false`

Default: `100%`

Container height of waterfall component

### `width`
Type: `number | string`

Required: `false`

Default: `100%`

Container width of waterfall component

### `overscanRatio`
Type: `number`

Required: `false`

Default: `1`

Multiple of the height of both sides of the display area relative to the height of the waterfall flow capacity

### `overscanRatio`
Type: `number`

Required: `false`

Default: `1`

Multiple of the height of both sides of the display area relative to the height of the waterfall flow capacity

### `children`
Type: `(props: ItemExtraNodeProps) => ReactNode`
```tsx
interface ItemExtraNodeProps {
    data: ItemData;
}
```
Required: `false`

Default: `undefined`

Additional custom node outside the picture

### `rowHeight`
Type: `number`

Required: `false`

Default: `100`

The line height of a branch is used to calculate and locate a single card and mark the line to which it belongs, which is convenient to quickly take out the card to be displayed when scrolling

### `gap`
Type: `number | [number, number]`

Required: `false`

Default: `16`

The space between waterfall cards

### `interval`
Type: `number`

Required: `false`

Default: `500`

Scroll and Resieze throttling stabilization intervals in milliseconds

### `className`
Type: `string`

Required: `false`

Default: `undefined`

Container classname of waterfall component

### `itemClassName`
Type: `string`

Required: `false`

Default: `undefined`

Card classname of waterfall component

### `itemRadius`
Type: `number`

Required: `false`

Default: `4`

Card border radius of waterfall component

### `loadingClassName`
Type: `string`

Required: `false`

Default: `undefined`

loading classname of waterfall component

### `loadingNode`
Type: `ReactNode`

Required: `false`

Default: `undefined`

Custom loading dom node

### `extraHeight`
Type: `number`

Required: `false`

Default: `undefined`

The height of the custom dom node outside the picture

### `extraSizeGetter`
Type: `number`

Required: `false`

Default: `undefined`

If the height of a custom node other than the picture is variable, can use this method to dynamically calculate the node height

### `onLoadMore`
Type: `() => void`

Required: `false`

Default: `undefined`

Used to load more callback functions when bottoming out

### `onImgClick`
Type: `(data: ItemData) => void`

Required: `false`

Default: `undefined`

Callback function when an image is clicked





