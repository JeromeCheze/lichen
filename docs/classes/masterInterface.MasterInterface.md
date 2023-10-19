[lichen](../README.md) / [Exports](../modules.md) / [masterInterface](../modules/masterInterface.md) / MasterInterface

# Class: MasterInterface

[masterInterface](../modules/masterInterface.md).MasterInterface

## Table of contents

### Constructors

- [constructor](masterInterface.MasterInterface.md#constructor)

### Properties

- [registered](masterInterface.MasterInterface.md#registered)
- [subscription](masterInterface.MasterInterface.md#subscription)

### Methods

- [getRegistered](masterInterface.MasterInterface.md#getregistered)
- [on](masterInterface.MasterInterface.md#on)
- [register](masterInterface.MasterInterface.md#register)
- [send](masterInterface.MasterInterface.md#send)

## Constructors

### constructor

• **new MasterInterface**()

#### Defined in

masterInterface.ts:8

## Properties

### registered

• **registered**: `Record`<`string`, `any`\>

#### Defined in

masterInterface.ts:6

___

### subscription

• **subscription**: [`EventChannelSubscription`](../interfaces/types.EventChannelSubscription.md)

#### Defined in

masterInterface.ts:5

## Methods

### getRegistered

▸ **getRegistered**(`name`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`any`

#### Defined in

masterInterface.ts:37

___

### on

▸ **on**(`name`, `callback`): [`MasterInterface`](masterInterface.MasterInterface.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `callback` | (`data?`: `any`) => `void` |

#### Returns

[`MasterInterface`](masterInterface.MasterInterface.md)

#### Defined in

masterInterface.ts:13

___

### register

▸ **register**(`name`, `obj`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `obj` | `any` |

#### Returns

`void`

#### Defined in

masterInterface.ts:29

___

### send

▸ **send**(`name`, `data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `any` |
| `data` | `any` |

#### Returns

`void`

#### Defined in

masterInterface.ts:21
