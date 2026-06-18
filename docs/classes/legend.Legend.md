[lichen](../README.md) / [Exports](../modules.md) / [legend](../modules/legend.md) / Legend

# Class: Legend

[legend](../modules/legend.md).Legend

## Table of contents

### Constructors

- [constructor](legend.Legend.md#constructor)

### Properties

- [container](legend.Legend.md#container)
- [master](legend.Legend.md#master)

### Accessors

- [colorScale](legend.Legend.md#colorscale)
- [height](legend.Legend.md#height)
- [opt](legend.Legend.md#opt)
- [series](legend.Legend.md#series)
- [type](legend.Legend.md#type)

### Methods

- [drawColorBar](legend.Legend.md#drawcolorbar)
- [drawLegend](legend.Legend.md#drawlegend)
- [update](legend.Legend.md#update)

## Constructors

### constructor

• **new Legend**(`container`, `master`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `container` | `HTMLElement` |
| `master` | [`MasterInterface`](masterInterface.MasterInterface.md) |

#### Defined in

legend.ts:9

## Properties

### container

• **container**: `HTMLElement`

#### Defined in

legend.ts:7

___

### master

• **master**: [`MasterInterface`](masterInterface.MasterInterface.md)

#### Defined in

legend.ts:6

## Accessors

### colorScale

• `get` **colorScale**(): [`ColorScaleOptions`](../interfaces/types.ColorScaleOptions.md)

#### Returns

[`ColorScaleOptions`](../interfaces/types.ColorScaleOptions.md)

#### Defined in

legend.ts:26

___

### height

• `get` **height**(): `number`

#### Returns

`number`

#### Defined in

legend.ts:34

___

### opt

• `get` **opt**(): [`LegendOptions`](../interfaces/types.LegendOptions.md)

#### Returns

[`LegendOptions`](../interfaces/types.LegendOptions.md)

#### Defined in

legend.ts:18

___

### series

• `get` **series**(): [`LineOptions`](../interfaces/types.LineOptions.md)[] \| [`Heatmap2dOptions`](../interfaces/types.Heatmap2dOptions.md)[] \| [`Heatmap3dOptions`](../interfaces/types.Heatmap3dOptions.md) \| [`StackedOptions`](../interfaces/types.StackedOptions.md) \| [`SequenceOptions`](../interfaces/types.SequenceOptions.md) \| [`ScatterOptions`](../interfaces/types.ScatterOptions.md)[]

#### Returns

[`LineOptions`](../interfaces/types.LineOptions.md)[] \| [`Heatmap2dOptions`](../interfaces/types.Heatmap2dOptions.md)[] \| [`Heatmap3dOptions`](../interfaces/types.Heatmap3dOptions.md) \| [`StackedOptions`](../interfaces/types.StackedOptions.md) \| [`SequenceOptions`](../interfaces/types.SequenceOptions.md) \| [`ScatterOptions`](../interfaces/types.ScatterOptions.md)[]

#### Defined in

legend.ts:30

___

### type

• `get` **type**(): ``"line"`` \| ``"sequence"`` \| ``"heatmap2d"`` \| ``"heatmap3d"`` \| ``"stacked"`` \| ``"scatter"``

#### Returns

``"line"`` \| ``"sequence"`` \| ``"heatmap2d"`` \| ``"heatmap3d"`` \| ``"stacked"`` \| ``"scatter"``

#### Defined in

legend.ts:22

## Methods

### drawColorBar

▸ **drawColorBar**(): `void`

#### Returns

`void`

#### Defined in

legend.ts:38

___

### drawLegend

▸ **drawLegend**(`items`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | [`LegendItem`](../interfaces/types.LegendItem.md)[] |

#### Returns

`void`

#### Defined in

legend.ts:122

___

### update

▸ **update**(): `void`

#### Returns

`void`

#### Defined in

legend.ts:161
