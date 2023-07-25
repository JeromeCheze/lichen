import DataUtils from "./dataUtils";
import EventUtils from "./eventUtils";
import { ColorScaleOptions, LineOptions } from "./types";

export default class FrontPanel {

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  dataUtils: DataUtils;
  eventUtils: EventUtils;
  colorScale: ColorScaleOptions | null;
  tooltip: boolean;
  crosshair: boolean;
  tooltipDiv: HTMLElement;

  constructor (
    container: HTMLElement,
    dataUtils: DataUtils,
    colorScale: ColorScaleOptions | null,
    tooltip: boolean,
    crosshair: boolean
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
    if (this.dataUtils.type === 'line' || this.dataUtils.type === 'stacked') {
      ctx.fillStyle = 'white'
      const data = this.dataUtils.dataFromXPos(xPos)
      const text = {
        time: null,
        series: [] as {color: string; name: string; value: number; textValue: string;}[]
      }
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
      text.series.sort((a, b) => {
        const aa = a.value
        const bb = b.value
        return aa < bb ? -1 : aa > bb ? 1 : 0
      })
      this.tooltipDiv.innerHTML = ''
      Object.assign(this.tooltipDiv.style, {
        display: 'block',
        position: 'absolute',
        left: `${this.eventUtils.state.mouseMovePos.pageX + 20}px`,
        top: `${this.eventUtils.state.mouseMovePos.pageY + 20}px`
      })
      const timeDiv = document.createElement('div')
      Object.assign(timeDiv.style, { fontWeight: 'bold' })
      timeDiv.innerHTML = new Date(text.time).toISOString().replace('T', '').replace('Z', '')
      this.tooltipDiv.appendChild(timeDiv)
      const serieTable = document.createElement('table')
      this.tooltipDiv.appendChild(serieTable)
      const serieTableBody = document.createElement('tbody')
      serieTable.appendChild(serieTableBody)
      for (const serie of text.series) {
        const serieRow = document.createElement('tr')
        const serieName = document.createElement('th')
        Object.assign(serieName.style, {color: serie.color, fontWeight: 'bold'})
        serieName.innerHTML = serie.name
        const serieValue = document.createElement('td')
        serieValue.innerHTML = serie.textValue
        serieRow.appendChild(serieName)
        serieRow.appendChild(serieValue)
        serieTableBody.appendChild(serieRow)
      }
    }
    ctx.restore()
  }

  drawCrosshair (value: number) {
    const ctx = this.ctx
    ctx.save()
    ctx.fillStyle = 'grey'
    ctx.fillRect(this.dataUtils.xPosFromValue(value), 0, 1, this.canvas.height)
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
      if (this.crosshair) {
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