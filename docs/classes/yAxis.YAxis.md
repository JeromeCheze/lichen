[lichen](../README.md) / [Exports](../modules.md) / [yAxis](../modules/yAxis.md) / YAxis

# Class: YAxis

[yAxis](../modules/yAxis.md).YAxis

## Table of contents

### Constructors

- [constructor](yAxis.YAxis.md#constructor)

### Properties

- [canvas](yAxis.YAxis.md#canvas)
- [categories](yAxis.YAxis.md#categories)
- [ctx](yAxis.YAxis.md#ctx)
- [dataUtils](yAxis.YAxis.md#datautils)
- [master](yAxis.YAxis.md#master)
- [opt](yAxis.YAxis.md#opt)

### Methods

- [drawCategories](yAxis.YAxis.md#drawcategories)
- [drawLinearAxis](yAxis.YAxis.md#drawlinearaxis)
- [update](yAxis.YAxis.md#update)

## Constructors

### constructor

• **new YAxis**(`container`, `master`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `container` | `HTMLElement` |
| `master` | [`MasterInterface`](masterInterface.MasterInterface.md) |

#### Defined in

yAxis.ts:16

## Properties

### canvas

• **canvas**: `HTMLCanvasElement`

#### Defined in

yAxis.ts:9

___

### categories

• **categories**: `string`[]

#### Defined in

yAxis.ts:13

___

### ctx

• **ctx**: `CanvasRenderingContext2D`

#### Defined in

yAxis.ts:10

___

### dataUtils

• **dataUtils**: [`DataUtils`](dataUtils.DataUtils.md)

#### Defined in

yAxis.ts:12

___

### master

• **master**: [`MasterInterface`](masterInterface.MasterInterface.md)

#### Defined in

yAxis.ts:14

___

### opt

• **opt**: [`YAxisOptions`](../interfaces/types.YAxisOptions.md)

#### Defined in

yAxis.ts:11

## Methods

### drawCategories

▸ **drawCategories**(): `void`

#### Returns

`void`

#### Defined in

yAxis.ts:177

___

### drawLinearAxis

▸ **drawLinearAxis**(): `void`

#### Returns

`void`

#### Defined in

yAxis.ts:109

___

### update

▸ **update**(): `void`

#### Returns

`void`

#### Defined in

yAxis.ts:195
