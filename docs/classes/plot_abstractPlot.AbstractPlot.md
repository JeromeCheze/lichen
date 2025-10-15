[lichen](../README.md) / [Exports](../modules.md) / [plot/abstractPlot](../modules/plot_abstractPlot.md) / AbstractPlot

# Class: AbstractPlot

[plot/abstractPlot](../modules/plot_abstractPlot.md).AbstractPlot

## Hierarchy

- **`AbstractPlot`**

  ↳ [`Heatmap2dPlot`](plot_heatmap2dPlot.Heatmap2dPlot.md)

  ↳ [`Heatmap3dPlot`](plot_heatmap3dPlot.Heatmap3dPlot.md)

  ↳ [`LinePlot`](plot_linePlot.LinePlot.md)

  ↳ [`ScatterPlot`](plot_scatterPlot.ScatterPlot.md)

  ↳ [`SequencePlot`](plot_sequencePlot.SequencePlot.md)

  ↳ [`StackedPlot`](plot_stackedPlot.StackedPlot.md)

## Table of contents

### Constructors

- [constructor](plot_abstractPlot.AbstractPlot.md#constructor)

### Properties

- [canvas](plot_abstractPlot.AbstractPlot.md#canvas)
- [ctx](plot_abstractPlot.AbstractPlot.md#ctx)
- [dataUtils](plot_abstractPlot.AbstractPlot.md#datautils)
- [master](plot_abstractPlot.AbstractPlot.md#master)

### Accessors

- [colorScale](plot_abstractPlot.AbstractPlot.md#colorscale)

### Methods

- [dataFromXPos](plot_abstractPlot.AbstractPlot.md#datafromxpos)
- [getProcessingData](plot_abstractPlot.AbstractPlot.md#getprocessingdata)
- [isDataStacked](plot_abstractPlot.AbstractPlot.md#isdatastacked)
- [step](plot_abstractPlot.AbstractPlot.md#step)
- [tooltipHandler](plot_abstractPlot.AbstractPlot.md#tooltiphandler)
- [update](plot_abstractPlot.AbstractPlot.md#update)
- [xRange](plot_abstractPlot.AbstractPlot.md#xrange)
- [yRange](plot_abstractPlot.AbstractPlot.md#yrange)
- [getHeight](plot_abstractPlot.AbstractPlot.md#getheight)

## Constructors

### constructor

• **new AbstractPlot**(`container`, `master`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `container` | `HTMLElement` |
| `master` | [`MasterInterface`](masterInterface.MasterInterface.md) |

#### Defined in

plot/abstractPlot.ts:12

## Properties

### canvas

• **canvas**: `HTMLCanvasElement`

#### Defined in

plot/abstractPlot.ts:7

___

### ctx

• **ctx**: `CanvasRenderingContext2D`

#### Defined in

plot/abstractPlot.ts:9

___

### dataUtils

• **dataUtils**: [`DataUtils`](dataUtils.DataUtils.md)

#### Defined in

plot/abstractPlot.ts:8

___

### master

• **master**: [`MasterInterface`](masterInterface.MasterInterface.md)

#### Defined in

plot/abstractPlot.ts:10

## Accessors

### colorScale

• `get` **colorScale**(): [`ColorScaleOptions`](../interfaces/types.ColorScaleOptions.md)

#### Returns

[`ColorScaleOptions`](../interfaces/types.ColorScaleOptions.md)

#### Defined in

plot/abstractPlot.ts:24

## Methods

### dataFromXPos

▸ `Abstract` **dataFromXPos**(`xPos`): [`DataFromPos`](../interfaces/types.DataFromPos.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `xPos` | `number` |

#### Returns

[`DataFromPos`](../interfaces/types.DataFromPos.md)[]

#### Defined in

plot/abstractPlot.ts:42

___

### getProcessingData

▸ `Abstract` **getProcessingData**(): `number`[][]

#### Returns

`number`[][]

#### Defined in

plot/abstractPlot.ts:48

___

### isDataStacked

▸ **isDataStacked**(): `boolean`

#### Returns

`boolean`

#### Defined in

plot/abstractPlot.ts:32

___

### step

▸ `Abstract` **step**(): `number`

#### Returns

`number`

#### Defined in

plot/abstractPlot.ts:46

___

### tooltipHandler

▸ `Abstract` **tooltipHandler**(`x`, `ctx`): [`TooltipHandlerResponse`](../interfaces/types.TooltipHandlerResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `ctx` | `CanvasRenderingContext2D` |

#### Returns

[`TooltipHandlerResponse`](../interfaces/types.TooltipHandlerResponse.md)

#### Defined in

plot/abstractPlot.ts:40

___

### update

▸ `Abstract` **update**(`forceRedraw`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `forceRedraw` | `boolean` |

#### Returns

`void`

#### Defined in

plot/abstractPlot.ts:50

___

### xRange

▸ `Abstract` **xRange**(): [`number`, `number`]

#### Returns

[`number`, `number`]

#### Defined in

plot/abstractPlot.ts:44

___

### yRange

▸ **yRange**(): [`number`, `number`]

#### Returns

[`number`, `number`]

#### Defined in

plot/abstractPlot.ts:36

___

### getHeight

▸ `Static` **getHeight**(`master`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `master` | [`MasterInterface`](masterInterface.MasterInterface.md) |

#### Returns

`any`

#### Defined in

plot/abstractPlot.ts:28
