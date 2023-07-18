import { SequenceOptions } from './types'
import DataUtils from './dataUtils'

const MARGIN = 1

export default class SequencePlot {

  opt: SequenceOptions;
  dataUtils: DataUtils;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor (container: HTMLElement, opt: SequenceOptions, dataUtils: DataUtils) {
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
    ctx.fillStyle = this.opt.color
    const serieHeight = this.canvas.height / this.opt.valueMap.length
    const heightMap = {}
    let height = 0
    for (const item of this.opt.valueMap) {
      heightMap[item.value] = height
      height += serieHeight
    }
    const computed = this.dataUtils.computed.series[0]
    let xPos = this.dataUtils.xPosFromValue(computed.dataStart) as number
    const xStep = 1 / computed.xRatio
    for (let i = computed.minIndex; i < computed.maxIndex; i++) {
      const value = this.opt.data[i]
      if (value != null) {
        const yPos = heightMap[value]
        ctx.fillRect(Math.floor(xPos), yPos + MARGIN, Math.floor(xStep) + 1, serieHeight - 2 * MARGIN)
      }
      xPos += xStep
    }
    ctx.restore()
  }
}