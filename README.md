# LIghtweight CHart ENgine (LiChEn)

## Options

### Main options

| Name       | Type        | Default  | Description                                                  |
| ---------- | ----------- | -------- | ------------------------------------------------------------ |
| type       | String      | `'line'` | Type of chart (`'line'`, `'heatmap'`)                        |
| area       | Boolean     | `false`  | Show area or not                                             |
| categories | <String[]>  | `null`   | List of category name                                        |
| fixedMin   | Number      | `null`   | Fixed min value                                              |
| fixedMax   | Number      | `null`   | Fixed max value                                              |
| title      | String      | `''`     | Title of the chart                                           |
| crosshair  | Boolean     | `false`  | Show crosshair or not                                        |
| xStart     | Number      | `null`   | **Required**, start time of the data [ms since epoch]        |
| xStep      | Number      | `null`   | **Required**, duration between two samples [ms]              |
| yStart     | Number      | `null`   | **Required for heatmap**, start of the Y axis                |
| yEnd       | Number      | `null`   | **Required for heatmap**, end of the Y axis                  |
| zStart     | Number      | `null`   | **Required for heatmap**, start of the Z axis                |
| zEnd       | Number      | `null`   | **Required for heatmap**, end of the Z axis                  |
| debounce   | Boolean     | `null`   | Do not compute intermediate visualization on interaction, use image transformation instead for better performance (useful for heatmap) |
| data       | **Various** | `[]`     | The type of the data depends from the type of the charts ([explanation here](#data-format)) |



### Tooltip options

| Name                  | Type     | Default | Description                                                  |
| --------------------- | -------- | ------- | ------------------------------------------------------------ |
| tooltip               | Boolean  | `false` | Show tooltip or not on mouse hover                           |
| categoryTooltipValues | Boolean  | `true`  | Show values of each category in tooltip for category heatmap, otherwise only the datetime is shown. |
| TooltipFormatter      | Function |         | Format the given value                                       |
| units                 | String   | `''`    | Set units that appear in tooltip                             |



### Color scale options

| Name                  | Type    | Default | Description                                                  |
| --------------------- | ------- | ------- | ------------------------------------------------------------ |
| colorScale            |         |         | Set the color scale object ([explanation here](#color-scale-format)) |
| color                 | String  | `null`  | Set fixed color. Must be in the form `'rgb(0,0,0)'` in order to work with area set to true. |
| logarithmicColorScale | Boolean | `true`  | Set the color scale to be logarithmic                        |
| drawColorScale        | Boolean | `true`  | Draw the color scale or not                                  |



### Style options

| Name           | Type   | Default                    | Description                                                  |
| -------------- | ------ | -------------------------- | ------------------------------------------------------------ |
| width          | Number | `null`                     | Set the chart width, by default it will use all available width. |
| height         | Number | `200`                      | The chart height                                             |
| xAxisHeight    | Number | `30`                       | The height used by the X axis                                |
| yAxisWidth     | Number | `120`                      | The width used by the Y axis                                 |
| lineWidth      | Number | `2`                        | The line width                                               |
| fontSize       | Number | `10`                       | The font size                                                |
| textColor      | String | `'#888'`                   | The text color (title, ticks, ...)                           |
| gridColor      | String | `rgba(136, 136, 136, 0.1)` | The grid color                                               |
| categoryHeight | Number | `15`                       | The height for one category (not recommended to be less than `fontSize`) |
| categoryMargin | Number | `1`                        | The margin between two categories                            |



### Callback function options

| Name       | Type     | Default | Description                                                  |
| ---------- | -------- | ------- | ------------------------------------------------------------ |
| beforeDraw | Function |         | Called before draw. If it returns `false` the draw is aborted. |
| afterDraw  | Function |         | Called after draw                                            |
| synCharts  | Function |         | Must return a list of *Lichen* instances that will be synced together. |



## [Data format](#data-format)

### Single serie line chart

The data option is an Array of number (<Number[]>).



### Multi series line chart

The data option is an Object in that form :

```javascript
{
    "Serie 1": {
        color: String,
        data: <Number[]>
    },
    "Serie 2": {
        color: String,
        data: <Number[]>
    },
    ...
}
```



### Heatmap chart

The data option is 2 dimensional matrix. The 1st dimension is for the X axis where the start value is defined by `xStart` and the end is implied with `xStep`. The 2nd dimension is for the Y axis where the start value is defined by `yStart` and the end value by `yEnd`. The value itself is mapped to the given color scale which limit values are set by `zStart` and `zEnd`. 



## [Color scale format](#color-scale-format)

The color scale is an object in that form :

```javascript
[
    [0.000, [53, 42,   135]],
    [0.125, [3, 99,    224]],
    [0.250, [20, 133,  212]],
    [0.375, [6, 167,   198]],
    [0.500, [56, 185,  158]],
    [0.625, [146, 191, 115]],
    [0.750, [217, 186,  86]],
    [0.875, [252, 207,  47]],
    [1.000, [249, 251,  14]]
  ]
```

The object above is an implementation of the *Parula* color scale.

For each stop, a third value can define a label as a String.

The color scale associates colors to values between 0 and 1. The corresponding values of 0 and 1 are set by `zStart` and `zEnd`.