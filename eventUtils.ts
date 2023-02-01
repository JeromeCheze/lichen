import { EvenUtilsEventHandlerMap } from './types';
import DataUtils from './dataUtils'

const THRESHOLD = 5

export default class EventUtils {

  element: HTMLElement;
  dataUtils: DataUtils;
  handler: EvenUtilsEventHandlerMap;
  registered: Record<string, ((e:any) => void)[]>;
  state: Record<string, any>;

  constructor (element: HTMLElement, dataUtils: DataUtils) {
    this.element = element
    this.dataUtils = dataUtils
    this.handler = {
      'mouseleave': { el: element, callback: (e: MouseEvent) => this.handleMouseLeave(e) },
      'mousemove': { el: element, callback: (e: MouseEvent) => this.handleMouseMove(e) },
      'mousedown': { el: element, callback: (e: MouseEvent) => this.handleMouseDown(e) },
      'mouseup': { el: element, callback: (e: MouseEvent) => this.handleMouseUp(e) },
      'dblclick': { el: element, callback: (e: MouseEvent) => this.handleDblClick(e) },
      'wheel': { el: element, callback: (e: WheelEvent) => this.handleWheel(e) },
      'touchstart': { el: element, callback: (e: TouchEvent) => this.handleTouchStart(e) },
      'touchend': { el: element, callback: (e: TouchEvent) => this.handleTouchEnd(e) },
      'touchmove': { el: element, callback: (e: TouchEvent) => this.handleTouchMove(e) },
      'keydown': { el: document.body, callback: (e: KeyboardEvent) => this.handleKeyDown(e) },
      'keyup': { el: document.body, callback: (e: KeyboardEvent) => this.handleKeyUp(e) }
    }
    for (const [eventName, o] of Object.entries(this.handler)) {
      o.el.addEventListener(eventName, o.callback)
    }
    this.registered = {
      active: [],
      move: [],
      xRangeChange: [],
      yRangeChange: [],
      selecting: []
    }
    this.state = {
      active: false,
      mouseDownPos: null,
      shiftKey: false
    }
  }

  executeCallback (name: string, opt: any) {
    for (const callback of this.registered[name]) {
      callback.call(null, opt)
    }
  }

  getRelativePosition (e: MouseEvent) {
    const bcr = this.element.getBoundingClientRect()
    return [e.clientX - bcr.x, e.clientY - bcr.y]
  }

  handleMouseLeave (e: MouseEvent) {
    this.state.active = false
    this.executeCallback('active', false)
  }

  handleMouseMove (e: MouseEvent) {
    if (this.state.active === false) {
      this.state.active = true
      this.executeCallback('active', true)
    }
    const [x, y] = this.getRelativePosition(e)
    if (this.state.mouseDownPos != null) {
      if (this.state.shiftKey) {
        const x1 = this.dataUtils.xValueFromPos(this.state.mouseDownPos[0])
        const x2 = this.dataUtils.xValueFromPos(x)
        this.executeCallback('selecting', {
          x: [Math.min(x1, x2), Math.max(x1, x2)],
          y: [null, null]
        })
      } else {
        const deltaX = this.state.mouseDownPos[0] - x
        if (Math.abs(deltaX) > THRESHOLD) {
          const valueDeltaX = this.dataUtils.xValueFromPos(this.state.mouseDownPos[0]) - this.dataUtils.xValueFromPos(x)
          this.state.mouseDownPos = [x, y]
          this.executeCallback('xRangeChange', [
            this.dataUtils.start + valueDeltaX,
            this.dataUtils.end + valueDeltaX
          ])
        }
      }
    } else {
      this.executeCallback('move', [
        this.dataUtils.xValueFromPos(x),
        this.dataUtils.yValueFromPos(y)
      ])
    }
  }

  handleMouseDown (e: MouseEvent) {
    this.state.mouseDownPos = this.getRelativePosition(e)
  }

  handleMouseUp (e: MouseEvent) {
    if (this.state.shiftKey) {
      const [x, y] = this.getRelativePosition(e)
      if (Math.abs(x - this.state.mouseDownPos[0]) > THRESHOLD) {
        const x1 = this.dataUtils.xValueFromPos(this.state.mouseDownPos[0])
        const x2 = this.dataUtils.xValueFromPos(x)
        this.executeCallback('xRangeChange', [Math.min(x1, x2), Math.max(x1, x2)])
      }
      
    }
    this.state.mouseDownPos = null
  }

  handleDblClick (e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    this.executeCallback('xRangeChange', this.dataUtils.dataRange())
  }

  handleWheel (e: WheelEvent) {
    if (this.state.shiftKey) {
      const sign = Math.sign(e.deltaY)
      const ratio = 0.1 * (this.dataUtils.end - this.dataUtils.start)
      this.executeCallback('xRangeChange', [
        this.dataUtils.start + sign * ratio,
        this.dataUtils.end - sign * ratio
      ])
    }
  }

  handleTouchStart (e: TouchEvent) {

  }

  handleTouchEnd (e: TouchEvent) {

  }

  handleTouchMove (e: TouchEvent) {

  }

  handleKeyDown (e: KeyboardEvent) {
    if (this.state.active) {
      this.state.shiftKey = e.shiftKey
    }
  }

  handleKeyUp (e: KeyboardEvent) {
    if (this.state.active) {
      this.state.shiftKey = e.shiftKey
    }
  }

  active (callback) {
    this.registered.active.push(callback)
    return this
  }

  move (callback) {
    this.registered.move.push(callback)
    return this
  }

  xRangeChange (callback) {
    this.registered.xRangeChange.push(callback)
    return this
  }

  yRangeChange (callback) {
    this.registered.yRangeChange.push(callback)
    return this
  }

  selecting (callback) {
    this.registered.selecting.push(callback)
    return this
  }

}