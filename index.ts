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
    const wrapper = document.createElement('div')
    Object.assign(wrapper.style, { position: 'relative', top: 0, left: 0 })
    container.appendChild(wrapper)
    this.xAxis = new XAxis(
      wrapper,
      this.opt.yAxis.enabled ? this.opt.yAxis.width : 0,
      sizes.width,
      this.opt.height,
      this.opt.xAxis
    )
    this.yAxis = new YAxis(wrapper, sizes.width, this.opt.height, this.opt.yAxis)
    if (this.opt.type === 'line') {
      
    }
  }
}