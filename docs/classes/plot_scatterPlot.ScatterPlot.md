[lichen](../README.md) / [Exports](../modules.md) / [plot/scatterPlot](../modules/plot_scatterPlot.md) / ScatterPlot

# Class: ScatterPlot

[plot/scatterPlot](../modules/plot_scatterPlot.md).ScatterPlot

## Hierarchy

- [`AbstractPlot`](plot_abstractPlot.AbstractPlot.md)

  ↳ **`ScatterPlot`**

## Table of contents

### Constructors

- [constructor](plot_scatterPlot.ScatterPlot.md#constructor)

### Properties

- [canvas](plot_scatterPlot.ScatterPlot.md#canvas)
- [ctx](plot_scatterPlot.ScatterPlot.md#ctx)
- [dataUtils](plot_scatterPlot.ScatterPlot.md#datautils)
- [master](plot_scatterPlot.ScatterPlot.md#master)
- [opt](plot_scatterPlot.ScatterPlot.md#opt)

### Methods

- [dataFromXPos](plot_scatterPlot.ScatterPlot.md#datafromxpos)
- [drawCircle](plot_scatterPlot.ScatterPlot.md#drawcircle)
- [drawDiamond](plot_scatterPlot.ScatterPlot.md#drawdiamond)
- [getProcessingData](plot_scatterPlot.ScatterPlot.md#getprocessingdata)
- [isDataStacked](plot_scatterPlot.ScatterPlot.md#isdatastacked)
- [tooltipHandler](plot_scatterPlot.ScatterPlot.md#tooltiphandler)
- [update](plot_scatterPlot.ScatterPlot.md#update)
- [xRange](plot_scatterPlot.ScatterPlot.md#xrange)
- [yRange](plot_scatterPlot.ScatterPlot.md#yrange)
- [getHeight](plot_scatterPlot.ScatterPlot.md#getheight)

## Constructors

### constructor

• **new ScatterPlot**(`container`, `master`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `container` | `HTMLElement` |
| `master` | [`MasterInterface`](masterInterface.MasterInterface.md) |

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[constructor](plot_abstractPlot.AbstractPlot.md#constructor)

#### Defined in

plot/scatterPlot.ts:13

## Properties

### canvas

• **canvas**: `HTMLCanvasElement`

#### Inherited from

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[canvas](plot_abstractPlot.AbstractPlot.md#canvas)

#### Defined in

plot/abstractPlot.ts:7

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

• **opt**: [`ScatterOptions`](../interfaces/types.ScatterOptions.md)[]

#### Defined in

plot/scatterPlot.ts:11

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

plot/scatterPlot.ts:68

___

### drawCircle

▸ **drawCircle**(`ctx`, `xPos`, `yPos`, `active`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CanvasRenderingContext2D` |
| `xPos` | `number` |
| `yPos` | `number` |
| `active` | `boolean` |

#### Returns

`void`

#### Defined in

plot/scatterPlot.ts:54

___

### drawDiamond

▸ **drawDiamond**(`ctx`, `xPos`, `yPos`, `active`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CanvasRenderingContext2D` |
| `xPos` | `number` |
| `yPos` | `number` |
| `active` | `boolean` |

#### Returns

`void`

#### Defined in

plot/scatterPlot.ts:59

___

### getProcessingData

▸ **getProcessingData**(): `any`[]

#### Returns

`any`[]

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[getProcessingData](plot_abstractPlot.AbstractPlot.md#getprocessingdata)

#### Defined in

plot/scatterPlot.ts:110

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

plot/scatterPlot.ts:18

___

### update

▸ **update**(): `void`

#### Returns

`void`

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[update](plot_abstractPlot.AbstractPlot.md#update)

#### Defined in

plot/scatterPlot.ts:118

___

### xRange

▸ **xRange**(): [`number`, `number`]

#### Returns

[`number`, `number`]

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[xRange](plot_abstractPlot.AbstractPlot.md#xrange)

#### Defined in

plot/scatterPlot.ts:97

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
