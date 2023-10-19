[lichen](../README.md) / [Exports](../modules.md) / [plot/linePlot](../modules/plot_linePlot.md) / LinePlot

# Class: LinePlot

[plot/linePlot](../modules/plot_linePlot.md).LinePlot

## Hierarchy

- [`AbstractPlot`](plot_abstractPlot.AbstractPlot.md)

  ↳ **`LinePlot`**

## Table of contents

### Constructors

- [constructor](plot_linePlot.LinePlot.md#constructor)

### Properties

- [canvas](plot_linePlot.LinePlot.md#canvas)
- [colorScale](plot_linePlot.LinePlot.md#colorscale)
- [ctx](plot_linePlot.LinePlot.md#ctx)
- [dataUtils](plot_linePlot.LinePlot.md#datautils)
- [master](plot_linePlot.LinePlot.md#master)
- [opt](plot_linePlot.LinePlot.md#opt)

### Methods

- [dataFromXPos](plot_linePlot.LinePlot.md#datafromxpos)
- [getProcessingData](plot_linePlot.LinePlot.md#getprocessingdata)
- [getXRangeIndex](plot_linePlot.LinePlot.md#getxrangeindex)
- [isDataStacked](plot_linePlot.LinePlot.md#isdatastacked)
- [setSerieColor](plot_linePlot.LinePlot.md#setseriecolor)
- [tooltipHandler](plot_linePlot.LinePlot.md#tooltiphandler)
- [update](plot_linePlot.LinePlot.md#update)
- [xRange](plot_linePlot.LinePlot.md#xrange)
- [yRange](plot_linePlot.LinePlot.md#yrange)
- [getHeight](plot_linePlot.LinePlot.md#getheight)

## Constructors

### constructor

• **new LinePlot**(`container`, `master`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `container` | `HTMLElement` |
| `master` | [`MasterInterface`](masterInterface.MasterInterface.md) |

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[constructor](plot_abstractPlot.AbstractPlot.md#constructor)

#### Defined in

plot/linePlot.ts:12

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

plot/linePlot.ts:10

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

• **opt**: [`LineOptions`](../interfaces/types.LineOptions.md)[]

#### Defined in

plot/linePlot.ts:9

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

plot/linePlot.ts:51

___

### getProcessingData

▸ **getProcessingData**(): `any`[]

#### Returns

`any`[]

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[getProcessingData](plot_abstractPlot.AbstractPlot.md#getprocessingdata)

#### Defined in

plot/linePlot.ts:101

___

### getXRangeIndex

▸ **getXRangeIndex**(`serie`): `number`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `serie` | [`LineOptions`](../interfaces/types.LineOptions.md) |

#### Returns

`number`[]

#### Defined in

plot/linePlot.ts:94

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

### setSerieColor

▸ **setSerieColor**(`serie`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serie` | [`LineOptions`](../interfaces/types.LineOptions.md) |

#### Returns

`void`

#### Defined in

plot/linePlot.ts:110

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

plot/linePlot.ts:21

___

### update

▸ **update**(): `void`

#### Returns

`void`

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[update](plot_abstractPlot.AbstractPlot.md#update)

#### Defined in

plot/linePlot.ts:143

___

### xRange

▸ **xRange**(): [`number`, `number`]

#### Returns

[`number`, `number`]

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[xRange](plot_abstractPlot.AbstractPlot.md#xrange)

#### Defined in

plot/linePlot.ts:83

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

▸ `Static` **getHeight**(`master`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `master` | [`MasterInterface`](masterInterface.MasterInterface.md) |

#### Returns

`any`

#### Inherited from

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[getHeight](plot_abstractPlot.AbstractPlot.md#getheight)

#### Defined in

plot/abstractPlot.ts:24
