[lichen](../README.md) / [Exports](../modules.md) / [index](../modules/index.md) / Lichen

# Class: Lichen

[index](../modules/index.md).Lichen

## Table of contents

### Constructors

- [constructor](index.Lichen.md#constructor)

### Properties

- [dataUtils](index.Lichen.md#datautils)
- [eventUtils](index.Lichen.md#eventutils)
- [frontPanel](index.Lichen.md#frontpanel)
- [legend](index.Lichen.md#legend)
- [master](index.Lichen.md#master)
- [opt](index.Lichen.md#opt)
- [plot](index.Lichen.md#plot)
- [ready](index.Lichen.md#ready)
- [xAxis](index.Lichen.md#xaxis)
- [yAxis](index.Lichen.md#yaxis)

### Methods

- [buildStructure](index.Lichen.md#buildstructure)
- [draw](index.Lichen.md#draw)
- [init](index.Lichen.md#init)
- [mergeOptions](index.Lichen.md#mergeoptions)
- [setColorScale](index.Lichen.md#setcolorscale)
- [setSelection](index.Lichen.md#setselection)
- [setXRange](index.Lichen.md#setxrange)
- [setYRange](index.Lichen.md#setyrange)
- [getColorScale](index.Lichen.md#getcolorscale)

## Constructors

### constructor

• **new Lichen**(`container`, `opt`, `drawOnCreation?`)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `container` | `HTMLElement` | `undefined` | The HTML element container |
| `opt` | [`LichenOptions`](../interfaces/types.LichenOptions.md) | `undefined` | Charts options object |
| `drawOnCreation` | `boolean` | `true` | Wether to draw the charts immediately after creation or not. |

#### Defined in

index.ts:47

## Properties

### dataUtils

• **dataUtils**: [`DataUtils`](dataUtils.DataUtils.md)

#### Defined in

index.ts:34

___

### eventUtils

• **eventUtils**: [`EventUtils`](eventUtils.EventUtils.md)

#### Defined in

index.ts:35

___

### frontPanel

• **frontPanel**: [`FrontPanel`](frontPanel.FrontPanel.md)

#### Defined in

index.ts:38

___

### legend

• **legend**: [`Legend`](legend.Legend.md)

#### Defined in

index.ts:37

___

### master

• **master**: [`MasterInterface`](masterInterface.MasterInterface.md)

#### Defined in

index.ts:40

___

### opt

• **opt**: [`LichenOptions`](../interfaces/types.LichenOptions.md)

#### Defined in

index.ts:31

___

### plot

• **plot**: [`LinePlot`](plot_linePlot.LinePlot.md) \| [`Heatmap2dPlot`](plot_heatmap2dPlot.Heatmap2dPlot.md) \| [`Heatmap3dPlot`](plot_heatmap3dPlot.Heatmap3dPlot.md) \| [`StackedPlot`](plot_stackedPlot.StackedPlot.md) \| [`SequencePlot`](plot_sequencePlot.SequencePlot.md) \| [`ScatterPlot`](plot_scatterPlot.ScatterPlot.md)

#### Defined in

index.ts:36

___

### ready

• **ready**: `boolean`

#### Defined in

index.ts:39

___

### xAxis

• **xAxis**: [`XAxis`](xAxis.XAxis.md)

#### Defined in

index.ts:33

___

### yAxis

• **yAxis**: [`YAxis`](yAxis.YAxis.md)

#### Defined in

index.ts:32

## Methods

### buildStructure

▸ **buildStructure**(`container`): `void`

Create all the structure and instantiate all charts components

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `container` | `HTMLElement` | The HTML element container |

#### Returns

`void`

#### Defined in

index.ts:112

___

### draw

▸ **draw**(): `void`

The main draw method of Lichen

#### Returns

`void`

#### Defined in

index.ts:269

___

### init

▸ **init**(`container`): `void`

Initialize the chart construction

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `container` | `HTMLElement` | The HTML element container |

#### Returns

`void`

#### Defined in

index.ts:159

___

### mergeOptions

▸ **mergeOptions**(`opt`): [`LichenOptions`](../interfaces/types.LichenOptions.md)

Merge the given options with the default built-in options

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opt` | [`LichenOptions`](../interfaces/types.LichenOptions.md) | Lichen options |

#### Returns

[`LichenOptions`](../interfaces/types.LichenOptions.md)

The Lichen options merged

#### Defined in

index.ts:85

___

### setColorScale

▸ **setColorScale**(`colorScale`): `void`

Set the given color scale object to use and updates the plot and the legend

#### Parameters

| Name | Type |
| :------ | :------ |
| `colorScale` | [`ColorScaleOptions`](../interfaces/types.ColorScaleOptions.md) |

#### Returns

`void`

#### Defined in

index.ts:214

___

### setSelection

▸ **setSelection**(`x`, `y`): `void`

Set the selection to draw on front panel

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | [`number`, `number`] | the X range |
| `y` | [`number`, `number`] | the Y range |

#### Returns

`void`

#### Defined in

index.ts:254

___

### setXRange

▸ **setXRange**(`x1`, `x2`, `draw?`): `void`

Set the X range for next draw

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `x1` | `number` | `undefined` | the start range |
| `x2` | `number` | `undefined` | the end range |
| `draw` | `boolean` | `true` | call the [Lichen.draw](index.Lichen.md#draw) method if `true` |

#### Returns

`void`

#### Defined in

index.ts:226

___

### setYRange

▸ **setYRange**(`y1`, `y2`, `draw?`): `void`

Set the X range for next draw

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `y1` | `number` | `undefined` | the start range |
| `y2` | `number` | `undefined` | the end range |
| `draw` | `boolean` | `true` | call the [Lichen.draw](index.Lichen.md#draw) method if `true` |

#### Returns

`void`

#### Defined in

index.ts:241

___

### getColorScale

▸ `Static` **getColorScale**(`name`): (`number` \| `number`[])[][]

Give the requested colorscale object

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | ``"PARULA"`` \| ``"VIRIDIS"`` \| ``"PLASMA"`` \| ``"INFERNO"`` \| ``"MAGMA"`` \| ``"CIVIDIS"`` | the colorscale name |

#### Returns

(`number` \| `number`[])[][]

the requested colorscale object

#### Defined in

index.ts:76
