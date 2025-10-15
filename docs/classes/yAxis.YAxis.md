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

### Accessors

- [opt](yAxis.YAxis.md#opt)

### Methods

- [drawAxis](yAxis.YAxis.md#drawaxis)
- [drawCategories](yAxis.YAxis.md#drawcategories)
- [drawTickPositions](yAxis.YAxis.md#drawtickpositions)
- [getLinearTickPositions](yAxis.YAxis.md#getlineartickpositions)
- [getLogTickPositions](yAxis.YAxis.md#getlogtickpositions)
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

yAxis.ts:15

## Properties

### canvas

• **canvas**: `HTMLCanvasElement`

#### Defined in

yAxis.ts:9

___

### categories

• **categories**: `string`[]

#### Defined in

yAxis.ts:12

___

### ctx

• **ctx**: `CanvasRenderingContext2D`

#### Defined in

yAxis.ts:10

___

### dataUtils

• **dataUtils**: [`DataUtils`](dataUtils.DataUtils.md)

#### Defined in

yAxis.ts:11

___

### master

• **master**: [`MasterInterface`](masterInterface.MasterInterface.md)

#### Defined in

yAxis.ts:13

## Accessors

### opt

• `get` **opt**(): [`YAxisOptions`](../interfaces/types.YAxisOptions.md)

#### Returns

[`YAxisOptions`](../interfaces/types.YAxisOptions.md)

#### Defined in

yAxis.ts:32

## Methods

### drawAxis

▸ **drawAxis**(): `void`

#### Returns

`void`

#### Defined in

yAxis.ts:106

___

### drawCategories

▸ **drawCategories**(): `void`

#### Returns

`void`

#### Defined in

yAxis.ts:139

___

### drawTickPositions

▸ **drawTickPositions**(`tickPos`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tickPos` | `number`[] |

#### Returns

`void`

#### Defined in

yAxis.ts:36

___

### getLinearTickPositions

▸ **getLinearTickPositions**(`min`, `max`, `tickInterval`): `number`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `min` | `number` |
| `max` | `number` |
| `tickInterval` | `number` |

#### Returns

`number`[]

#### Defined in

yAxis.ts:60

___

### getLogTickPositions

▸ **getLogTickPositions**(`min`, `max`, `tickInterval`): `number`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `min` | `number` |
| `max` | `number` |
| `tickInterval` | `number` |

#### Returns

`number`[]

#### Defined in

yAxis.ts:86

___

### update

▸ **update**(): `void`

#### Returns

`void`

#### Defined in

yAxis.ts:157
