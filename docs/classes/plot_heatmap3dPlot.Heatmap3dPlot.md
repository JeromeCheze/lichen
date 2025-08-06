[lichen](../README.md) / [Exports](../modules.md) / [plot/heatmap3dPlot](../modules/plot_heatmap3dPlot.md) / Heatmap3dPlot

# Class: Heatmap3dPlot

[plot/heatmap3dPlot](../modules/plot_heatmap3dPlot.md).Heatmap3dPlot

## Hierarchy

- [`AbstractPlot`](plot_abstractPlot.AbstractPlot.md)

  ↳ **`Heatmap3dPlot`**

## Table of contents

### Constructors

- [constructor](plot_heatmap3dPlot.Heatmap3dPlot.md#constructor)

### Properties

- [canvas](plot_heatmap3dPlot.Heatmap3dPlot.md#canvas)
- [ctx](plot_heatmap3dPlot.Heatmap3dPlot.md#ctx)
- [dataUtils](plot_heatmap3dPlot.Heatmap3dPlot.md#datautils)
- [image](plot_heatmap3dPlot.Heatmap3dPlot.md#image)
- [imageHeight](plot_heatmap3dPlot.Heatmap3dPlot.md#imageheight)
- [imageWidth](plot_heatmap3dPlot.Heatmap3dPlot.md#imagewidth)
- [master](plot_heatmap3dPlot.Heatmap3dPlot.md#master)

### Accessors

- [colorScale](plot_heatmap3dPlot.Heatmap3dPlot.md#colorscale)
- [opt](plot_heatmap3dPlot.Heatmap3dPlot.md#opt)

### Methods

- [createImage](plot_heatmap3dPlot.Heatmap3dPlot.md#createimage)
- [dataFromXPos](plot_heatmap3dPlot.Heatmap3dPlot.md#datafromxpos)
- [getProcessingData](plot_heatmap3dPlot.Heatmap3dPlot.md#getprocessingdata)
- [isDataStacked](plot_heatmap3dPlot.Heatmap3dPlot.md#isdatastacked)
- [step](plot_heatmap3dPlot.Heatmap3dPlot.md#step)
- [tooltipHandler](plot_heatmap3dPlot.Heatmap3dPlot.md#tooltiphandler)
- [update](plot_heatmap3dPlot.Heatmap3dPlot.md#update)
- [xRange](plot_heatmap3dPlot.Heatmap3dPlot.md#xrange)
- [yRange](plot_heatmap3dPlot.Heatmap3dPlot.md#yrange)
- [getHeight](plot_heatmap3dPlot.Heatmap3dPlot.md#getheight)

## Constructors

### constructor

• **new Heatmap3dPlot**(`container`, `master`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `container` | `HTMLElement` |
| `master` | [`MasterInterface`](masterInterface.MasterInterface.md) |

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[constructor](plot_abstractPlot.AbstractPlot.md#constructor)

#### Defined in

plot/heatmap3dPlot.ts:12

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

### image

• **image**: `HTMLImageElement`

#### Defined in

plot/heatmap3dPlot.ts:8

___

### imageHeight

• **imageHeight**: `number`

#### Defined in

plot/heatmap3dPlot.ts:10

___

### imageWidth

• **imageWidth**: `number`

#### Defined in

plot/heatmap3dPlot.ts:9

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

• `get` **opt**(): [`Heatmap3dOptions`](../interfaces/types.Heatmap3dOptions.md)

#### Returns

[`Heatmap3dOptions`](../interfaces/types.Heatmap3dOptions.md)

#### Defined in

plot/heatmap3dPlot.ts:33

## Methods

### createImage

▸ **createImage**(): `void`

#### Returns

`void`

#### Defined in

plot/heatmap3dPlot.ts:61

___

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

plot/heatmap3dPlot.ts:41

___

### getProcessingData

▸ **getProcessingData**(): `any`[]

#### Returns

`any`[]

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[getProcessingData](plot_abstractPlot.AbstractPlot.md#getprocessingdata)

#### Defined in

plot/heatmap3dPlot.ts:57

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

plot/heatmap3dPlot.ts:49

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

plot/heatmap3dPlot.ts:37

___

### update

▸ **update**(`forceRedraw?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `forceRedraw` | `boolean` | `false` |

#### Returns

`void`

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[update](plot_abstractPlot.AbstractPlot.md#update)

#### Defined in

plot/heatmap3dPlot.ts:93

___

### xRange

▸ **xRange**(): [`number`, `number`]

#### Returns

[`number`, `number`]

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[xRange](plot_abstractPlot.AbstractPlot.md#xrange)

#### Defined in

plot/heatmap3dPlot.ts:45

___

### yRange

▸ **yRange**(): [`number`, `number`]

#### Returns

[`number`, `number`]

#### Overrides

[AbstractPlot](plot_abstractPlot.AbstractPlot.md).[yRange](plot_abstractPlot.AbstractPlot.md#yrange)

#### Defined in

plot/heatmap3dPlot.ts:53

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
