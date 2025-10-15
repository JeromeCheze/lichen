[lichen](../README.md) / [Exports](../modules.md) / [frontPanel](../modules/frontPanel.md) / FrontPanel

# Class: FrontPanel

[frontPanel](../modules/frontPanel.md).FrontPanel

## Table of contents

### Constructors

- [constructor](frontPanel.FrontPanel.md#constructor)

### Properties

- [canvas](frontPanel.FrontPanel.md#canvas)
- [ctx](frontPanel.FrontPanel.md#ctx)
- [dataUtils](frontPanel.FrontPanel.md#datautils)
- [master](frontPanel.FrontPanel.md#master)
- [selected](frontPanel.FrontPanel.md#selected)
- [state](frontPanel.FrontPanel.md#state)
- [tooltipDiv](frontPanel.FrontPanel.md#tooltipdiv)

### Accessors

- [colorScale](frontPanel.FrontPanel.md#colorscale)
- [crosshair](frontPanel.FrontPanel.md#crosshair)
- [tooltip](frontPanel.FrontPanel.md#tooltip)
- [vLines](frontPanel.FrontPanel.md#vlines)

### Methods

- [drawCrosshair](frontPanel.FrontPanel.md#drawcrosshair)
- [drawTooltip](frontPanel.FrontPanel.md#drawtooltip)
- [drawVLines](frontPanel.FrontPanel.md#drawvlines)
- [getDataTooltipContent](frontPanel.FrontPanel.md#getdatatooltipcontent)
- [getVLineTooltipContent](frontPanel.FrontPanel.md#getvlinetooltipcontent)
- [handleActive](frontPanel.FrontPanel.md#handleactive)
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

frontPanel.ts:15

## Properties

### canvas

• **canvas**: `HTMLCanvasElement`

#### Defined in

frontPanel.ts:7

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

frontPanel.ts:11

___

### state

• **state**: `Record`<`string`, `any`\>

#### Defined in

frontPanel.ts:13

___

### tooltipDiv

• **tooltipDiv**: `HTMLElement`

#### Defined in

frontPanel.ts:12

## Accessors

### colorScale

• `get` **colorScale**(): [`ColorScaleOptions`](../interfaces/types.ColorScaleOptions.md)

#### Returns

[`ColorScaleOptions`](../interfaces/types.ColorScaleOptions.md)

#### Defined in

frontPanel.ts:62

___

### crosshair

• `get` **crosshair**(): [`CrosshairOptions`](../interfaces/types.CrosshairOptions.md)

#### Returns

[`CrosshairOptions`](../interfaces/types.CrosshairOptions.md)

#### Defined in

frontPanel.ts:58

___

### tooltip

• `get` **tooltip**(): `boolean`

#### Returns

`boolean`

#### Defined in

frontPanel.ts:50

___

### vLines

• `get` **vLines**(): [`VLine`](../interfaces/types.VLine.md)[]

#### Returns

[`VLine`](../interfaces/types.VLine.md)[]

#### Defined in

frontPanel.ts:54

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

frontPanel.ts:236

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

frontPanel.ts:139

___

### drawVLines

▸ **drawVLines**(): `void`

#### Returns

`void`

#### Defined in

frontPanel.ts:170

___

### getDataTooltipContent

▸ **getDataTooltipContent**(`value`): `HTMLElement`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`HTMLElement`[]

#### Defined in

frontPanel.ts:73

___

### getVLineTooltipContent

▸ **getVLineTooltipContent**(`value`): `HTMLElement`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`HTMLElement`[]

#### Defined in

frontPanel.ts:120

___

### handleActive

▸ **handleActive**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

#### Defined in

frontPanel.ts:66

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

frontPanel.ts:224

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

frontPanel.ts:262

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

frontPanel.ts:299
