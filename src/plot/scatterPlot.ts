import type { DataFromPos, ScatterOptions, TooltipHandlerResponse } from '../types'
import MasterInterface from '../masterInterface'
import AbstractPlot from './abstractPlot.js'


const RADIUS = 4


export default class ScatterPlot extends AbstractPlot {

  constructor(container: HTMLElement, master: MasterInterface) {
    super(container, master)
    for (const serie of this.opt) {
      serie.enabled = true
      serie.data.sort((a, b) => {
        const aa = a.x
        const bb = b.x
        return aa < bb ? -1 : aa > bb ? 1 : 0
      })
    }
  }

  get opt(): ScatterOptions[] {
    return this.master.getRegistered('CHART').opt.series
  }

  tooltipHandler(x: number, ctx: CanvasRenderingContext2D): TooltipHandlerResponse {
    ctx.save()
    ctx.strokeStyle = '#888'
    ctx.lineWidth = 2
    const xPos = this.dataUtils.xPosFromValue(x) as number
    const data = this.dataFromXPos(xPos)
    let xValue = x
    const yValues = []
    for (const [i, s] of this.opt.entries()) {
      if (data[i] == null) {
        continue
      }
      xValue = data[i]!.xDataValue
      const point = s.data[data[i]!.index!]
      const value = data[i]!.yDataValue
      if (value == null) {
        continue
      }
      const color = point.color != null ? point.color : s.color
      yValues.push({
        color: color,
        value,
        name: `${point.name} (${s.name})`,
        textValue: s.tooltipFormatter != null && value != null ? s.tooltipFormatter(value) : `${value}`
      })
      ctx.fillStyle = color
      ctx.beginPath()
      if (s.shape === 'circle') {
        this.drawCircle(ctx, data[i]!.xDataValuePos, data[i]!.yDataValuePos, true)
      } else if (s.shape === 'diamond') {
        this.drawDiamond(ctx, data[i]!.xDataValuePos, data[i]!.yDataValuePos, true)
      }
      ctx.fill()
      ctx.stroke()
    }
    ctx.restore()
    return { xValue, yValues }
  }

  drawCircle(ctx: CanvasRenderingContext2D, xPos: number, yPos: number, active: boolean) {
    const radius = active ? RADIUS * 1.5 : RADIUS
    ctx.ellipse(xPos, yPos, radius, radius, 0, 0, 2 * Math.PI)
  }

  drawDiamond(ctx: CanvasRenderingContext2D, xPos: number, yPos: number, active: boolean) {
    const radius = active ? RADIUS * 1.5 : RADIUS
    ctx.moveTo(xPos, yPos - radius)
    ctx.lineTo(xPos + radius, yPos)
    ctx.lineTo(xPos, yPos + radius)
    ctx.lineTo(xPos - radius, yPos)
    ctx.closePath()
  }

  dataFromXPos(xPos: number): (DataFromPos | null)[] {
    const result: (DataFromPos | null)[] = Array.from({ length: this.opt.length }, () => null)
    for (const [i, serie] of this.opt.entries()) {
      const collection: { distance: number; point: {x: number; y: number; name: string; color?: string} }[] = []
      for (const point of serie.data) {
        const x = this.dataUtils.xPosFromValue(point.x)!
        const distance = Math.abs(x - xPos)
        if (distance <= 10) {
          collection.push({ distance, point })
        }
      }
      if (collection.length > 0) {
        collection.sort((a, b) => {
          const aa = a.distance
          const bb = b.distance
          return aa < bb ? -1 : aa > bb ? 1 : 0
        })
        result[i] = {
          index: serie.data.indexOf(collection[0].point),
          xDataValue: collection[0].point.x,
          xDataValuePos: this.dataUtils.xPosFromValue(collection[0].point.x) as number,
          yDataValue: collection[0].point.y,
          yDataValuePos: this.dataUtils.yPosFromValue(collection[0].point.y) as number
        }
      }
    }
    return result
  }

  yRange(): [number, number] {
    let min: number | null = null
    let max: number | null = null
    for (const serie of this.opt) {
      for (const value of serie.data) {
        if (min == null) {
          min = value.y
        } else if (max == null) {
          max = value.y
        } else {
          min = Math.min(min, value.y)
          max = Math.max(max, value.y)
        }
      }
    }
    if (min == null || max == null) {
      min = -0.1
      max = 0.1
    }
    return [min, max]
  }

  xRange() {
    const xAxis = this.master.getRegistered('X_AXIS')
    let minStart: number | null = null
    let maxEnd: number | null = null
    for (const serie of this.opt) {
      for (const point of serie.data) {
        minStart = minStart == null ? point.x : Math.min(point.x, minStart)
        maxEnd = maxEnd == null ? point.x : Math.max(point.x, maxEnd)
      }
    }
    const padding = (maxEnd! - minStart!) * 0.01
    return [
      xAxis.opt.min != null ? xAxis.opt.min : minStart! - padding,
      xAxis.opt.max != null ? xAxis.opt.max : maxEnd! + padding
    ] as [number, number]
  }

  step() {
    let step: number | null = null
    for (const serie of this.opt) {
      let prev: number | null = null
      for (const point of serie.data) {
        if (prev != null) {
          const delta = point.x - prev
          step = step == null ? delta : Math.max(step, point.x - prev)
        }
        prev = point.x
      }
    }
    return step == null ? 1e3 : step
  }

  getProcessingData() {
    const result = []
    for (const serie of this.opt) {
      if (serie.enabled) {
        result.push(serie.data.filter(point => point.x >= this.dataUtils.start! && point.x <= this.dataUtils.end!).map(point => point.y))
      } else {
        result.push([])
      }
    }
    return result
  }

  update () {
    const ctx = this.ctx
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.save()
    ctx.strokeStyle = '#888'
    for (const [serieIndex, computed] of this.dataUtils.computed.series.entries()) {
      if (computed == null) {
        console.log(`no draw for serie #${serieIndex}`)
        continue
      }
      const serie = this.opt[serieIndex]
      for (const point of serie.data) {
        if (point.x < this.dataUtils.start! || point.x > this.dataUtils.end!) {
          continue
        }
        ctx.fillStyle = point.color != null ? point.color : serie.color
        ctx.beginPath()
        if (serie.shape === 'circle') { 
          this.drawCircle(ctx, this.dataUtils.xPosFromValue(point.x)!, this.dataUtils.yPosFromValue(point.y)!, false)
        } else if (serie.shape === 'diamond') {
          this.drawDiamond(ctx, this.dataUtils.xPosFromValue(point.x)!, this.dataUtils.yPosFromValue(point.y)!, false)
        }
        ctx.fill()
        ctx.stroke()
      }
    }
    ctx.restore()
  }
}