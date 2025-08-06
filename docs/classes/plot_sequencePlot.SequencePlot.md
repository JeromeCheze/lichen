[lichen](../README.md) / [Exports](../modules.md) / [plot/sequencePlot](../modules/plot_sequencePlot.md) / SequencePlot

# Class: SequencePlot

[plot/sequencePlot](../modules/plot_sequencePlot.md).SequencePlot

## Hierarchy

- [`AbstractPlot`](plot_abstractPlot.AbstractPlot.md)

  ↳ **`SequencePlot`**

## Table of contents

### Constructors

- [constructor](plot_sequencePlot.SequencePlot.md#constructor)

### Properties

- [canvas](plot_sequencePlot.SequencePlot.md#canvas)
- [ctx](plot_sequencePlot.SequencePlot.md#ctx)
- [dataUtils](plot_sequencePlot.SequencePlot.md#datautils)
- [master](plot_sequencePlot.SequencePlot.md#master)

### Accessors

- [colorScale](plot_sequencePlot.SequencePlot.md#colorscale)
- [opt](plot_sequencePlot.SequencePlot.md#opt)

### Methods

- [dataFromXPos](plot_sequencePlot.SequencePlot.md#datafromxpos)
- [getProcessingData](plot_sequencePlot.SequencePlot.md#getprocessingdata)
- [getXRangeIndex](plot_sequencePlot.SequencePlot.md#getxrangeindex)
- [isDataStacked](plot_sequencePlot.SequencePlot.md#isdatastacked)
- [step](plot_sequencePlot.SequencePlot.md#step)
- [tooltipHandler](plot_sequencePlot.SequencePlot.md#tooltiphandler)
- [update](plot_sequencePlot.SequencePlot.md#update)
- [xRange](plot_sequencePlot.SequencePlot.md#xrange)
- [yRange](plot_sequencePlot.SequencePlot.md#yrange)
- [getHeight](plot_sequencePlot.SequencePlot.md#getheight)

## Constructors

### constructor

• **new SequencePlot**(`container`, `master`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `container` | `HTMLElement` |
| `master` | [`MasterInterface`](masterInterface.MasterInterface.md) |

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[constructor](plot_abstractPlot.AbstractPlot.md#constructor)

#### Defined in

plot/sequencePlot.ts:9

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

• `get` **opt**(): [`SequenceOptions`](../interfaces/types.SequenceOptions.md)

#### Returns

[`SequenceOptions`](../interfaces/types.SequenceOptions.md)

#### Defined in

plot/sequencePlot.ts:15

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

plot/sequencePlot.ts:36

___

### getProcessingData

▸ **getProcessingData**(): `number`[][]

#### Returns

`number`[][]

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[getProcessingData](plot_abstractPlot.AbstractPlot.md#getprocessingdata)

#### Defined in

plot/sequencePlot.ts:75

___

### getXRangeIndex

▸ **getXRangeIndex**(): `number`[]

#### Returns

`number`[]

#### Defined in

plot/sequencePlot.ts:68

___

### isDataStacked

▸ **isDataStacked**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[isDataStacked](plot_abstractPlot.AbstractPlot.md#isdatastacked)

#### Defined in

plot/abstractPlot.ts:32

___

### step

▸ **step**(): `number`

#### Returns

`number`

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[step](plot_abstractPlot.AbstractPlot.md#step)

#### Defined in

plot/sequencePlot.ts:64

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

plot/sequencePlot.ts:19

___

### update

▸ **update**(): `void`

#### Returns

`void`

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[update](plot_abstractPlot.AbstractPlot.md#update)

#### Defined in

plot/sequencePlot.ts:79

___

### xRange

▸ **xRange**(): [`number`, `number`]

#### Returns

[`number`, `number`]

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[xRange](plot_abstractPlot.AbstractPlot.md#xrange)

#### Defined in

plot/sequencePlot.ts:60

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

plot/sequencePlot.ts:56
