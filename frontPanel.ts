import DataUtils from "./dataUtils";
import EventUtils from "./eventUtils";
import { ColorScaleOptions, CrosshairOptions, Heatmap2dOptions, LineOptions, SequenceOptions } from "./types";

export default class FrontPanel {

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  dataUtils: DataUtils;
  eventUtils: EventUtils;
  colorScale: ColorScaleOptions | null;
  tooltip: boolean;
  crosshair: CrosshairOptions;
  tooltipDiv: HTMLElement;

  constructor (
    container: HTMLElement,
    dataUtils: DataUtils,
    colorScale: ColorScaleOptions | null,
    tooltip: boolean,
    crosshair: CrosshairOptions
  ) {
    this.tooltip = tooltip
    this.crosshair = crosshair
    this.colorScale = colorScale
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.dataUtils = dataUtils
    this.canvas.width = dataUtils.width
    this.canvas.height = dataUtils.height
    if (tooltip) {
      this.tooltipDiv = document.createElement('div')
      Object.assign(this.tooltipDiv.style, {
        display: 'none',
        padding: '10px', 
        borderRadius: '4px', 
        zIndex: 1000, 
        background: 'white',
        color: 'black',
        fontSize: '10px'
      })
      document.body.appendChild(this.tooltipDiv)
    }
    Object.assign(this.canvas.style, { position: 'absolute', top: 0, right: 0, zIndex: 100 })
    container.appendChild(this.canvas)
  }

  setEventUtils (eventUtils: EventUtils) {
    this.eventUtils = eventUtils
  }

  drawTooltip (value: number) {
    const ctx = this.ctx
    const xPos = this.dataUtils.xPosFromValue(value)
    ctx.save()
    const text = {
      time: null,
      series: [] as {color: string; name: string; value: number; textValue: string;}[]
    }
    if (this.dataUtils.type === 'line' || this.dataUtils.type === 'stacked') {
      ctx.fillStyle = 'white'
      const data = this.dataUtils.dataFromXPos(xPos)
      let stackedValue = 0
      for (const [i, serie] of this.dataUtils.getSeries().entries()) {
        text.time = data[i].xDataValue
        const value = data[i].yDataValue
        if (value == null) {
          continue
        }
        const s = serie as LineOptions
        const color = s.color != null ? s.color : this.dataUtils.getColor(value, this.colorScale, true) as string
        text.series.push({
          color,
          value,
          name: s.name,
          textValue: s.tooltipFormatter != null ? s.tooltipFormatter(value) : `${value}`
        })
        ctx.strokeStyle = color
        ctx.beginPath()
        stackedValue += value
        const yPos = this.dataUtils.type === 'stacked' ? this.dataUtils.yPosFromValue(stackedValue) : data[i].yDataValuePos
        ctx.ellipse(data[i].xDataValuePos, yPos, 3, 3, 0, 0, 2 * Math.PI)
        ctx.fill()
        ctx.stroke()
      }
    } else if (this.dataUtils.type === 'heatmap2d') {
      const data = this.dataUtils.dataFromXPos(xPos)
      for (const [i, serie] of this.dataUtils.getSeries().entries()) {
        text.time = data[i].xDataValue
        const value = data[i].yDataValue
        if (value == null) {
          continue
        }
        const s = serie as Heatmap2dOptions
        text.series.push({
          color: 'black',
          value,
          name: s.name,
          textValue: s.tooltipFormatter != null ? s.tooltipFormatter(value) : `${value}`
        })
      }
    } else if (this.dataUtils.type === 'sequence') {
      const data = this.dataUtils.dataFromXPos(xPos)
      for (const [i, serie] of this.dataUtils.getSeries().entries()) {
        text.time = data[i].xDataValue
        const value = data[i].yDataValue
        if (value == null) {
          continue
        }
        const s = serie as SequenceOptions
        text.series.push({
          color: 'black',
          value,
          name: 'value',
          textValue: s.valueMap.filter(x => x.value === value)[0].name
        })
      }
    }
    if (text.time == null) {
      return
    }
    text.series.sort((a, b) => {
      const aa = a.value
      const bb = b.value
      return aa < bb ? -1 : aa > bb ? 1 : 0
    })
    this.tooltipDiv.innerHTML = ''
    if (this.eventUtils.state.cursorPos.pageX > (document.body.clientWidth / 2)) {
      this.tooltipDiv.style.right = `${document.body.clientWidth - this.eventUtils.state.cursorPos.pageX + 30}px`
      this.tooltipDiv.style.left = 'auto'
    } else {
      this.tooltipDiv.style.left = `${this.eventUtils.state.cursorPos.pageX + 20}px`
      this.tooltipDiv.style.right = 'auto'
    }
    const timeDiv = document.createElement('div')
    Object.assign(timeDiv.style, { fontWeight: 'bold' })
    timeDiv.innerHTML = new Date(text.time).toISOString().replace('T', ' ').replace('Z', '')
    this.tooltipDiv.appendChild(timeDiv)
    const serieTable = document.createElement('table')
    this.tooltipDiv.appendChild(serieTable)
    const serieTableBody = document.createElement('tbody')
    serieTable.appendChild(serieTableBody)
    for (const serie of text.series) {
      const serieRow = document.createElement('tr')
      const serieName = document.createElement('th')
      Object.assign(serieName.style, {color: serie.color, fontWeight: 'bold'})
      serieName.innerHTML = `${serie.name}:`
      const serieValue = document.createElement('td')
      serieValue.innerHTML = serie.textValue
      serieRow.appendChild(serieName)
      serieRow.appendChild(serieValue)
      serieTableBody.appendChild(serieRow)
    }
    Object.assign(this.tooltipDiv.style, {
      display: 'block',
      position: 'absolute',
      top: `${this.eventUtils.state.cursorPos.pageY + 20 - this.tooltipDiv.getBoundingClientRect().height / 2}px`,
      color: 'black'
    })
    ctx.restore()
  }

