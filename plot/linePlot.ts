import { ColorScaleOptions, DataFromPos, LineOptions, TooltipHandlerResponse } from '../types'
import MasterInterface from '../masterInterface'
import AbstractPlot from './abstractPlot.js'

const FILL_OPACITY = 0.2

export default class LinePlot extends AbstractPlot {

  opt: LineOptions[];
  colorScale: ColorScaleOptions;

  constructor(container: HTMLElement, master: MasterInterface) {
    super(container, master)
    this.opt = this.master.getRegistered('CHART').opt.series
    this.colorScale = this.master.getRegistered('CHART').opt.colorScale
    for (const serie of this.opt) {
      serie.enabled = true
    }
  }

  tooltipHandler(x: number, ctx: CanvasRenderingContext2D): TooltipHandlerResponse {
    ctx.save()
    ctx.fillStyle = 'white'
    const xPos = this.dataUtils.xPosFromValue(x)
    const data = this.dataFromXPos(xPos)
    let xValue = null
    const yValues = []
    for (const [i, s] of this.opt.entries()) {
      if (data[i] == null) {
        continue
      }
      xValue = data[i].xDataValue
      const value = data[i].yDataValue
      const color = s.color != null ? s.color : this.dataUtils.getColor(value, this.colorScale, true) as string
      yValues.push({
        color,
        value,
        name: s.name,
        textValue: s.tooltipFormatter != null ? s.tooltipFormatter(value) : `${value}`
      })
      ctx.strokeStyle = color
      ctx.beginPath()
      ctx.ellipse(data[i].xDataValuePos, data[i].yDataValuePos, 3, 3, 0, 0, 2 * Math.PI)
      ctx.fill()
      ctx.stroke()
    }
    ctx.restore()
    return { xValue, yValues }
  }

  dataFromXPos(xPos: number): (DataFromPos | null)[] {
    const result: (DataFromPos | null)[] = Array.from({ length: this.opt.length }, () => null)
    if (this.dataUtils.start == null || this.dataUtils.end == null) {
      return result
    }
    const xValue = this.dataUtils.xValueFromPos(xPos)
    if (xValue == null) {
      return result
    }
    for (const [i, serie] of this.opt.entries()) {
      const c = this.dataUtils.computed.series[i]
      if (c == null) {
        continue
      }
      const index = Math.round(serie.data.length * (xValue - serie.start) / (serie.data.length * serie.step))
      const xDataValue = serie.start + index * serie.step
      const yDataValue = serie.data[index]
      result[i] = {
        index,
        xDataValue,
        xDataValuePos: this.dataUtils.xPosFromValue(xDataValue)!,
        yDataValuePos: this.dataUtils.yPosFromValue(yDataValue),
        yDataValue
      }
    }
    return result
  }

  xRange() {
    let minStart: number | null = null
    let maxEnd: number | null = null
    for (const serie of this.opt) {
      const end = serie.start + serie.data.length * serie.step
      minStart = minStart == null ? serie.start : Math.min(serie.start, minStart)
      maxEnd = maxEnd == null ? end : Math.max(end, maxEnd)
    }
    return [minStart, maxEnd] as [number, number]
  }

  getXRangeIndex(serie: LineOptions) {
    return [
      Math.max(0, Math.floor((this.dataUtils.start - serie.start) / serie.step)),
      Math.min(1 + Math.floor((this.dataUtils.end - serie.start) / serie.step), serie.data.length)
    ]
  }

  getProcessingData() {
    const result = []
    for (const serie of this.opt) {
      const [i1, i2] = this.getXRangeIndex(serie)
      result.push(serie.enabled ? serie.data.slice(i1, i2) : [])
    }
    return result
  }

