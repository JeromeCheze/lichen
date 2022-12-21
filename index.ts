import defaultOptions from './defaultOptions.js'
import { LichenOptions } from './types.js'
import DataUtils from './dataUtils.js'
import XAxis from './xAxis.js'
import YAxis from './yAxis.js'
import LinePlot from './linePlot.js'

export default class Lichen {

  opt: LichenOptions;
  yAxis: YAxis;
  xAxis: XAxis;
  dataUtils: DataUtils;
  plot: LinePlot;

  constructor (container: HTMLElement, opt: LichenOptions, drawOnCreation: boolean = true) {
    this.opt = this.mergeOptions(opt)
    this.init(container)
  }

  mergeOptions (opt: LichenOptions): LichenOptions {
    // deepcopy default options
    const result = JSON.parse(JSON.stringify(defaultOptions))
    // overwrite default options with given options
    for (const [k, v] of Object.entries(opt)) {
      if (v instanceof Object && !(v instanceof Array)) {
        Object.assign(result[k], v)
      } else {
        result[k] = v
      }
    }
    return result
  }

  init (container: HTMLElement) {
    const sizes = container.getBoundingClientRect()
    if (this.opt.title != null) {
      const title = document.createElement('div')
      title.innerHTML = this.opt.title
      container.appendChild(title)
    }
    const canvasWrapper = document.createElement('div')
    Object.assign(canvasWrapper.style, { position: 'relative', top: 0, left: 0 })
    container.appendChild(canvasWrapper)
    const plotWidth = this.opt.yAxis.enabled ? sizes.width - this.opt.yAxis.width : sizes.width
    this.dataUtils = new DataUtils(this.opt.series, plotWidth, this.opt.height)
    this.xAxis = new XAxis(canvasWrapper, this.opt.xAxis, this.dataUtils)
    this.yAxis = new YAxis(canvasWrapper, this.opt.yAxis, this.dataUtils)
    if (this.opt.type === 'line') {
      this.plot = new LinePlot(canvasWrapper, this.opt.series, this.dataUtils)
    }
    
  }

  draw () {
    [this.dataUtils.start, this.dataUtils.end] = this.dataUtils.dataRange()
    this.dataUtils.computeData()
    let amplitude = this.dataUtils.computed.maxValue - this.dataUtils.computed.minValue
    if (amplitude === 0) {
      amplitude = 0.1
    }
    this.dataUtils.yMin = this.dataUtils.computed.minValue - 0.1 * amplitude
    this.dataUtils.yMax = this.dataUtils.computed.maxValue + 0.1 * amplitude
    this.xAxis.update()
    this.yAxis.update()
    this.plot.update()
  }
}