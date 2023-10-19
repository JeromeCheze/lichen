[lichen](../README.md) / [Exports](../modules.md) / [legend](../modules/legend.md) / Legend

# Class: Legend

[legend](../modules/legend.md).Legend

## Table of contents

### Constructors

- [constructor](legend.Legend.md#constructor)

### Properties

- [colorScale](legend.Legend.md#colorscale)
- [container](legend.Legend.md#container)
- [height](legend.Legend.md#height)
- [master](legend.Legend.md#master)
- [opt](legend.Legend.md#opt)
- [series](legend.Legend.md#series)
- [type](legend.Legend.md#type)

### Methods

- [drawHeatmap3dLegend](legend.Legend.md#drawheatmap3dlegend)
- [drawLineLegend](legend.Legend.md#drawlinelegend)
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

legend.ts:14

## Properties

### colorScale

• **colorScale**: [`ColorScaleOptions`](../interfaces/types.ColorScaleOptions.md)

#### Defined in

legend.ts:10

___

### container

• **container**: `HTMLElement`

#### Defined in

legend.ts:7

___

### height

• **height**: `number`

#### Defined in

legend.ts:11

___

### master

• **master**: [`MasterInterface`](masterInterface.MasterInterface.md)

#### Defined in

legend.ts:6

___

### opt

• **opt**: [`LegendOptions`](../interfaces/types.LegendOptions.md)

#### Defined in

legend.ts:8

___

### series

• **series**: [`LineOptions`](../interfaces/types.LineOptions.md)[] \| [`Heatmap2dOptions`](../interfaces/types.Heatmap2dOptions.md)[] \| [`Heatmap3dOptions`](../interfaces/types.Heatmap3dOptions.md) \| [`StackedOptions`](../interfaces/types.StackedOptions.md) \| [`SequenceOptions`](../interfaces/types.SequenceOptions.md) \| [`ScatterOptions`](../interfaces/types.ScatterOptions.md)[]

#### Defined in

legend.ts:12

___

### type

• **type**: ``"line"`` \| ``"sequence"`` \| ``"heatmap2d"`` \| ``"heatmap3d"`` \| ``"stacked"`` \| ``"scatter"``

#### Defined in

legend.ts:9

## Methods

### drawHeatmap3dLegend

▸ **drawHeatmap3dLegend**(): `void`

#### Returns

`void`

#### Defined in

legend.ts:29

___

### drawLineLegend

▸ **drawLineLegend**(`items`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | [`LegendItem`](../interfaces/types.LegendItem.md)[] |

#### Returns

`void`

#### Defined in

legend.ts:87

___

### update

▸ **update**(): `void`

#### Returns

`void`

#### Defined in

legend.ts:126
