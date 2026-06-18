[lichen](../README.md) / [Exports](../modules.md) / [index](../modules/index.md) / Lichen

# Class: Lichen

[index](../modules/index.md).Lichen

## Table of contents

### Constructors

- [constructor](index.Lichen.md#constructor)

### Properties

- [debounceResize](index.Lichen.md#debounceresize)
- [eventUtils](index.Lichen.md#eventutils)
- [id](index.Lichen.md#id)
- [master](index.Lichen.md#master)
- [opt](index.Lichen.md#opt)
- [ready](index.Lichen.md#ready)
- [resizeHandler](index.Lichen.md#resizehandler)
- [wrapper](index.Lichen.md#wrapper)

### Methods

- [buildStructure](index.Lichen.md#buildstructure)
- [deepCopy](index.Lichen.md#deepcopy)
- [destroy](index.Lichen.md#destroy)
- [draw](index.Lichen.md#draw)
- [handleResize](index.Lichen.md#handleresize)
- [init](index.Lichen.md#init)
- [mergeOptions](index.Lichen.md#mergeoptions)
- [rebuild](index.Lichen.md#rebuild)
- [resetDisplay](index.Lichen.md#resetdisplay)
- [setColorScale](index.Lichen.md#setcolorscale)
- [setSelection](index.Lichen.md#setselection)
- [setXRange](index.Lichen.md#setxrange)
- [setYRange](index.Lichen.md#setyrange)
- [update](index.Lichen.md#update)
- [getColorScale](index.Lichen.md#getcolorscale)

## Constructors

### constructor

• **new Lichen**(`container`, `opt`, `drawOnCreation?`)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `container` | `HTMLElement` | `undefined` | The HTML element container |
| `opt` | [`LichenOptions`](../interfaces/types.LichenOptions.md) | `undefined` | Charts options object |
| `drawOnCreation` | `boolean` | `true` | Wether to draw the charts immediately after creation or not. |

#### Defined in

index.ts:55

## Properties

### debounceResize

• **debounceResize**: `number`

#### Defined in

index.ts:48

___

### eventUtils

• **eventUtils**: [`EventUtils`](eventUtils.EventUtils.md)

#### Defined in

index.ts:47

___

### id

• **id**: `number`

#### Defined in

index.ts:43

___

### master

• **master**: [`MasterInterface`](masterInterface.MasterInterface.md)

#### Defined in

index.ts:45

___

### opt

• **opt**: [`LichenOptions`](../interfaces/types.LichenOptions.md)

#### Defined in

index.ts:35

___

### ready

• **ready**: `boolean`

#### Defined in

index.ts:44

___

### resizeHandler

• **resizeHandler**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

index.ts:49

___

### wrapper

• **wrapper**: `HTMLElement`

#### Defined in

index.ts:46

## Methods

### buildStructure

▸ **buildStructure**(`container`, `reuseWrapper?`): `void`

Create all the structure and instantiate all charts components

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `container` | `HTMLElement` | `undefined` | The HTML element container |
| `reuseWrapper` | `boolean` | `false` | - |

#### Returns

`void`

#### Defined in

index.ts:169

___

### deepCopy

▸ **deepCopy**(`src`, `dest?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `any` |
| `dest` | `Record`<`string`, `any`\> |

#### Returns

`any`

#### Defined in

index.ts:102

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Defined in

index.ts:155

___

### draw

▸ **draw**(): `void`

The main draw method of Lichen

#### Returns

`void`

#### Defined in

index.ts:411

___

### handleResize

▸ **handleResize**(): `void`

#### Returns

`void`

#### Defined in

index.ts:327

___

### init

▸ **init**(`container`, `reuseWrapper?`): `void`

Initialize the chart construction

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `container` | `HTMLElement` | `undefined` | The HTML element container |
| `reuseWrapper` | `boolean` | `false` | - |

#### Returns

`void`

#### Defined in

index.ts:217

___

### mergeOptions

▸ **mergeOptions**(`opt`): [`LichenOptions`](../interfaces/types.LichenOptions.md)

Merge the given options with the default built-in options

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opt` | [`LichenOptions`](../interfaces/types.LichenOptions.md) | Lichen options |

#### Returns

[`LichenOptions`](../interfaces/types.LichenOptions.md)

The Lichen options merged

#### Defined in

index.ts:131

___

### rebuild

▸ **rebuild**(): `void`

#### Returns

`void`

#### Defined in

index.ts:300

___

### resetDisplay

▸ **resetDisplay**(): `void`

#### Returns

`void`

#### Defined in

index.ts:336

___

### setColorScale

▸ **setColorScale**(`colorScale`): `void`

Set the given color scale object to use and updates the plot and the legend

#### Parameters

| Name | Type |
| :------ | :------ |
| `colorScale` | [`ColorScaleOptions`](../interfaces/types.ColorScaleOptions.md) |

#### Returns

`void`

#### Defined in

index.ts:353

___

### setSelection

▸ **setSelection**(`x`, `y`): `void`

Set the selection to draw on front panel

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | [`number`, `number`] | the X range |
| `y` | [`number`, `number`] | the Y range |

#### Returns

`void`

#### Defined in

index.ts:396

___

### setXRange

▸ **setXRange**(`x1`, `x2`, `draw?`): `void`

Set the X range for next draw

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `x1` | `number` | `undefined` | the start range |
| `x2` | `number` | `undefined` | the end range |
| `draw` | `boolean` | `true` | call the [Lichen.draw](index.Lichen.md#draw) method if `true` |

#### Returns

`void`

#### Defined in

index.ts:365

___

### setYRange

▸ **setYRange**(`y1`, `y2`, `draw?`): `void`

Set the X range for next draw

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `y1` | `number` | `undefined` | the start range |
| `y2` | `number` | `undefined` | the end range |
| `draw` | `boolean` | `true` | call the [Lichen.draw](index.Lichen.md#draw) method if `true` |

#### Returns

`void`

#### Defined in

index.ts:384

___

### update

▸ **update**(`draw?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `draw` | `boolean` | `true` |

#### Returns

`void`

#### Defined in

index.ts:420

___

### getColorScale

▸ `Static` **getColorScale**(`name`): [`ColorScaleObject`](../modules/types.md#colorscaleobject)

Give the requested colorscale object

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | ``"PARULA"`` \| ``"VIRIDIS"`` \| ``"PLASMA"`` \| ``"INFERNO"`` \| ``"MAGMA"`` \| ``"CIVIDIS"`` | the colorscale name |

#### Returns

[`ColorScaleObject`](../modules/types.md#colorscaleobject)

the requested colorscale object

#### Defined in

index.ts:93
