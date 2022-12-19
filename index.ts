import defaultOptions from './defaultOptions'
import { LichenOptions } from './types'
import XAxis from './xAxis'
import YAxis from './yAxis'

export class Lichen {

  opt: LichenOptions;
  yAxis: YAxis;
  xAxis: XAxis;

  constructor (container: HTMLElement, opt: LichenOptions) {
    this.opt = this.mergeOptions(opt)
    this.initStructure(container)
  }

  mergeOptions (opt: LichenOptions): LichenOptions {
    // deepcopy default options
    const result = JSON.parse(JSON.stringify(defaultOptions))
    // overwrite default options with given options
    for (const [k, v] of Object.entries(opt)) {
      if (v instanceof Object) {
        Object.assign(result[k], v)
      } else {
        result[k] = v
      }
    }
    return result
  }

  initStructure (container: HTMLElement) {
    const sizes = container.getBoundingClientRect()
    if (this.opt.title != null) {
      const title = document.createElement('div')
      title.innerHTML = this.opt.title
      container.appendChild(title)
    }
    const canvasWrapper = document.createElement('div')
    Object.assign(canvasWrapper.style, { position: 'relative', top: 0, left: 0 })
    container.appendChild(canvasWrapper)
    this.xAxis = new XAxis(
      canvasWrapper,
      this.opt.yAxis.enabled ? this.opt.yAxis.width : 0,
      sizes.width,
      this.opt.height,
      this.opt.xAxis
    )
    this.yAxis = new YAxis(canvasWrapper, sizes.width, this.opt.height, this.opt.yAxis)
    if (this.opt.type === 'line') {
      
    }
  }
}