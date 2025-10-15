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

### Accessors

- [opt](xAxis.XAxis.md#opt)

### Methods

- [drawAxis](xAxis.XAxis.md#drawaxis)
- [drawTickPositions](xAxis.XAxis.md#drawtickpositions)
- [formatDatetimeTick](xAxis.XAxis.md#formatdatetimetick)
- [formatLinearTick](xAxis.XAxis.md#formatlineartick)
- [getDatetimeTickPositions](xAxis.XAxis.md#getdatetimetickpositions)
- [getLinearTickPositions](xAxis.XAxis.md#getlineartickpositions)
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

xAxis.ts:14

## Properties

### canvas

• **canvas**: `HTMLCanvasElement`

#### Defined in

xAxis.ts:9

___

### ctx

• **ctx**: `CanvasRenderingContext2D`

#### Defined in

xAxis.ts:10

___

### dataUtils

• **dataUtils**: [`DataUtils`](dataUtils.DataUtils.md)

#### Defined in

xAxis.ts:11

___

### master

• **master**: [`MasterInterface`](masterInterface.MasterInterface.md)

#### Defined in

xAxis.ts:12

## Accessors

### opt

• `get` **opt**(): [`XAxisOptions`](../interfaces/types.XAxisOptions.md)

#### Returns

[`XAxisOptions`](../interfaces/types.XAxisOptions.md)

#### Defined in

xAxis.ts:32

## Methods

### drawAxis

▸ **drawAxis**(): `void`

#### Returns

`void`

#### Defined in

xAxis.ts:130

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

xAxis.ts:111

___

### formatDatetimeTick

▸ **formatDatetimeTick**(`v`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `number` |

#### Returns

`string`

#### Defined in

xAxis.ts:98

___

### formatLinearTick

▸ **formatLinearTick**(`v`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `number` |

#### Returns

`string`

#### Defined in

xAxis.ts:94

___

### getDatetimeTickPositions

▸ **getDatetimeTickPositions**(`min`, `max`, `tickInterval`): `number`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `min` | `number` |
| `max` | `number` |
| `tickInterval` | `number` |

#### Returns

`number`[]

#### Defined in

xAxis.ts:62

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

xAxis.ts:36

___

### update

▸ **update**(): `void`

#### Returns

`void`

#### Defined in

xAxis.ts:159
