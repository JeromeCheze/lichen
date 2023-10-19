[lichen](../README.md) / [Exports](../modules.md) / [eventUtils](../modules/eventUtils.md) / EventUtils

# Class: EventUtils

[eventUtils](../modules/eventUtils.md).EventUtils

## Table of contents

### Constructors

- [constructor](eventUtils.EventUtils.md#constructor)

### Properties

- [dataUtils](eventUtils.EventUtils.md#datautils)
- [element](eventUtils.EventUtils.md#element)
- [handler](eventUtils.EventUtils.md#handler)
- [master](eventUtils.EventUtils.md#master)
- [registered](eventUtils.EventUtils.md#registered)
- [state](eventUtils.EventUtils.md#state)

### Methods

- [active](eventUtils.EventUtils.md#active)
- [clearSelection](eventUtils.EventUtils.md#clearselection)
- [getAngle](eventUtils.EventUtils.md#getangle)
- [getDistance](eventUtils.EventUtils.md#getdistance)
- [getPanning](eventUtils.EventUtils.md#getpanning)
- [getRelativePosition](eventUtils.EventUtils.md#getrelativeposition)
- [handleClick](eventUtils.EventUtils.md#handleclick)
- [handleDblClick](eventUtils.EventUtils.md#handledblclick)
- [handleKeyDown](eventUtils.EventUtils.md#handlekeydown)
- [handleKeyUp](eventUtils.EventUtils.md#handlekeyup)
- [handleMouseDown](eventUtils.EventUtils.md#handlemousedown)
- [handleMouseLeave](eventUtils.EventUtils.md#handlemouseleave)
- [handleMouseMove](eventUtils.EventUtils.md#handlemousemove)
- [handleMouseUp](eventUtils.EventUtils.md#handlemouseup)
- [handleTouchEnd](eventUtils.EventUtils.md#handletouchend)
- [handleTouchMove](eventUtils.EventUtils.md#handletouchmove)
- [handleTouchStart](eventUtils.EventUtils.md#handletouchstart)
- [handleWheel](eventUtils.EventUtils.md#handlewheel)
- [move](eventUtils.EventUtils.md#move)
- [pinchX](eventUtils.EventUtils.md#pinchx)
- [pinchY](eventUtils.EventUtils.md#pinchy)
- [resetDisplay](eventUtils.EventUtils.md#resetdisplay)
- [selecting](eventUtils.EventUtils.md#selecting)
- [xRangeChange](eventUtils.EventUtils.md#xrangechange)
- [yRangeChange](eventUtils.EventUtils.md#yrangechange)

## Constructors

### constructor

• **new EventUtils**(`master`, `element`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `master` | [`MasterInterface`](masterInterface.MasterInterface.md) |
| `element` | `HTMLElement` |

#### Defined in

eventUtils.ts:17

## Properties

### dataUtils

• **dataUtils**: [`DataUtils`](dataUtils.DataUtils.md)

#### Defined in

eventUtils.ts:11

___

### element

• **element**: `HTMLElement`

#### Defined in

eventUtils.ts:10

___

### handler

• **handler**: [`EvenUtilsEventHandlerMap`](../interfaces/types.EvenUtilsEventHandlerMap.md)

#### Defined in

eventUtils.ts:12

___

### master

• **master**: [`MasterInterface`](masterInterface.MasterInterface.md)

#### Defined in

eventUtils.ts:15

___

### registered

• **registered**: `Record`<`string`, (`e`: `any`) => `void`[]\>

#### Defined in

eventUtils.ts:13

___

### state

• **state**: `Record`<`string`, `any`\>

#### Defined in

eventUtils.ts:14

## Methods

### active

▸ **active**(`callback`): [`EventUtils`](eventUtils.EventUtils.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `any` |

#### Returns

[`EventUtils`](eventUtils.EventUtils.md)

#### Defined in

eventUtils.ts:340

___

### clearSelection

▸ **clearSelection**(): `void`

#### Returns

`void`

#### Defined in

eventUtils.ts:333

___

### getAngle

▸ **getAngle**(`x1`, `y1`, `x2`, `y2`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x1` | `number` |
| `y1` | `number` |
| `x2` | `number` |
| `y2` | `number` |

#### Returns

`number`

#### Defined in

eventUtils.ts:189

___

### getDistance

▸ **getDistance**(`x1`, `y1`, `x2`, `y2`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x1` | `number` |
| `y1` | `number` |
| `x2` | `number` |
| `y2` | `number` |

#### Returns

`number`

#### Defined in

eventUtils.ts:203

___

### getPanning

▸ **getPanning**(`refX1`, `refY1`, `refX2`, `refY2`, `curX1`, `curY1`, `curX2`, `curY2`): `number`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `refX1` | `number` |
| `refY1` | `number` |
| `refX2` | `number` |
| `refY2` | `number` |
| `curX1` | `number` |
| `curY1` | `number` |
| `curX2` | `number` |
| `curY2` | `number` |

#### Returns

`number`[]

#### Defined in

eventUtils.ts:207

___

### getRelativePosition

▸ **getRelativePosition**(`e`): `number`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `MouseEvent` \| `Touch` |

#### Returns

`number`[]

#### Defined in

eventUtils.ts:60

___

### handleClick

▸ **handleClick**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `MouseEvent` |

#### Returns

`void`

#### Defined in

eventUtils.ts:65

___

### handleDblClick

▸ **handleDblClick**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `MouseEvent` \| `TouchEvent` |

#### Returns

`void`

#### Defined in

eventUtils.ts:161

___

### handleKeyDown

▸ **handleKeyDown**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `KeyboardEvent` |

#### Returns

`void`

#### Defined in

eventUtils.ts:319

___

### handleKeyUp

▸ **handleKeyUp**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `KeyboardEvent` |

#### Returns

`void`

#### Defined in

eventUtils.ts:326

___

### handleMouseDown

▸ **handleMouseDown**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `MouseEvent` |

#### Returns

`void`

#### Defined in

eventUtils.ts:140

___

### handleMouseLeave

▸ **handleMouseLeave**(`e?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e?` | `MouseEvent` |

#### Returns

`void`

#### Defined in

eventUtils.ts:75

___

### handleMouseMove

▸ **handleMouseMove**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `MouseEvent` |

#### Returns

`void`

#### Defined in

eventUtils.ts:86

___

### handleMouseUp

▸ **handleMouseUp**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `MouseEvent` |

#### Returns

`void`

#### Defined in

eventUtils.ts:144

___

### handleTouchEnd

▸ **handleTouchEnd**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `TouchEvent` |

#### Returns

`void`

#### Defined in

eventUtils.ts:242

___

### handleTouchMove

▸ **handleTouchMove**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `TouchEvent` |

#### Returns

`void`

#### Defined in

eventUtils.ts:248

___

### handleTouchStart

▸ **handleTouchStart**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `TouchEvent` |

#### Returns

`void`

#### Defined in

eventUtils.ts:218

___

### handleWheel

▸ **handleWheel**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `WheelEvent` |

#### Returns

`void`

#### Defined in

eventUtils.ts:168

___

### move

▸ **move**(`callback`): [`EventUtils`](eventUtils.EventUtils.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `any` |

#### Returns

[`EventUtils`](eventUtils.EventUtils.md)

#### Defined in

eventUtils.ts:345

___

### pinchX

▸ **pinchX**(`level`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `level` | `number` |

#### Returns

`void`

#### Defined in

eventUtils.ts:301

___

### pinchY

▸ **pinchY**(`level`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `level` | `number` |

#### Returns

`void`

#### Defined in

eventUtils.ts:310

___

### resetDisplay

▸ **resetDisplay**(`callback`): [`EventUtils`](eventUtils.EventUtils.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `any` |

#### Returns

[`EventUtils`](eventUtils.EventUtils.md)

#### Defined in

eventUtils.ts:365

___

### selecting

▸ **selecting**(`callback`): [`EventUtils`](eventUtils.EventUtils.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `any` |

#### Returns

[`EventUtils`](eventUtils.EventUtils.md)

#### Defined in

eventUtils.ts:360

___

### xRangeChange

▸ **xRangeChange**(`callback`): [`EventUtils`](eventUtils.EventUtils.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `any` |

#### Returns

[`EventUtils`](eventUtils.EventUtils.md)

#### Defined in

eventUtils.ts:350

___

### yRangeChange

▸ **yRangeChange**(`callback`): [`EventUtils`](eventUtils.EventUtils.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `any` |

#### Returns

[`EventUtils`](eventUtils.EventUtils.md)

#### Defined in

eventUtils.ts:355
