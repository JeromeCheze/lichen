[lichen](../README.md) / [Exports](../modules.md) / [types](../modules/types.md) / LichenOptions

# Interface: LichenOptions

[types](../modules/types.md).LichenOptions

## Table of contents

### Properties

- [autoResize](types.LichenOptions.md#autoresize)
- [colorScale](types.LichenOptions.md#colorscale)
- [crosshair](types.LichenOptions.md#crosshair)
- [header](types.LichenOptions.md#header)
- [height](types.LichenOptions.md#height)
- [hooks](types.LichenOptions.md#hooks)
- [legend](types.LichenOptions.md#legend)
- [selection](types.LichenOptions.md#selection)
- [serieHeight](types.LichenOptions.md#serieheight)
- [series](types.LichenOptions.md#series)
- [stacked](types.LichenOptions.md#stacked)
- [synced](types.LichenOptions.md#synced)
- [tooltip](types.LichenOptions.md#tooltip)
- [type](types.LichenOptions.md#type)
- [vLines](types.LichenOptions.md#vlines)
- [width](types.LichenOptions.md#width)
- [xAxis](types.LichenOptions.md#xaxis)
- [yAxis](types.LichenOptions.md#yaxis)
- [zoom](types.LichenOptions.md#zoom)

## Properties

### autoResize

• `Optional` **autoResize**: `boolean`

#### Defined in

types.ts:191

___

### colorScale

• `Optional` **colorScale**: [`ColorScaleOptions`](types.ColorScaleOptions.md)

#### Defined in

types.ts:196

___

### crosshair

• `Optional` **crosshair**: [`CrosshairOptions`](types.CrosshairOptions.md)

#### Defined in

types.ts:186

___

### header

• **header**: [`HeaderOptions`](types.HeaderOptions.md)

#### Defined in

types.ts:183

___

### height

• `Optional` **height**: `number`

#### Defined in

types.ts:189

___

### hooks

• `Optional` **hooks**: [`HooksOptions`](types.HooksOptions.md)

#### Defined in

types.ts:200

___

### legend

• `Optional` **legend**: [`LegendOptions`](types.LegendOptions.md)

#### Defined in

types.ts:185

___

### selection

• `Optional` **selection**: ``"xy"`` \| ``"x"`` \| ``"y"``

#### Defined in

types.ts:195

___

### serieHeight

• `Optional` **serieHeight**: `number`

#### Defined in

types.ts:193

___

### series

• **series**: [`LineOptions`](types.LineOptions.md)[] \| [`Heatmap2dOptions`](types.Heatmap2dOptions.md)[] \| [`Heatmap3dOptions`](types.Heatmap3dOptions.md) \| [`StackedOptions`](types.StackedOptions.md) \| [`SequenceOptions`](types.SequenceOptions.md) \| [`ScatterOptions`](types.ScatterOptions.md)[]

#### Defined in

types.ts:199

___

### stacked

• `Optional` **stacked**: `boolean`

#### Defined in

types.ts:192

___

### synced

• `Optional` **synced**: () => `Record`<`number`, [`Lichen`](../classes/index.Lichen.md)\>

#### Type declaration

▸ (): `Record`<`number`, [`Lichen`](../classes/index.Lichen.md)\>

##### Returns

`Record`<`number`, [`Lichen`](../classes/index.Lichen.md)\>

#### Defined in

types.ts:201

___

### tooltip

• `Optional` **tooltip**: `boolean`

#### Defined in

types.ts:188

___

### type

• **type**: ``"line"`` \| ``"sequence"`` \| ``"heatmap2d"`` \| ``"heatmap3d"`` \| ``"stacked"`` \| ``"scatter"``

#### Defined in

types.ts:184

___

### vLines

• `Optional` **vLines**: [`VLine`](types.VLine.md)[]

#### Defined in

types.ts:187

___

### width

• `Optional` **width**: `number`

#### Defined in

types.ts:190

___

### xAxis

• `Optional` **xAxis**: [`XAxisOptions`](types.XAxisOptions.md)

#### Defined in

types.ts:197

___

### yAxis

• `Optional` **yAxis**: [`YAxisOptions`](types.YAxisOptions.md)

#### Defined in

types.ts:198

___

### zoom

• `Optional` **zoom**: ``"xy"`` \| ``"x"`` \| ``"y"``

#### Defined in

types.ts:194
