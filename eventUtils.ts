import { EvenUtilsEventHandlerMap } from './types';
import DataUtils from './dataUtils'

const THRESHOLD = 5
const SELECT_THRESHOLD = 20

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
      resetDisplay: [],
      selecting: [],
    }
    this.state = {
      active: false,
      mouseMovePos: null,
      mouseDownPos: null,
      shiftKey: false,
      ctrlKey: false
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
    this.handleMouseUp(e)
    this.state.active = false
    this.state.shiftKey = false
    this.state.ctrlKey = false
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
        let x1 = null
        let x2 = null
        let y1 = null
        let y2 = null
        if (Math.abs(x - this.state.mouseDownPos[0]) > SELECT_THRESHOLD) {
          x1 = this.dataUtils.xValueFromPos(this.state.mouseDownPos[0])
          x2 = this.dataUtils.xValueFromPos(x)
        }
        if (Math.abs(y - this.state.mouseDownPos[1]) > SELECT_THRESHOLD) {
          y1 = this.dataUtils.yValueFromPos(this.state.mouseDownPos[1])
          y2 = this.dataUtils.yValueFromPos(y)
        }
        this.executeCallback('selecting', {
          x: x1 != null && x2 != null ? [Math.min(x1, x2), Math.max(x1, x2)] : [null, null],
          y: y1 != null && y2 != null ? [Math.min(y1, y2), Math.max(y1, y2)] : [null, null]
        })
      } else {
        const deltaX = this.state.mouseDownPos[0] - x
        const deltaY = this.state.mouseDownPos[0] - y
        if (Math.abs(deltaX) > THRESHOLD) {
          const valueDeltaX = this.dataUtils.xValueFromPos(this.state.mouseDownPos[0]) - this.dataUtils.xValueFromPos(x)
          this.state.mouseDownPos = [x, this.state.mouseDownPos[1]]
          this.executeCallback('xRangeChange', [
            this.dataUtils.start + valueDeltaX,
            this.dataUtils.end + valueDeltaX
          ])
        }
        if (Math.abs(deltaY) > THRESHOLD) {
          const valueDeltaY = this.dataUtils.yValueFromPos(this.state.mouseDownPos[1]) - this.dataUtils.yValueFromPos(y)
          this.state.mouseDownPos = [this.state.mouseDownPos[0], y]
          this.executeCallback('yRangeChange', [
            this.dataUtils.yMin + valueDeltaY,
            this.dataUtils.yMax + valueDeltaY
          ])
        }
      }
    } else {
      this.state.mouseMovePos = e
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
    if (this.state.shiftKey && this.state.mouseDownPos != null) {
      const [x, y] = this.getRelativePosition(e)
      if (Math.abs(x - this.state.mouseDownPos[0]) > SELECT_THRESHOLD) {
        const x1 = this.dataUtils.xValueFromPos(this.state.mouseDownPos[0])
        const x2 = this.dataUtils.xValueFromPos(x)
        this.executeCallback('xRangeChange', [Math.min(x1, x2), Math.max(x1, x2)])
      }
      if (Math.abs(y - this.state.mouseDownPos[1]) > SELECT_THRESHOLD) {
        const y1 = this.dataUtils.yValueFromPos(this.state.mouseDownPos[1])
        const y2 = this.dataUtils.yValueFromPos(y)
        this.executeCallback('yRangeChange', [Math.min(y1, y2), Math.max(y1, y2)])
      }
    }
    this.state.mouseDownPos = null
  }

  handleDblClick (e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    this.executeCallback('resetDisplay', this.dataUtils.xRange())
  }

  handleWheel (e: WheelEvent) {
    if (this.state.shiftKey) {
      e.preventDefault()
      e.stopPropagation()
      const sign = Math.sign(e.deltaY)
      if (this.state.ctrlKey) {
        const ratio = 0.1 * (this.dataUtils.yMax - this.dataUtils.yMin)
        this.executeCallback('yRangeChange', [
          this.dataUtils.yMin + sign * ratio,
          this.dataUtils.yMax - sign * ratio
        ])
      } else {
        const ratio = 0.1 * (this.dataUtils.end - this.dataUtils.start)
        this.executeCallback('xRangeChange', [
          this.dataUtils.start + sign * ratio,
          this.dataUtils.end - sign * ratio
        ])
      }
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
      this.state.ctrlKey = e.ctrlKey
    }
  }

  handleKeyUp (e: KeyboardEvent) {
    if (this.state.active) {
      this.state.shiftKey = e.shiftKey
      this.state.ctrlKey = e.ctrlKey
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

  resetDisplay (callback) {
    this.registered.resetDisplay.push(callback)
    return this
  }

}