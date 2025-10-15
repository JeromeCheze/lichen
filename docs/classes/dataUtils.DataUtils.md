[lichen](../README.md) / [Exports](../modules.md) / [dataUtils](../modules/dataUtils.md) / DataUtils

# Class: DataUtils

[dataUtils](../modules/dataUtils.md).DataUtils

## Table of contents

### Constructors

- [constructor](dataUtils.DataUtils.md#constructor)

### Properties

- [computed](dataUtils.DataUtils.md#computed)
- [end](dataUtils.DataUtils.md#end)
- [height](dataUtils.DataUtils.md#height)
- [master](dataUtils.DataUtils.md#master)
- [start](dataUtils.DataUtils.md#start)
- [width](dataUtils.DataUtils.md#width)
- [yMax](dataUtils.DataUtils.md#ymax)
- [yMin](dataUtils.DataUtils.md#ymin)

### Methods

- [processData](dataUtils.DataUtils.md#processdata)
- [resetComputed](dataUtils.DataUtils.md#resetcomputed)
- [setXRange](dataUtils.DataUtils.md#setxrange)
- [setYRange](dataUtils.DataUtils.md#setyrange)
- [toRGBA](dataUtils.DataUtils.md#torgba)
- [toScientificNotation](dataUtils.DataUtils.md#toscientificnotation)
- [xPosFromValue](dataUtils.DataUtils.md#xposfromvalue)
- [xValueFromPos](dataUtils.DataUtils.md#xvaluefrompos)
- [yPosFromValue](dataUtils.DataUtils.md#yposfromvalue)
- [yValueFromPos](dataUtils.DataUtils.md#yvaluefrompos)
- [correctFloat](dataUtils.DataUtils.md#correctfloat)
- [getColor](dataUtils.DataUtils.md#getcolor)
- [getRatio](dataUtils.DataUtils.md#getratio)
- [toRGB](dataUtils.DataUtils.md#torgb)

## Constructors

### constructor

• **new DataUtils**(`master`, `width`, `height`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `master` | [`MasterInterface`](masterInterface.MasterInterface.md) |
| `width` | `number` |
| `height` | `number` |

#### Defined in

dataUtils.ts:21

## Properties

### computed

• **computed**: [`DataUtilsComputedData`](../interfaces/types.DataUtilsComputedData.md)

#### Defined in

dataUtils.ts:8

___

### end

• **end**: `number`

#### Defined in

dataUtils.ts:12

___

### height

• **height**: `number`

#### Defined in

dataUtils.ts:7

___

### master

• **master**: [`MasterInterface`](masterInterface.MasterInterface.md)

#### Defined in

dataUtils.ts:13

___

### start

• **start**: `number`

#### Defined in

dataUtils.ts:11

___

### width

• **width**: `number`

#### Defined in

dataUtils.ts:6

___

### yMax

• **yMax**: `number`

#### Defined in

dataUtils.ts:10

___

### yMin

• **yMin**: `number`

#### Defined in

dataUtils.ts:9

## Methods

### processData

▸ **processData**(): `void`

#### Returns

`void`

#### Defined in

dataUtils.ts:139

___

### resetComputed

▸ **resetComputed**(): `void`

#### Returns

`void`

#### Defined in

dataUtils.ts:131

___

### setXRange

▸ **setXRange**(`x1`, `x2`): `void`

Set X range to use for data processing

#### Parameters

| Name | Type |
| :------ | :------ |
| `x1` | `number` |
| `x2` | `number` |

#### Returns

`void`

#### Defined in

dataUtils.ts:46

___

### setYRange

▸ **setYRange**(`y1`, `y2`): `void`

Set the Y range to use for data processing

#### Parameters

| Name | Type |
| :------ | :------ |
| `y1` | `number` |
| `y2` | `number` |

#### Returns

`void`

#### Defined in

dataUtils.ts:56

___

### toRGBA

▸ **toRGBA**(`c`, `a`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `c` | [`number`, `number`, `number`] |
| `a` | `number` |

#### Returns

`string`

#### Defined in

dataUtils.ts:210

___

### toScientificNotation

▸ **toScientificNotation**(`value`, `precision?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `value` | `number` | `undefined` |
| `precision` | `number` | `2` |

#### Returns

`string`

#### Defined in

dataUtils.ts:109

___

### xPosFromValue

▸ **xPosFromValue**(`xValue`): `number`

Convert the given data value to the corresponding X position

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `xValue` | `number` | the data value |

#### Returns

`number`

the X position coordinate

#### Defined in

dataUtils.ts:87

___

### xValueFromPos

▸ **xValueFromPos**(`xPos`): `number`

Convert the given X position to the corresponding data value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `xPos` | `number` | the position in px |

#### Returns

`number`

the data value

#### Defined in

dataUtils.ts:66

___

### yPosFromValue

▸ **yPosFromValue**(`yValue`): `number`

Convert the given data value to the corresponding Y position

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `yValue` | `number` | the data value |

#### Returns

`number`

the Y position coordinate

#### Defined in

dataUtils.ts:99

___

### yValueFromPos

▸ **yValueFromPos**(`yPos`): `number`

Convert the given Y position to the corresponding data value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `yPos` | `number` | the position in px |

#### Returns

`number`

the data value

#### Defined in

dataUtils.ts:78

___

### correctFloat

▸ `Static` **correctFloat**(`v`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `number` |

#### Returns

`number`

#### Defined in

dataUtils.ts:198

___

### getColor

▸ `Static` **getColor**(`value`, `colorScale`, `text?`, `dataUtils?`): `string` \| `any`[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `value` | `number` | `undefined` |
| `colorScale` | [`ColorScaleOptions`](../interfaces/types.ColorScaleOptions.md) | `undefined` |
| `text` | `boolean` | `true` |
| `dataUtils?` | [`DataUtils`](dataUtils.DataUtils.md) | `undefined` |

#### Returns

`string` \| `any`[]

#### Defined in

dataUtils.ts:214

___

### getRatio

▸ `Static` **getRatio**(`v`, `min`, `max`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `number` |
| `min` | `number` |
| `max` | `number` |

#### Returns

`number`

#### Defined in

dataUtils.ts:202

___

### toRGB

▸ `Static` **toRGB**(`c`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `c` | [`number`, `number`, `number`] |

#### Returns

`string`

#### Defined in

dataUtils.ts:206
