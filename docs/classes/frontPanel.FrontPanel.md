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
- [tooltipDebounce](frontPanel.FrontPanel.md#tooltipdebounce)
- [tooltipDiv](frontPanel.FrontPanel.md#tooltipdiv)

### Accessors

- [colorScale](frontPanel.FrontPanel.md#colorscale)
- [crosshair](frontPanel.FrontPanel.md#crosshair)
- [opt](frontPanel.FrontPanel.md#opt)
- [vLines](frontPanel.FrontPanel.md#vlines)

### Methods

- [destroy](frontPanel.FrontPanel.md#destroy)
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

frontPanel.ts:16

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

### tooltipDebounce

• **tooltipDebounce**: `number`

#### Defined in

frontPanel.ts:14

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

frontPanel.ts:67

___

### crosshair

• `get` **crosshair**(): [`CrosshairOptions`](../interfaces/types.CrosshairOptions.md)

#### Returns

[`CrosshairOptions`](../interfaces/types.CrosshairOptions.md)

#### Defined in

frontPanel.ts:63

___

### opt

• `get` **opt**(): [`TooltipOptions`](../interfaces/types.TooltipOptions.md)

#### Returns

[`TooltipOptions`](../interfaces/types.TooltipOptions.md)

#### Defined in

frontPanel.ts:55

___

### vLines

• `get` **vLines**(): [`VLine`](../interfaces/types.VLine.md)[]

#### Returns

[`VLine`](../interfaces/types.VLine.md)[]

#### Defined in

frontPanel.ts:59

## Methods

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Defined in

frontPanel.ts:71

___

### drawCrosshair

▸ **drawCrosshair**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

frontPanel.ts:249

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

frontPanel.ts:143

___

### drawVLines

▸ **drawVLines**(): `void`

#### Returns

`void`

#### Defined in

frontPanel.ts:184

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

frontPanel.ts:82

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

frontPanel.ts:124

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

frontPanel.ts:75

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

frontPanel.ts:237

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

frontPanel.ts:275

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

frontPanel.ts:312
