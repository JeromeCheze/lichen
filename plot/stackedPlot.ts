import { ColorScaleOptions, DataFromPos, StackedDataOptions, StackedOptions, TooltipHandlerResponse } from '../types'
import MasterInterface from '../masterInterface'
import AbstractPlot from './abstractPlot.js'

export default class StackedPlot extends AbstractPlot {

  opt: StackedOptions;
  colorScale: ColorScaleOptions;

  constructor(container: HTMLElement, master: MasterInterface) {
    super(container, master)
    this.opt = this.master.getRegistered('CHART').opt.series
    this.colorScale = this.master.getRegistered('CHART').opt.colorScale
    for (const serie of this.opt.data) {
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
    let stackedValue = 0
    for (const [i, s] of this.opt.data.entries()) {
      xValue = data[i].xDataValue
      const value = data[i].yDataValue
      if (value == null) {
        continue
      }
      const color = s.color != null ? s.color : this.dataUtils.getColor(value, this.colorScale, true) as string
      yValues.push({
        color,
        value,
        name: s.name,
        textValue: `${value}`
      })
      ctx.strokeStyle = color
      ctx.beginPath()
      stackedValue += value
      ctx.ellipse(data[i].xDataValuePos, this.dataUtils.yPosFromValue(stackedValue), 3, 3, 0, 0, 2 * Math.PI)
      ctx.fill()
      ctx.stroke()
    }
    ctx.restore()
    return { xValue, yValues }
  }

  dataFromXPos(xPos: number): (DataFromPos | null)[] {
    const result: (DataFromPos | null)[] = Array.from({ length: this.opt.data.length }, () => null)
    if (this.dataUtils.start == null || this.dataUtils.end == null) {
      return result
    }
    const xValue = this.dataUtils.xValueFromPos(xPos)
    if (xValue == null) {
      return result
    }
    for (const [i, serie] of this.opt.data.entries()) {
      const c = this.dataUtils.computed.series[i]
      if (c == null) {
        continue
      }
      const index = Math.round(serie.data.length * (xValue - this.opt.start) / (serie.data.length * this.opt.step))
      const xDataValue = this.opt.start + index * this.opt.step
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

  isDataStacked() {
    return true
  }

  xRange() {
    return [this.opt.start, this.opt.start + this.opt.data[0].data.length * this.opt.step] as [number, number]
  }

  getXRangeIndex() {
    return [
      Math.max(0, Math.floor((this.dataUtils.start - this.opt.start) / this.opt.step)),
      Math.min(1 + Math.floor((this.dataUtils.end - this.opt.start) / this.opt.step), this.opt.data[0].data.length)
    ]
  }

  getProcessingData() {
    const result = []
    const [i1, i2] = this.getXRangeIndex()
    for (const serie of this.opt.data) {
      result.push(serie.enabled ? serie.data.slice(i1, i2) : [])
    }
    return result
  }

  setSerieColor(serie: StackedDataOptions) {
    const ctx = this.ctx
    ctx.fillStyle = serie.color ? serie.color : '#000000'
    ctx.strokeStyle = serie.color ? serie.color : 'rgb(0,0,0)'
  }

  update() {
    // prepare data
    const stackedValues: (null | (null | [number, number])[])[] = this.opt.data.map(x => [])
    let prevSerieIndex = null
    const [i1, i2] = this.getXRangeIndex()
    const xRatio = (this.dataUtils.end - this.dataUtils.start) / (this.opt.step * this.dataUtils.width)
    for (const [serieIndex, computed] of this.dataUtils.computed.series.entries()) {
      if (computed == null) {
        stackedValues[serieIndex] = null
        console.log(`no draw for serie #${serieIndex}`)
        continue
      }
      const serie = this.opt.data[serieIndex]
      let indexStep = xRatio <= 1 ? 1 : xRatio
      let indexPos = 0
      for (let i = i1; i < i2; i += indexStep) {
        const group = serie.data.slice(i, i + indexStep).filter(x => x != null)
        if (group.length > 0) {
          let minValue: number | null = null
          let maxValue: number | null = null
          for (const v of group) {
            minValue = minValue == null || v < minValue ? v : minValue
            maxValue = maxValue == null || maxValue < v ? v : maxValue
          }
          const [prevMinStacked, prevMaxStacked] = prevSerieIndex != null ? stackedValues[prevSerieIndex][indexPos] : [0, 0]
          stackedValues[serieIndex].push([
            prevMinStacked + minValue,
            prevMaxStacked + maxValue
          ])
        } else {
          stackedValues[serieIndex].push(null)
        }
        indexPos++
      }
      prevSerieIndex = serieIndex
    }

    const ctx = this.ctx
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.save()
    ctx.lineWidth = this.opt.linewidth ? this.opt.linewidth : 1
    for (let serieIndex = stackedValues.length - 1; serieIndex >= 0; serieIndex--) {
      const serieStacked = stackedValues[serieIndex]
      const computed = this.dataUtils.computed.series[serieIndex]
      const serie = this.opt.data[serieIndex]
      if (computed == null) {
        console.log(`Skip draw for serie #${serieIndex}`)
        continue
      }
      let x0 = this.opt.start + this.opt.step * i1
      let xPos = this.dataUtils.xPosFromValue(x0) as number
      const xStep = xRatio <= 1 ? 1 / xRatio : 1

      this.setSerieColor(serie)

      let prev = null
      if (this.opt.area) {
        // draw area
        for (let i = 0; i < serieStacked.length; i ++) {
          if (serieStacked[i] != null) {
            const [minValue, maxValue] = serieStacked[i]
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
            if (prev != null) {
              ctx.lineTo(xPos - xStep, Math.min(this.dataUtils.yPosFromValue(0), this.canvas.height))
              ctx.closePath()
              ctx.fill()
            }
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

      // draw line
      xPos = this.dataUtils.xPosFromValue(x0)
      prev = null
      ctx.beginPath()
      for (let i = 0; i < serieStacked.length; i++) {
        if (serieStacked[i] != null) {
          const [minValue, maxValue] = serieStacked[i]
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