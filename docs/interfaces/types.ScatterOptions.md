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

types.ts:99

___

### data

• **data**: [`ScatterPoint`](types.ScatterPoint.md)[]

#### Defined in

types.ts:102

___

### enabled

• `Optional` **enabled**: `boolean`

#### Defined in

types.ts:101

___

### name

• **name**: `string`

#### Defined in

types.ts:98

___

### shape

• **shape**: ``"circle"`` \| ``"diamond"``

#### Defined in

types.ts:100

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

types.ts:103
