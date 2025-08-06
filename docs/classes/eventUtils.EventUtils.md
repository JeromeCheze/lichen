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
- [state](eventUtils.EventUtils.md#state)

### Methods

- [clearSelection](eventUtils.EventUtils.md#clearselection)
- [destroy](eventUtils.EventUtils.md#destroy)
- [getAngle](eventUtils.EventUtils.md#getangle)
- [getDistance](eventUtils.EventUtils.md#getdistance)
- [getPanning](eventUtils.EventUtils.md#getpanning)
- [getRelativePosition](eventUtils.EventUtils.md#getrelativeposition)
- [handleDblClick](eventUtils.EventUtils.md#handledblclick)
- [handleKeyDown](eventUtils.EventUtils.md#handlekeydown)
- [handleKeyUp](eventUtils.EventUtils.md#handlekeyup)
- [handleMouseDown](eventUtils.EventUtils.md#handlemousedown)
- [handleMouseEnter](eventUtils.EventUtils.md#handlemouseenter)
- [handleMouseLeave](eventUtils.EventUtils.md#handlemouseleave)
- [handleMouseMove](eventUtils.EventUtils.md#handlemousemove)
- [handleMouseUp](eventUtils.EventUtils.md#handlemouseup)
- [handleTouchEnd](eventUtils.EventUtils.md#handletouchend)
- [handleTouchMove](eventUtils.EventUtils.md#handletouchmove)
- [handleTouchStart](eventUtils.EventUtils.md#handletouchstart)
- [handleWheel](eventUtils.EventUtils.md#handlewheel)
- [pinchX](eventUtils.EventUtils.md#pinchx)
- [pinchY](eventUtils.EventUtils.md#pinchy)

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

### state

• **state**: `Record`<`string`, `any`\>

#### Defined in

eventUtils.ts:14

## Methods

### clearSelection

▸ **clearSelection**(): `void`

#### Returns

`void`

#### Defined in

eventUtils.ts:363

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Defined in

eventUtils.ts:64

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

eventUtils.ts:223

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

eventUtils.ts:237

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

eventUtils.ts:241

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

eventUtils.ts:70

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

eventUtils.ts:189

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

eventUtils.ts:353

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

eventUtils.ts:358

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

eventUtils.ts:146

___

### handleMouseEnter

▸ **handleMouseEnter**(): `void`

#### Returns

`void`

#### Defined in

eventUtils.ts:75

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

eventUtils.ts:80

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

eventUtils.ts:93

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

eventUtils.ts:150

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

eventUtils.ts:276

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

eventUtils.ts:282

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

eventUtils.ts:252

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

eventUtils.ts:199

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

eventUtils.ts:335

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

eventUtils.ts:344
