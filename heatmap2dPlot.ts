import { ColorScaleOptions, Heatmap2dOptions } from './types'
import DataUtils from './dataUtils'

const MARGIN = 1

export default class Heatmap2dPlot {

  opt: Heatmap2dOptions[];
  dataUtils: DataUtils;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  colorScale: ColorScaleOptions;

  constructor (container: HTMLElement, opt: Heatmap2dOptions[], dataUtils: DataUtils, colorScale: ColorScaleOptions) {
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

  update () {
    const ctx = this.ctx
    const serieHeight = this.canvas.height / this.opt.length
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.save()
    let yPos = 0
    for (const [serieIndex, computed] of this.dataUtils.computed.series.entries()) {
      if (computed == null) {
        console.log(`no draw for serie #${serieIndex}`)
        continue
      }
      const serie = this.opt[serieIndex]
      let xPos = this.dataUtils.xPosFromValue(computed.dataStart) as number
      let xStep = 1
      let indexStep = computed.xRatio
      if (computed.xRatio <= 1) {
        xStep = 1 / computed.xRatio
        indexStep = 1
      }
      for (let i = computed.minIndex; i < computed.maxIndex; i += indexStep) {
        const group = serie.data.slice(i, i + indexStep).filter(x => x != null)
        if (group.length > 0) {
          ctx.fillStyle = this.dataUtils.getColor(Math.max.apply(null, group), this.colorScale) as string
          ctx.fillRect(Math.floor(xPos), yPos + MARGIN, Math.floor(xStep) + 1, serieHeight - 2 * MARGIN)
        }
        xPos += xStep
      }
      yPos += serieHeight
    }
    ctx.restore()
  }
}