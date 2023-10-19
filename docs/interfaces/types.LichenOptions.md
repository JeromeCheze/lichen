[lichen](../README.md) / [Exports](../modules.md) / [types](../modules/types.md) / LichenOptions

# Interface: LichenOptions

[types](../modules/types.md).LichenOptions

## Table of contents

### Properties

- [colorScale](types.LichenOptions.md#colorscale)
- [crosshair](types.LichenOptions.md#crosshair)
- [header](types.LichenOptions.md#header)
- [height](types.LichenOptions.md#height)
- [legend](types.LichenOptions.md#legend)
- [serieHeight](types.LichenOptions.md#serieheight)
- [series](types.LichenOptions.md#series)
- [stacked](types.LichenOptions.md#stacked)
- [synced](types.LichenOptions.md#synced)
- [title](types.LichenOptions.md#title)
- [tooltip](types.LichenOptions.md#tooltip)
- [type](types.LichenOptions.md#type)
- [vLines](types.LichenOptions.md#vlines)
- [xAxis](types.LichenOptions.md#xaxis)
- [yAxis](types.LichenOptions.md#yaxis)
- [zoom](types.LichenOptions.md#zoom)

## Properties

### colorScale

• `Optional` **colorScale**: [`ColorScaleOptions`](types.ColorScaleOptions.md)

#### Defined in

types.ts:172

___

### crosshair

• **crosshair**: [`CrosshairOptions`](types.CrosshairOptions.md)

#### Defined in

types.ts:165

___

### header

• **header**: [`HeaderOptions`](types.HeaderOptions.md)

#### Defined in

types.ts:162

___

### height

• **height**: `number`

#### Defined in

types.ts:168

___

### legend

• **legend**: [`LegendOptions`](types.LegendOptions.md)

#### Defined in

types.ts:164

___

### serieHeight

• **serieHeight**: `number`

#### Defined in

types.ts:170

___

### series

• **series**: [`LineOptions`](types.LineOptions.md)[] \| [`Heatmap2dOptions`](types.Heatmap2dOptions.md)[] \| [`Heatmap3dOptions`](types.Heatmap3dOptions.md) \| [`StackedOptions`](types.StackedOptions.md) \| [`SequenceOptions`](types.SequenceOptions.md) \| [`ScatterOptions`](types.ScatterOptions.md)[]

#### Defined in

types.ts:175

___

### stacked

• **stacked**: `boolean`

#### Defined in

types.ts:169

___

### synced

• **synced**: () => [`Lichen`](../classes/index.Lichen.md)[]

#### Type declaration

▸ (): [`Lichen`](../classes/index.Lichen.md)[]

##### Returns

[`Lichen`](../classes/index.Lichen.md)[]

#### Defined in

types.ts:176

___

### title

• `Optional` **title**: `string`

#### Defined in

types.ts:161

___

### tooltip

• **tooltip**: `boolean`

#### Defined in

types.ts:167

___

### type

• **type**: ``"line"`` \| ``"sequence"`` \| ``"heatmap2d"`` \| ``"heatmap3d"`` \| ``"stacked"`` \| ``"scatter"``

#### Defined in

types.ts:163

___

### vLines

• **vLines**: [`VLine`](types.VLine.md)[]

#### Defined in

types.ts:166

___

### xAxis

• **xAxis**: [`XAxisOptions`](types.XAxisOptions.md)

#### Defined in

types.ts:173

___

### yAxis

• **yAxis**: [`YAxisOptions`](types.YAxisOptions.md)

#### Defined in

types.ts:174

___

### zoom

• **zoom**: ``"xy"`` \| ``"x"`` \| ``"y"``

#### Defined in

types.ts:171
