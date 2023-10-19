[lichen](../README.md) / [Exports](../modules.md) / [frontPanel](../modules/frontPanel.md) / FrontPanel

# Class: FrontPanel

[frontPanel](../modules/frontPanel.md).FrontPanel

## Table of contents

### Constructors

- [constructor](frontPanel.FrontPanel.md#constructor)

### Properties

- [canvas](frontPanel.FrontPanel.md#canvas)
- [colorScale](frontPanel.FrontPanel.md#colorscale)
- [crosshair](frontPanel.FrontPanel.md#crosshair)
- [ctx](frontPanel.FrontPanel.md#ctx)
- [dataUtils](frontPanel.FrontPanel.md#datautils)
- [master](frontPanel.FrontPanel.md#master)
- [selected](frontPanel.FrontPanel.md#selected)
- [state](frontPanel.FrontPanel.md#state)
- [tooltip](frontPanel.FrontPanel.md#tooltip)
- [tooltipDiv](frontPanel.FrontPanel.md#tooltipdiv)
- [vLines](frontPanel.FrontPanel.md#vlines)

### Methods

- [drawCrosshair](frontPanel.FrontPanel.md#drawcrosshair)
- [drawTooltip](frontPanel.FrontPanel.md#drawtooltip)
- [drawVLines](frontPanel.FrontPanel.md#drawvlines)
- [handleClick](frontPanel.FrontPanel.md#handleclick)
- [selection](frontPanel.FrontPanel.md#selection)
- [update](frontPanel.FrontPanel.md#update)

## Constructors

### constructor

• **new FrontPanel**(`container`, `master`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `container` | `HTMLElement` |
| `master` | [`MasterInterface`](masterInterface.MasterInterface.md) |

#### Defined in

frontPanel.ts:19

## Properties

### canvas

• **canvas**: `HTMLCanvasElement`

#### Defined in

frontPanel.ts:7

___

### colorScale

• **colorScale**: [`ColorScaleOptions`](../interfaces/types.ColorScaleOptions.md)

#### Defined in

frontPanel.ts:11

___

### crosshair

• **crosshair**: [`CrosshairOptions`](../interfaces/types.CrosshairOptions.md)

#### Defined in

frontPanel.ts:13

___

### ctx

• **ctx**: `CanvasRenderingContext2D`

#### Defined in

frontPanel.ts:8

___

### dataUtils

• **dataUtils**: [`DataUtils`](dataUtils.DataUtils.md)

#### Defined in

frontPanel.ts:10

___

### master

• **master**: [`MasterInterface`](masterInterface.MasterInterface.md)

#### Defined in

frontPanel.ts:9

___

### selected

• **selected**: [`VLine`](../interfaces/types.VLine.md)[]

#### Defined in

frontPanel.ts:15

___

### state

• **state**: `Record`<`string`, `any`\>

#### Defined in

frontPanel.ts:17

___

### tooltip

• **tooltip**: `boolean`

#### Defined in

frontPanel.ts:12

___

### tooltipDiv

• **tooltipDiv**: `HTMLElement`

#### Defined in

frontPanel.ts:16

___

### vLines

• **vLines**: [`VLine`](../interfaces/types.VLine.md)[]

#### Defined in

frontPanel.ts:14

## Methods

### drawCrosshair

▸ **drawCrosshair**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

frontPanel.ts:172

___

### drawTooltip

▸ **drawTooltip**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

frontPanel.ts:61

___

### drawVLines

▸ **drawVLines**(): `void`

#### Returns

`void`

#### Defined in

frontPanel.ts:119

___

### handleClick

▸ **handleClick**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Object` |
| `data.x` | `number` |
| `data.xPos` | `number` |
| `data.y` | `number` |
| `data.yPos` | `number` |

#### Returns

`void`

#### Defined in

frontPanel.ts:161

___

### selection

▸ **selection**(`x`, `y`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | [`number`, `number`] |
| `y` | [`number`, `number`] |

#### Returns

`void`

#### Defined in

frontPanel.ts:195

___

### update

▸ **update**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

frontPanel.ts:216
