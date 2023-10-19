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
- [opt](plot_sequencePlot.SequencePlot.md#opt)

### Methods

- [dataFromXPos](plot_sequencePlot.SequencePlot.md#datafromxpos)
- [getProcessingData](plot_sequencePlot.SequencePlot.md#getprocessingdata)
- [getXRangeIndex](plot_sequencePlot.SequencePlot.md#getxrangeindex)
- [isDataStacked](plot_sequencePlot.SequencePlot.md#isdatastacked)
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

plot/sequencePlot.ts:11

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

• **opt**: [`SequenceOptions`](../interfaces/types.SequenceOptions.md)

#### Defined in

plot/sequencePlot.ts:9

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

plot/sequencePlot.ts:35

___

### getProcessingData

▸ **getProcessingData**(): `number`[][]

#### Returns

`number`[][]

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[getProcessingData](plot_abstractPlot.AbstractPlot.md#getprocessingdata)

#### Defined in

plot/sequencePlot.ts:70

___

### getXRangeIndex

▸ **getXRangeIndex**(): `number`[]

#### Returns

`number`[]

#### Defined in

plot/sequencePlot.ts:63

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

plot/sequencePlot.ts:18

___

### update

▸ **update**(): `void`

#### Returns

`void`

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[update](plot_abstractPlot.AbstractPlot.md#update)

#### Defined in

plot/sequencePlot.ts:74

___

### xRange

▸ **xRange**(): [`number`, `number`]

#### Returns

[`number`, `number`]

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[xRange](plot_abstractPlot.AbstractPlot.md#xrange)

#### Defined in

plot/sequencePlot.ts:59

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

plot/sequencePlot.ts:55
