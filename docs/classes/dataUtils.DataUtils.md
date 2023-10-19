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
- [opt](dataUtils.DataUtils.md#opt)
- [start](dataUtils.DataUtils.md#start)
- [type](dataUtils.DataUtils.md#type)
- [width](dataUtils.DataUtils.md#width)
- [yMax](dataUtils.DataUtils.md#ymax)
- [yMin](dataUtils.DataUtils.md#ymin)

### Methods

- [getColor](dataUtils.DataUtils.md#getcolor)
- [getRatio](dataUtils.DataUtils.md#getratio)
- [processData](dataUtils.DataUtils.md#processdata)
- [resetComputed](dataUtils.DataUtils.md#resetcomputed)
- [setXRange](dataUtils.DataUtils.md#setxrange)
- [setYRange](dataUtils.DataUtils.md#setyrange)
- [toRGB](dataUtils.DataUtils.md#torgb)
- [toRGBA](dataUtils.DataUtils.md#torgba)
- [toScientificNotation](dataUtils.DataUtils.md#toscientificnotation)
- [xPosFromValue](dataUtils.DataUtils.md#xposfromvalue)
- [xValueFromPos](dataUtils.DataUtils.md#xvaluefrompos)
- [yPosFromValue](dataUtils.DataUtils.md#yposfromvalue)
- [yValueFromPos](dataUtils.DataUtils.md#yvaluefrompos)

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

dataUtils.ts:23

## Properties

### computed

• **computed**: [`DataUtilsComputedData`](../interfaces/types.DataUtilsComputedData.md)

#### Defined in

dataUtils.ts:10

___

### end

• **end**: `number`

#### Defined in

dataUtils.ts:14

___

### height

• **height**: `number`

#### Defined in

dataUtils.ts:9

___

### master

• **master**: [`MasterInterface`](masterInterface.MasterInterface.md)

#### Defined in

dataUtils.ts:15

___

### opt

• **opt**: [`LineOptions`](../interfaces/types.LineOptions.md)[] \| [`Heatmap2dOptions`](../interfaces/types.Heatmap2dOptions.md)[] \| [`Heatmap3dOptions`](../interfaces/types.Heatmap3dOptions.md) \| [`StackedOptions`](../interfaces/types.StackedOptions.md) \| [`SequenceOptions`](../interfaces/types.SequenceOptions.md) \| [`ScatterOptions`](../interfaces/types.ScatterOptions.md)[]

#### Defined in

dataUtils.ts:7

___

### start

• **start**: `number`

#### Defined in

dataUtils.ts:13

___

### type

• **type**: ``"line"`` \| ``"sequence"`` \| ``"heatmap2d"`` \| ``"heatmap3d"`` \| ``"stacked"`` \| ``"scatter"``

#### Defined in

dataUtils.ts:6

___

### width

• **width**: `number`

#### Defined in

dataUtils.ts:8

___

### yMax

• **yMax**: `number`

#### Defined in

dataUtils.ts:12

___

### yMin

• **yMin**: `number`

#### Defined in

dataUtils.ts:11

## Methods

### getColor

▸ **getColor**(`value`, `colorScale`, `text?`): `string` \| `any`[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `value` | `number` | `undefined` |
| `colorScale` | [`ColorScaleOptions`](../interfaces/types.ColorScaleOptions.md) | `undefined` |
| `text` | `boolean` | `true` |

#### Returns

`string` \| `any`[]

#### Defined in

dataUtils.ts:192

___

### getRatio

▸ **getRatio**(`v`, `min`, `max`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `number` |
| `min` | `number` |
| `max` | `number` |

#### Returns

`number`

#### Defined in

dataUtils.ts:180

___

### processData

▸ **processData**(): `void`

#### Returns

`void`

#### Defined in

dataUtils.ts:135

___

### resetComputed

▸ **resetComputed**(): `void`

#### Returns

`void`

#### Defined in

dataUtils.ts:127

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

dataUtils.ts:45

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

dataUtils.ts:55

___

### toRGB

▸ **toRGB**(`c`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `c` | [`number`, `number`, `number`] |

#### Returns

`string`

#### Defined in

dataUtils.ts:184

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

dataUtils.ts:188

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

dataUtils.ts:105

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

dataUtils.ts:86

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

dataUtils.ts:65

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

dataUtils.ts:98

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

dataUtils.ts:77
