[lichen](../README.md) / [Exports](../modules.md) / defaultOptions

# Module: defaultOptions

## Table of contents

### Variables

- [defaultOptions](defaultOptions.md#defaultoptions)

## Variables

### defaultOptions

• **defaultOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `autoResize` | `boolean` |
| `crosshair` | { `enabled`: `boolean` = true; `sticky`: `boolean` = true; `text`: `string` = '' } |
| `crosshair.enabled` | `boolean` |
| `crosshair.sticky` | `boolean` |
| `crosshair.text` | `string` |
| `header` | { `position`: `string` = 'top'; `width`: `number` = 80 } |
| `header.position` | `string` |
| `header.width` | `number` |
| `height` | `number` |
| `hooks` | { `beforeDraw`: () => `boolean` ; `beforeResetDisplay`: () => `boolean` ; `beforeSelection`: () => `boolean`  } |
| `hooks.beforeDraw` | () => `boolean` |
| `hooks.beforeResetDisplay` | () => `boolean` |
| `hooks.beforeSelection` | () => `boolean` |
| `legend` | { `enabled`: `boolean` = true; `fontSize`: `number` = 10; `position`: `string` = 'bottom'; `width`: `number` = 80 } |
| `legend.enabled` | `boolean` |
| `legend.fontSize` | `number` |
| `legend.position` | `string` |
| `legend.width` | `number` |
| `selection` | `string` |
| `serieHeight` | `number` |
| `stacked` | `boolean` |
| `tooltip` | { `enabled`: `boolean` = true; `fontSize`: `number` = FONT\_SIZE } |
| `tooltip.enabled` | `boolean` |
| `tooltip.fontSize` | `number` |
| `vLines` | `any`[] |
| `xAxis` | { `datetime`: `boolean` = true; `enabled`: `boolean` = AXIS\_ENABLED; `fontSize`: `number` = FONT\_SIZE; `gridColor`: `string` = GRID\_COLOR; `gridEnabled`: `boolean` = GRID\_ENABLED; `lineWidth`: `number` = LINE\_WIDTH; `textColor`: `string` = AXIS\_TEXT\_COLOR; `tickLength`: `number` = TICK\_LENGTH; `tickWidth`: `number` = TICK\_WIDTH } |
| `xAxis.datetime` | `boolean` |
| `xAxis.enabled` | `boolean` |
| `xAxis.fontSize` | `number` |
| `xAxis.gridColor` | `string` |
| `xAxis.gridEnabled` | `boolean` |
| `xAxis.lineWidth` | `number` |
| `xAxis.textColor` | `string` |
| `xAxis.tickLength` | `number` |
| `xAxis.tickWidth` | `number` |
| `yAxis` | { `enabled`: `boolean` = AXIS\_ENABLED; `fontSize`: `number` = FONT\_SIZE; `gridColor`: `string` = GRID\_COLOR; `gridEnabled`: `boolean` = GRID\_ENABLED; `lineWidth`: `number` = LINE\_WIDTH; `logarithmic`: `boolean` = false; `powerOfTen`: `boolean` = false; `textColor`: `string` = AXIS\_TEXT\_COLOR; `tickLength`: `number` = TICK\_LENGTH; `tickWidth`: `number` = TICK\_WIDTH; `width`: `number` = 50 } |
| `yAxis.enabled` | `boolean` |
| `yAxis.fontSize` | `number` |
| `yAxis.gridColor` | `string` |
| `yAxis.gridEnabled` | `boolean` |
| `yAxis.lineWidth` | `number` |
| `yAxis.logarithmic` | `boolean` |
| `yAxis.powerOfTen` | `boolean` |
| `yAxis.textColor` | `string` |
| `yAxis.tickLength` | `number` |
| `yAxis.tickWidth` | `number` |
| `yAxis.width` | `number` |
| `zoom` | `string` |

#### Defined in

defaultOptions.ts:11