  drawCrosshair (value: number) {
    const ctx = this.ctx
    let xPos = this.dataUtils.xPosFromValue(value)
    if (this.crosshair.sticky && this.dataUtils.type !== 'heatmap3d') {
      const data = this.dataUtils.dataFromXPos(xPos)
      for (const d of data) {
        if (d == null) {
          continue
        }
        xPos = d.xDataValuePos
        break
      }
    }
    ctx.save()
    ctx.fillStyle = 'grey'
    ctx.fillRect(xPos, 0, 1, this.canvas.height)
    if (this.crosshair.text !== '') {
      ctx.font = '10px sans-serif'
      ctx.textBaseline = 'top'
      ctx.textAlign = 'left'
      ctx.fillText(this.crosshair.text, xPos + 4, 4)
    }
    ctx.restore()
  }

  selection (x: [number | null, number | null], y: [number | null, number | null]) {
    this.drawCrosshair(null)
    const ctx = this.ctx
    ctx.save()
    ctx.fillStyle = 'rgba(127,127,127,0.5)'
    if (x[0] != null && x[1] != null) {
      const [x1, x2] = [this.dataUtils.xPosFromValue(x[0]), this.dataUtils.xPosFromValue(x[1])]
      ctx.fillRect(0, 0, x1, this.canvas.height)
      ctx.fillRect(x2, 0, this.canvas.width - x2, this.canvas.height)
      ctx.fillStyle = 'grey'
      ctx.fillRect(x1, 0, 1, this.canvas.height)
      ctx.fillRect(x2, 0, 1, this.canvas.height)
    }
    if (y[0] != null && y[1] != null) {
      const [y1, y2] = [this.dataUtils.yPosFromValue(y[0]), this.dataUtils.yPosFromValue(y[1])]
      ctx.fillRect(0, 0, this.canvas.width, y2)
      ctx.fillRect(0, y1, this.canvas.width, this.canvas.height - y1)
    }
    ctx.restore()
  }

  update (value: number | null) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    if (value != null) {
      if (this.crosshair.enabled) {
        this.drawCrosshair(value)
      }
      if (this.tooltip) {
        this.drawTooltip(value)
      }
    } else {
      if (this.tooltip) {
        this.tooltipDiv.style.display = 'none'
      }
    }
  }

}