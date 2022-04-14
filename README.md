# <img src="https://cultofthepartyparrot.com/parrots/hd/everythingsfineparrot.gif" width="30" height="30"/> react-silky-waterfall
![waterfall.png](./waterfall.gif)

## <img src="https://cultofthepartyparrot.com/guests/hd/partygopher.gif" width="30" height="30"/> Feature
* 虚拟滚动并支持图片懒加载；
* 触底时支持加载更多数据；
* 支持自定义图片外的节点，比如添加描述等；
* 容器尺寸变化时重新布局瀑布流；

## <img src="https://cultofthepartyparrot.com/guests/hd/trollparrot.gif" width="30" height="30"/> Props

| Name             | Describle                        | Default | Type                                            | Required | Remark                                                       |
| ---------------- | -------------------------------- | ------- | ----------------------------------------------- | -------- | ------------------------------------------------------------ |
| dataSource       | 数据源                           |         | ItemData[]                                      | rue      | 每条源数据需要有数据唯一标示、图片宽高以及图片源地址         |
| height           | 容器高度                         | "100%"  | number \| string                                | false    |                                                              |
| width            | 容器宽度                         | "100%"  | number \| string                                | false    |                                                              |
| columns          | 瀑布流布局列数                   | 8       | number                                          | false    |                                                              |
| overscanRatio    | 显示区域前后buffer 比例          | 1       | number                                          | false    | 比例是相对于 height 来的                                     |
| children         | 自定义图片外的额外节点           |         | (props: ItemExtraNodeProps) => ReactNode        | false    |                                                              |
| rowHeight        | 分行的行高                       | 100     | number                                          | false    | 对单个卡片计算定位后并标记所属行，以方便在滚动时快速拿出需要显示的卡片 |
| gap              | 卡片间隔                         | 16      | number \| [number, number]                      | false    |                                                              |
| interval         | Scroll 以及 Resieze 节流防抖间隔 | 500     | number                                          | false    |                                                              |
| className        | 容器类名                         |         | string                                          | alse     |                                                              |
| itemClassName    | 卡片类名                         |         | string                                          | false    |                                                              |
| itemRadius       | 卡片圆角                         | 4       | number                                          | false    |                                                              |
| loadingClassName | loading 类名                     |         | string                                          | false    |                                                              |
| loadingNode      | 自定义 loading                   |         | ReactNode                                       | false    |                                                              |
| extraSizeGetter  | 额外节点高度计算                 |         | (data: ItemData, columnWidth: number) => number | false    |                                                              |
| onLoadMore       | 触底加载更多回调                 |         | () => void                                      | false    |                                                              |
| onImgClick       | 图片点击回调                     |         | (data: ItemData) => void                        | false    |                                                              |

