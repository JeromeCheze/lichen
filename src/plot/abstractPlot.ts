import DataUtils from "../dataUtils"
import MasterInterface from "../masterInterface"
import { ColorScaleOptions, DataFromPos, TooltipHandlerResponse } from "../types"

export default abstract class AbstractPlot {

  canvas: HTMLCanvasElement;
  dataUtils: DataUtils;
  ctx: CanvasRenderingContext2D;
  master: MasterInterface;

  constructor(container: HTMLElement, master: MasterInterface) {
    master.register('PLOT', this)
    this.master = master
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.dataUtils = master.getRegistered('DATA_UTILS')
    this.canvas.width = this.dataUtils.width
    this.canvas.height = this.dataUtils.height
    Object.assign(this.canvas.style, { position: 'absolute', top: 0, right: 0, zIndex: 10 })
    container.appendChild(this.canvas)
  }

  get colorScale(): ColorScaleOptions {
    return this.master.getRegistered('CHART').opt.colorScale
  }

  static getHeight(master: MasterInterface) {
    return master.getRegistered('CHART').opt.height
  }

  isDataStacked() {
    return false
  }

  yRange(): [number, number] {
    return [this.dataUtils.computed.minValue, this.dataUtils.computed.maxValue]
  }

  abstract tooltipHandler(x: number, ctx: CanvasRenderingContext2D): TooltipHandlerResponse

  abstract dataFromXPos(xPos: number): (DataFromPos | null)[]
  
  abstract xRange(): [number, number]

  abstract getProcessingData(): (number | null)[][]

  abstract update(forceRedraw: boolean): void
}