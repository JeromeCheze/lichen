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

eventUtils.ts:376

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Defined in

eventUtils.ts:67

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

eventUtils.ts:226

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

eventUtils.ts:240

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

eventUtils.ts:244

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

eventUtils.ts:73

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

eventUtils.ts:192

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

eventUtils.ts:366

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

eventUtils.ts:371

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

eventUtils.ts:148

___

### handleMouseEnter

▸ **handleMouseEnter**(): `void`

#### Returns

`void`

#### Defined in

eventUtils.ts:78

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

eventUtils.ts:83

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

eventUtils.ts:94

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

eventUtils.ts:152

___

### handleTouchEnd

▸ **handleTouchEnd**(): `void`

#### Returns

`void`

#### Defined in

eventUtils.ts:279

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

eventUtils.ts:286

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

eventUtils.ts:255

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

eventUtils.ts:202

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

eventUtils.ts:348

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

eventUtils.ts:357