  setSerieColor(serie: LineOptions) {
    const ctx = this.ctx
    if (this.colorScale != null) {
      const min = this.colorScale.min
      const max = this.colorScale.max
      if (serie.area === true) {
        const fillGrad = ctx.createLinearGradient(
          0, this.dataUtils.yPosFromValue(min),
          0, this.dataUtils.yPosFromValue(max)
        )
        for (const stop of this.colorScale.stops) {
          fillGrad.addColorStop(stop[0], this.dataUtils.toRGBA(stop[1], FILL_OPACITY))
        }
        ctx.fillStyle = fillGrad
      }
      const strokeGrad = ctx.createLinearGradient(
        0, this.dataUtils.yPosFromValue(min),
        0, this.dataUtils.yPosFromValue(max)
      )
      for (const stop of this.colorScale.stops) {
        strokeGrad.addColorStop(stop[0], this.dataUtils.toRGB(stop[1]))
      }
      ctx.strokeStyle = strokeGrad
    } else {
      if (serie.area === true) {
        ctx.fillStyle = serie.color
          ? `rgba(${serie.color.slice(4, -1)},${FILL_OPACITY})`
          : `rgba(0,0,0,${FILL_OPACITY})`
      }
      ctx.strokeStyle = serie.color ? serie.color : 'rgb(0,0,0)'
    }
  }

  update() {
    const ctx = this.ctx
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.save()
    for (const [serieIndex, computed] of this.dataUtils.computed.series.entries()) {
      if (computed == null) {
        console.log(`no draw for serie #${serieIndex}`)
        continue
      }
      const serie = this.opt[serieIndex]
      this.setSerieColor(serie)
      const [i1, i2] = this.getXRangeIndex(serie)
      let x0 = serie.start + serie.step * i1
      let xPos = this.dataUtils.xPosFromValue(x0)
      const xRatio = (this.dataUtils.end - this.dataUtils.start) / (serie.step * this.dataUtils.width)
      let xStep = 1
      let indexStep = xRatio
      if (xRatio <= 1) {
        xStep = 1 / xRatio
        indexStep = 1
      }
      ctx.lineWidth = serie.linewidth ? serie.linewidth : 1
      let prev = null
      if (serie.area === true) {
        for (let i = i1; i < i2; i += indexStep) {
          const group = serie.data.slice(i, i + indexStep).filter(x => x != null)
          if (group.length > 0) {
            let minValue: number | null = null
            let maxValue: number | null = null
            for (const v of group) {
              minValue = minValue == null || v < minValue ? v : minValue
              maxValue = maxValue == null || maxValue < v ? v : maxValue
            }
            if (prev == null) {
              ctx.beginPath()
              ctx.moveTo(xPos, Math.min(this.dataUtils.yPosFromValue(0), this.canvas.height))
              ctx.lineTo(xPos, this.dataUtils.yPosFromValue(minValue))
            } else {
              ctx.lineTo(xPos, this.dataUtils.yPosFromValue(minValue))
            }
            if (xStep === 1) {
              ctx.lineTo(xPos, this.dataUtils.yPosFromValue(maxValue))
            }
            prev = minValue
          } else {
            ctx.lineTo(xPos - xStep, Math.min(this.dataUtils.yPosFromValue(0), this.canvas.height))
            ctx.closePath()
            ctx.fill()
            prev = null
          }
          xPos += xStep
        }
        if (prev != null) {
          ctx.lineTo(xPos - xStep, Math.min(this.dataUtils.yPosFromValue(0), this.canvas.height))
          ctx.closePath()
          ctx.fill()
        }
      }
      ctx.beginPath()
      xPos = this.dataUtils.xPosFromValue(x0)
      prev = null
      for (let i = i1; i < i2; i += indexStep) {
        const group = serie.data.slice(i, i + indexStep).filter(x => x != null)
        if (group.length > 0) {
          let minValue: number | null = null
          let maxValue: number | null = null
          for (const v of group) {
            minValue = minValue == null || v < minValue ? v : minValue
            maxValue = maxValue == null || maxValue < v ? v : maxValue
          }
          if (prev == null) {
            ctx.moveTo(xPos, this.dataUtils.yPosFromValue(minValue))
          } else {
            ctx.lineTo(xPos, this.dataUtils.yPosFromValue(minValue))
          }
          if (xStep === 1) {
            ctx.lineTo(xPos, this.dataUtils.yPosFromValue(maxValue))
          }
          prev = minValue
        } else {
          prev = null
        }
        xPos += xStep
      }
      ctx.stroke()
    }
    ctx.restore()
  }
}