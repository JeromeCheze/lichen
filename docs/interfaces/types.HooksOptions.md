[lichen](../README.md) / [Exports](../modules.md) / [types](../modules/types.md) / HooksOptions

# Interface: HooksOptions

[types](../modules/types.md).HooksOptions

## Table of contents

### Properties

- [beforeDraw](types.HooksOptions.md#beforedraw)
- [beforeResetDisplay](types.HooksOptions.md#beforeresetdisplay)
- [beforeSelection](types.HooksOptions.md#beforeselection)
- [onActive](types.HooksOptions.md#onactive)
- [onClick](types.HooksOptions.md#onclick)
- [onCursorMove](types.HooksOptions.md#oncursormove)
- [onDblClick](types.HooksOptions.md#ondblclick)
- [onVlineSelection](types.HooksOptions.md#onvlineselection)

## Properties

### beforeDraw

• `Optional` **beforeDraw**: (`chart`: [`Lichen`](../classes/index.Lichen.md)) => `boolean`

#### Type declaration

▸ (`chart`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `chart` | [`Lichen`](../classes/index.Lichen.md) |

##### Returns

`boolean`

#### Defined in

types.ts:173

___

### beforeResetDisplay

• `Optional` **beforeResetDisplay**: () => `boolean`

#### Type declaration

▸ (): `boolean`

##### Returns

`boolean`

#### Defined in

types.ts:174

___

### beforeSelection

• `Optional` **beforeSelection**: (`x`: [`number`, `number`], `y`: [`number`, `number`]) => `boolean`

#### Type declaration

▸ (`x`, `y`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `x` | [`number`, `number`] |
| `y` | [`number`, `number`] |

##### Returns

`boolean`

#### Defined in

types.ts:172

___

### onActive

• `Optional` **onActive**: (`chart`: [`Lichen`](../classes/index.Lichen.md)) => `void`

#### Type declaration

▸ (`chart`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `chart` | [`Lichen`](../classes/index.Lichen.md) |

##### Returns

`void`

#### Defined in

types.ts:178

___

### onClick

• `Optional` **onClick**: (`chart`: [`Lichen`](../classes/index.Lichen.md)) => `void`

#### Type declaration

▸ (`chart`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `chart` | [`Lichen`](../classes/index.Lichen.md) |

##### Returns

`void`

#### Defined in

types.ts:179

___

### onCursorMove

• `Optional` **onCursorMove**: (`x`: `number`, `y`: `number`) => `void`

#### Type declaration

▸ (`x`, `y`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

##### Returns

`void`

#### Defined in

types.ts:176

___

### onDblClick

• `Optional` **onDblClick**: (`x`: `number`) => `void`

#### Type declaration

▸ (`x`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |

##### Returns

`void`

#### Defined in

types.ts:177

___

### onVlineSelection

• `Optional` **onVlineSelection**: (`vlines`: [`VLine`](types.VLine.md)[]) => `void`

#### Type declaration

▸ (`vlines`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `vlines` | [`VLine`](types.VLine.md)[] |

##### Returns

`void`

#### Defined in

types.ts:175
