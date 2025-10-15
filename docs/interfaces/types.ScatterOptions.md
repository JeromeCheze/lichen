[lichen](../README.md) / [Exports](../modules.md) / [types](../modules/types.md) / ScatterOptions

# Interface: ScatterOptions

[types](../modules/types.md).ScatterOptions

## Table of contents

### Properties

- [color](types.ScatterOptions.md#color)
- [data](types.ScatterOptions.md#data)
- [enabled](types.ScatterOptions.md#enabled)
- [name](types.ScatterOptions.md#name)
- [shape](types.ScatterOptions.md#shape)
- [tooltipFormatter](types.ScatterOptions.md#tooltipformatter)

## Properties

### color

• **color**: `string`

#### Defined in

types.ts:92

___

### data

• **data**: [`ScatterPoint`](types.ScatterPoint.md)[]

#### Defined in

types.ts:95

___

### enabled

• `Optional` **enabled**: `boolean`

#### Defined in

types.ts:94

___

### name

• **name**: `string`

#### Defined in

types.ts:91

___

### shape

• **shape**: ``"circle"`` \| ``"diamond"``

#### Defined in

types.ts:93

___

### tooltipFormatter

• `Optional` **tooltipFormatter**: (`x`: [`ScatterPoint`](types.ScatterPoint.md)) => `string`

#### Type declaration

▸ (`x`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `x` | [`ScatterPoint`](types.ScatterPoint.md) |

##### Returns

`string`

#### Defined in

types.ts:96
