[lichen](../README.md) / [Exports](../modules.md) / [plot/stackedPlot](../modules/plot_stackedPlot.md) / StackedPlot

# Class: StackedPlot

[plot/stackedPlot](../modules/plot_stackedPlot.md).StackedPlot

## Hierarchy

- [`AbstractPlot`](plot_abstractPlot.AbstractPlot.md)

  ↳ **`StackedPlot`**

## Table of contents

### Constructors

- [constructor](plot_stackedPlot.StackedPlot.md#constructor)

### Properties

- [canvas](plot_stackedPlot.StackedPlot.md#canvas)
- [ctx](plot_stackedPlot.StackedPlot.md#ctx)
- [dataUtils](plot_stackedPlot.StackedPlot.md#datautils)
- [master](plot_stackedPlot.StackedPlot.md#master)

### Accessors

- [colorScale](plot_stackedPlot.StackedPlot.md#colorscale)
- [opt](plot_stackedPlot.StackedPlot.md#opt)

### Methods

- [dataFromXPos](plot_stackedPlot.StackedPlot.md#datafromxpos)
- [getProcessingData](plot_stackedPlot.StackedPlot.md#getprocessingdata)
- [getXRangeIndex](plot_stackedPlot.StackedPlot.md#getxrangeindex)
- [isDataStacked](plot_stackedPlot.StackedPlot.md#isdatastacked)
- [setSerieColor](plot_stackedPlot.StackedPlot.md#setseriecolor)
- [step](plot_stackedPlot.StackedPlot.md#step)
- [tooltipHandler](plot_stackedPlot.StackedPlot.md#tooltiphandler)
- [update](plot_stackedPlot.StackedPlot.md#update)
- [xRange](plot_stackedPlot.StackedPlot.md#xrange)
- [yRange](plot_stackedPlot.StackedPlot.md#yrange)
- [getHeight](plot_stackedPlot.StackedPlot.md#getheight)

## Constructors

### constructor

• **new StackedPlot**(`container`, `master`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `container` | `HTMLElement` |
| `master` | [`MasterInterface`](masterInterface.MasterInterface.md) |

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[constructor](plot_abstractPlot.AbstractPlot.md#constructor)

#### Defined in

plot/stackedPlot.ts:8

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

## Accessors

### colorScale

• `get` **colorScale**(): [`ColorScaleOptions`](../interfaces/types.ColorScaleOptions.md)

#### Returns

[`ColorScaleOptions`](../interfaces/types.ColorScaleOptions.md)

#### Inherited from

AbstractPlot.colorScale

#### Defined in

plot/abstractPlot.ts:24

___

### opt

• `get` **opt**(): [`StackedOptions`](../interfaces/types.StackedOptions.md)

#### Returns

[`StackedOptions`](../interfaces/types.StackedOptions.md)

#### Defined in

plot/stackedPlot.ts:15

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

plot/stackedPlot.ts:54

___

### getProcessingData

▸ **getProcessingData**(): `any`[]

#### Returns

`any`[]

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[getProcessingData](plot_abstractPlot.AbstractPlot.md#getprocessingdata)

#### Defined in

plot/stackedPlot.ts:105

___

### getXRangeIndex

▸ **getXRangeIndex**(): `number`[]

#### Returns

`number`[]

#### Defined in

plot/stackedPlot.ts:98

___

### isDataStacked

▸ **isDataStacked**(): `boolean`

#### Returns

`boolean`

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[isDataStacked](plot_abstractPlot.AbstractPlot.md#isdatastacked)

#### Defined in

plot/stackedPlot.ts:86

___

### setSerieColor

▸ **setSerieColor**(`serie`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serie` | [`StackedDataOptions`](../interfaces/types.StackedDataOptions.md) |

#### Returns

`void`

#### Defined in

plot/stackedPlot.ts:114

___

### step

▸ **step**(): `number`

#### Returns

`number`

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[step](plot_abstractPlot.AbstractPlot.md#step)

#### Defined in

plot/stackedPlot.ts:94

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

plot/stackedPlot.ts:19

___

### update

▸ **update**(): `void`

#### Returns

`void`

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[update](plot_abstractPlot.AbstractPlot.md#update)

#### Defined in

plot/stackedPlot.ts:120

___

### xRange

▸ **xRange**(): [`number`, `number`]

#### Returns

[`number`, `number`]

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[xRange](plot_abstractPlot.AbstractPlot.md#xrange)

#### Defined in

plot/stackedPlot.ts:90

___

### yRange

▸ **yRange**(): [`number`, `number`]

#### Returns

[`number`, `number`]

#### Inherited from

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[yRange](plot_abstractPlot.AbstractPlot.md#yrange)

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

#### Inherited from

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[getHeight](plot_abstractPlot.AbstractPlot.md#getheight)

#### Defined in

plot/abstractPlot.ts:28
