[lichen](../README.md) / [Exports](../modules.md) / [xAxis](../modules/xAxis.md) / XAxis

# Class: XAxis

[xAxis](../modules/xAxis.md).XAxis

## Table of contents

### Constructors

- [constructor](xAxis.XAxis.md#constructor)

### Properties

- [canvas](xAxis.XAxis.md#canvas)
- [ctx](xAxis.XAxis.md#ctx)
- [dataUtils](xAxis.XAxis.md#datautils)
- [master](xAxis.XAxis.md#master)
- [opt](xAxis.XAxis.md#opt)

### Methods

- [drawDatetimeAxis](xAxis.XAxis.md#drawdatetimeaxis)
- [drawLinearAxis](xAxis.XAxis.md#drawlinearaxis)
- [update](xAxis.XAxis.md#update)

## Constructors

### constructor

• **new XAxis**(`container`, `master`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `container` | `HTMLElement` |
| `master` | [`MasterInterface`](masterInterface.MasterInterface.md) |

#### Defined in

xAxis.ts:15

## Properties

### canvas

• **canvas**: `HTMLCanvasElement`

#### Defined in

xAxis.ts:10

___

### ctx

• **ctx**: `CanvasRenderingContext2D`

#### Defined in

xAxis.ts:11

___

### dataUtils

• **dataUtils**: [`DataUtils`](dataUtils.DataUtils.md)

#### Defined in

xAxis.ts:12

___

### master

• **master**: [`MasterInterface`](masterInterface.MasterInterface.md)

#### Defined in

xAxis.ts:13

___

### opt

• **opt**: [`XAxisOptions`](../interfaces/types.XAxisOptions.md)

#### Defined in

xAxis.ts:9

## Methods

### drawDatetimeAxis

▸ **drawDatetimeAxis**(): `void`

#### Returns

`void`

#### Defined in

xAxis.ts:101

___

### drawLinearAxis

▸ **drawLinearAxis**(): `void`

#### Returns

`void`

#### Defined in

xAxis.ts:34

___

### update

▸ **update**(): `void`

#### Returns

`void`

#### Defined in

xAxis.ts:165
