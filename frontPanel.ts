import DataUtils from "./dataUtils";

export default class FrontPanel {

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  dataUtils: DataUtils;

  constructor (container: HTMLElement, dataUtils: DataUtils) {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.dataUtils = dataUtils
    this.canvas.width = dataUtils.width
    this.canvas.height = dataUtils.height
    Object.assign(this.canvas.style, { position: 'absolute', top: 0, right: 0, zIndex: 100 })
    container.appendChild(this.canvas)
  }

  drawCrosshair (value: number | null) {
    const ctx = this.ctx
    ctx.save()
    ctx.fillStyle = 'grey'
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    if (value != null) {
      ctx.fillRect(this.dataUtils.xPosFromValue(value), 0, 1, this.canvas.height)
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

}