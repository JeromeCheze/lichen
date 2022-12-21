import { SerieOptions } from './types'
import DataUtils from './dataUtils'

export default class LinePlot {

  opt: SerieOptions[];
  dataUtils: DataUtils;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor (container: HTMLElement, opt: SerieOptions[], dataUtils: DataUtils) {
    this.opt = opt
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.dataUtils = dataUtils
    this.canvas.width = dataUtils.width
    this.canvas.height = dataUtils.height
    Object.assign(this.canvas.style, { position: 'absolute', top: 0, right: 0, zIndex: 10 })
    container.appendChild(this.canvas)
  }

  update () {
    const ctx = this.ctx
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.save()
    ctx.strokeStyle = 'black'
    for (const [i, computed] of this.dataUtils.computed.series.entries()) {
      if (computed == null) {
        console.log('no draw for serie #${i}')
        continue
      }
      const serie = this.opt[i]
      let xPos = this.dataUtils.xPosFromValue(serie.start + computed.minIndex * serie.step)
      let xStep = 1
      let indexStep = computed.xRatio
      if (computed.xRatio <= 1) {
        xStep = 1 / computed.xRatio
        indexStep = 1
      }
      ctx.beginPath()
      let prev = null
      for (let i = computed.minIndex; i < computed.maxIndex; i += indexStep) {
        const group = serie.data.slice(i, i + indexStep).filter(x => x != null)
        if (group.length > 0) {
          let minValue: number | null = null
          let maxValue: number | null = null
          for (const v of group) {
            minValue = minValue == null || v < minValue ? v : minValue
            maxValue = maxValue == null || maxValue < v ? v : maxValue
          }
          if (xStep > 1) {
            if (prev == null) {
              ctx.moveTo(xPos, this.dataUtils.yPosFromValue(minValue))
            } else {
              ctx.lineTo(xPos, this.dataUtils.yPosFromValue(minValue))
            }
          } else {
            ctx.moveTo(xPos, this.dataUtils.yPosFromValue(minValue))
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