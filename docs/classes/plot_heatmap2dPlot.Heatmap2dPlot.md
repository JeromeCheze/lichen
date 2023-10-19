[lichen](../README.md) / [Exports](../modules.md) / [plot/heatmap2dPlot](../modules/plot_heatmap2dPlot.md) / Heatmap2dPlot

# Class: Heatmap2dPlot

[plot/heatmap2dPlot](../modules/plot_heatmap2dPlot.md).Heatmap2dPlot

## Hierarchy

- [`AbstractPlot`](plot_abstractPlot.AbstractPlot.md)

  ↳ **`Heatmap2dPlot`**

## Table of contents

### Constructors

- [constructor](plot_heatmap2dPlot.Heatmap2dPlot.md#constructor)

### Properties

- [canvas](plot_heatmap2dPlot.Heatmap2dPlot.md#canvas)
- [colorScale](plot_heatmap2dPlot.Heatmap2dPlot.md#colorscale)
- [ctx](plot_heatmap2dPlot.Heatmap2dPlot.md#ctx)
- [dataUtils](plot_heatmap2dPlot.Heatmap2dPlot.md#datautils)
- [master](plot_heatmap2dPlot.Heatmap2dPlot.md#master)
- [opt](plot_heatmap2dPlot.Heatmap2dPlot.md#opt)

### Methods

- [dataFromXPos](plot_heatmap2dPlot.Heatmap2dPlot.md#datafromxpos)
- [getProcessingData](plot_heatmap2dPlot.Heatmap2dPlot.md#getprocessingdata)
- [getXRangeIndex](plot_heatmap2dPlot.Heatmap2dPlot.md#getxrangeindex)
- [isDataStacked](plot_heatmap2dPlot.Heatmap2dPlot.md#isdatastacked)
- [tooltipHandler](plot_heatmap2dPlot.Heatmap2dPlot.md#tooltiphandler)
- [update](plot_heatmap2dPlot.Heatmap2dPlot.md#update)
- [xRange](plot_heatmap2dPlot.Heatmap2dPlot.md#xrange)
- [yRange](plot_heatmap2dPlot.Heatmap2dPlot.md#yrange)
- [getHeight](plot_heatmap2dPlot.Heatmap2dPlot.md#getheight)

## Constructors

### constructor

• **new Heatmap2dPlot**(`container`, `master`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `container` | `HTMLElement` |
| `master` | [`MasterInterface`](masterInterface.MasterInterface.md) |

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[constructor](plot_abstractPlot.AbstractPlot.md#constructor)

#### Defined in

plot/heatmap2dPlot.ts:12

## Properties

### canvas

• **canvas**: `HTMLCanvasElement`

#### Inherited from

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[canvas](plot_abstractPlot.AbstractPlot.md#canvas)

#### Defined in

plot/abstractPlot.ts:7

___

### colorScale

• **colorScale**: [`ColorScaleOptions`](../interfaces/types.ColorScaleOptions.md)

#### Defined in

plot/heatmap2dPlot.ts:10

___

### ctx

• **ctx**: `CanvasRenderingContext2D`

#### Inherited from

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[ctx](plot_abstractPlot.AbstractPlot.md#ctx)

#### Defined in

plot/abstractPlot.ts:9

___

### dataUtils

• **dataUtils**: [`DataUtils`](dataUtils.DataUtils.md)

#### Inherited from

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[dataUtils](plot_abstractPlot.AbstractPlot.md#datautils)

#### Defined in

plot/abstractPlot.ts:8

___

### master

• **master**: [`MasterInterface`](masterInterface.MasterInterface.md)

#### Inherited from

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[master](plot_abstractPlot.AbstractPlot.md#master)

#### Defined in

plot/abstractPlot.ts:10

___

### opt

• **opt**: [`Heatmap2dOptions`](../interfaces/types.Heatmap2dOptions.md)[]

#### Defined in

plot/heatmap2dPlot.ts:9

## Methods

### dataFromXPos

▸ **dataFromXPos**(`xPos`): [`DataFromPos`](../interfaces/types.DataFromPos.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `xPos` | `number` |

#### Returns

[`DataFromPos`](../interfaces/types.DataFromPos.md)[]

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[dataFromXPos](plot_abstractPlot.AbstractPlot.md#datafromxpos)

#### Defined in

plot/heatmap2dPlot.ts:42

___

### getProcessingData

▸ **getProcessingData**(): `any`[]

#### Returns

`any`[]

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[getProcessingData](plot_abstractPlot.AbstractPlot.md#getprocessingdata)

#### Defined in

plot/heatmap2dPlot.ts:96

___

### getXRangeIndex

▸ **getXRangeIndex**(`serie`): `number`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `serie` | [`Heatmap2dOptions`](../interfaces/types.Heatmap2dOptions.md) |

#### Returns

`number`[]

#### Defined in

plot/heatmap2dPlot.ts:89

___

### isDataStacked

▸ **isDataStacked**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[isDataStacked](plot_abstractPlot.AbstractPlot.md#isdatastacked)

#### Defined in

plot/abstractPlot.ts:28

___

### tooltipHandler

▸ **tooltipHandler**(`x`, `ctx`): [`TooltipHandlerResponse`](../interfaces/types.TooltipHandlerResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `ctx` | `CanvasRenderingContext2D` |

#### Returns

[`TooltipHandlerResponse`](../interfaces/types.TooltipHandlerResponse.md)

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[tooltipHandler](plot_abstractPlot.AbstractPlot.md#tooltiphandler)

#### Defined in

plot/heatmap2dPlot.ts:20

___

### update

▸ **update**(): `void`

#### Returns

`void`

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[update](plot_abstractPlot.AbstractPlot.md#update)

#### Defined in

plot/heatmap2dPlot.ts:105

___

### xRange

▸ **xRange**(): [`number`, `number`]

#### Returns

[`number`, `number`]

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[xRange](plot_abstractPlot.AbstractPlot.md#xrange)

#### Defined in

plot/heatmap2dPlot.ts:78

___

### yRange

▸ **yRange**(): [`number`, `number`]

#### Returns

[`number`, `number`]

#### Inherited from

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[yRange](plot_abstractPlot.AbstractPlot.md#yrange)

#### Defined in

plot/abstractPlot.ts:32

___

### getHeight

▸ `Static` **getHeight**(`master`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `master` | [`MasterInterface`](masterInterface.MasterInterface.md) |

#### Returns

`number`

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[getHeight](plot_abstractPlot.AbstractPlot.md#getheight)

#### Defined in

plot/heatmap2dPlot.ts:74
