import { ColorScaleOptions, LineOptions } from './types'
import DataUtils from './dataUtils'

const FILL_OPACITY = 0.2

export default class LinePlot {

  opt: LineOptions[];
  dataUtils: DataUtils;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  colorScale: ColorScaleOptions;
  stacked: boolean;

  constructor (container: HTMLElement, opt: LineOptions[], stacked: boolean, dataUtils: DataUtils, colorScale: ColorScaleOptions) {
    this.opt = opt
    this.stacked = stacked
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.dataUtils = dataUtils
    this.canvas.width = dataUtils.width
    this.canvas.height = dataUtils.height
    Object.assign(this.canvas.style, { position: 'absolute', top: 0, right: 0, zIndex: 10 })
    this.colorScale = colorScale
    container.appendChild(this.canvas)
  }

  setSerieColor (serie: LineOptions) {
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

  update () {
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
      let xPos = this.dataUtils.xPosFromValue(computed.dataStart)
      let xStep = 1
      let indexStep = computed.xRatio
      if (computed.xRatio <= 1) {
        xStep = 1 / computed.xRatio
        indexStep = 1
      }
      ctx.lineWidth = serie.linewidth ? serie.linewidth : 1
      let prev = null
      if (serie.area === true) {
        for (let i = computed.minIndex; i < computed.maxIndex; i += indexStep) {
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
      xPos = this.dataUtils.xPosFromValue(computed.dataStart)
      prev = null
      for (let i = computed.minIndex; i < computed.maxIndex; i += indexStep) {
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