import { ColorScaleOptions, StackedDataOptions, StackedOptions } from './types'
import DataUtils from './dataUtils'

export default class StackedPlot {

  opt: StackedOptions;
  dataUtils: DataUtils;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  colorScale: ColorScaleOptions;

  constructor (container: HTMLElement, opt: StackedOptions, dataUtils: DataUtils, colorScale: ColorScaleOptions) {
    this.opt = opt
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.dataUtils = dataUtils
    this.canvas.width = dataUtils.width
    this.canvas.height = dataUtils.height
    Object.assign(this.canvas.style, { position: 'absolute', top: 0, right: 0, zIndex: 10 })
    this.colorScale = colorScale
    container.appendChild(this.canvas)
  }

  setSerieColor (serie: StackedDataOptions) {
    const ctx = this.ctx
    ctx.fillStyle = serie.color ? serie.color : '#000000'
    ctx.strokeStyle = serie.color ? serie.color : 'rgb(0,0,0)'
  }

  update () {
    // prepare data
    const stackedValues: (null | (null | [number, number])[])[] = this.opt.data.map(x => [])
    let prevSerieIndex = null
    for (const [serieIndex, computed] of this.dataUtils.computed.series.entries()) {
      if (computed == null) {
        stackedValues[serieIndex] = null
        console.log(`no draw for serie #${serieIndex}`)
        continue
      }
      const serie = this.opt.data[serieIndex]
      let indexStep = computed.xRatio <= 1 ? 1 : computed.xRatio
      let indexPos = 0
      for (let i = computed.minIndex; i < computed.maxIndex; i += indexStep) {
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
      let xPos = this.dataUtils.xPosFromValue(computed.dataStart) as number
      const xStep = computed.xRatio <= 1 ? 1 / computed.xRatio : 1

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
      xPos = this.dataUtils.xPosFromValue(computed.dataStart)
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