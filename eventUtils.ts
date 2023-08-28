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
      'touchcancel': { el: element, callback: (e: TouchEvent) => this.handleTouchEnd(e) },
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
      cursorPos: null,
      mouseDownPos: null,
      shiftKey: false,
      ctrlKey: false,
      touches: [],
      lastDistance: null,
      lastTouchTime: null
    }
  }

  executeCallback (name: string, opt: any) {
    for (const callback of this.registered[name]) {
      callback.call(null, opt)
    }
  }

  getRelativePosition (e: MouseEvent | Touch) {
    const bcr = this.element.getBoundingClientRect()
    return [e.clientX - bcr.x, e.clientY - bcr.y]
  }

  handleMouseLeave (e?: MouseEvent) {
    if (e != null) {
      this.handleMouseUp(e)
    }
    this.state.active = false
    this.state.shiftKey = false
    this.state.ctrlKey = false
    this.state.cursorPos = null
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
      this.state.cursorPos = e
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

  handleDblClick (e: MouseEvent | TouchEvent) {
    e.preventDefault()
    e.stopPropagation()
    this.executeCallback('resetDisplay', this.dataUtils.xRange())
    this.clearSelection()
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

  getAngle (x1: number, y1: number, x2: number, y2: number) {
    const x1x2 = Math.abs(x2 - x1)
    const y1y2 = Math.abs(y2 - y1)
    let rad = Math.atan(y1y2 / x1x2)
    if (x2 < x1 && y2 < y1) {
      rad = Math.PI - rad
    } else if (x2 < x1 && y2 > y1) {
      rad += Math.PI
    } else if (x2 > x1 && y2 > y1) {
      rad = 2 * Math.PI - rad
    }
    return rad * 180 / Math.PI
  }

  getDistance (x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt(Math.pow(Math.abs(x2 - x1), 2) + Math.pow(Math.abs(y2 - y1), 2))
  }

  getPanning (refX1: number, refY1: number, refX2: number, refY2: number, curX1: number, curY1: number, curX2: number, curY2: number) {
    const refMiddleX = (refX1 + refX2) / 2
    const refMiddleY = (refY1 + refY2) / 2
    const curMiddleX = (curX1 + curX2) / 2
    const curMiddleY = (curY1 + curY2) / 2
    return [curMiddleX - refMiddleX, refMiddleY - curMiddleY]
  }

  handleTouchStart (e: TouchEvent) {
    e.preventDefault()
    if (e.touches.length === 1) {
      if (this.state.lastTouchTime == null) {
        this.state.lastTouchTime = new Date().getTime()
      } else {
        const t = new Date().getTime()
        if ((t - this.state.lastTouchTime) <= 500) {
          this.handleDblClick(e)
        } else {
          this.state.lastTouchTime = t
        }
      }
    } else if (e.touches.length === 2) {
      this.state.lastTouchTime = null
      const touches = this.state.touches
      for (const t of e.touches) {
        const [x, y] = this.getRelativePosition(t)
        touches.push({ identifier: t.identifier, x, y })
      }
      this.state.lastDistance = this.getDistance(touches[0].x, touches[0].y, touches[1].x, touches[1].y)
    }
  }
  
  handleTouchEnd (e: TouchEvent) {
    this.state.touches = []
    this.state.lastDistance = null
    this.handleMouseLeave()
  }
  
  handleTouchMove (e: TouchEvent) {
    e.preventDefault()
    if (e.touches.length === 1) {
      this.state.cursorPos = e.touches[0]
      const [x, y] = this.getRelativePosition(e.touches[0])
      this.executeCallback('move', [
        this.dataUtils.xValueFromPos(x),
        this.dataUtils.yValueFromPos(y)
      ])
    } else if (e.touches.length === 2) {
      const touches = this.state.touches
      const cur = []
      for (const t of e.touches) {
        const [x, y] = this.getRelativePosition(t)
        cur.push({ identifier: t.identifier, x, y })
      }
      const ang = this.getAngle(cur[0].x, cur[0].y, cur[1].x, cur[1].y)
      const dist = this.getDistance(cur[0].x, cur[0].y, cur[1].x, cur[1].y)
      const currDelta = dist - this.state.lastDistance
      const [panX, panY] = this.getPanning(touches[0].x, touches[0].y, touches[1].x, touches[1].y, touches[0].x, cur[0].y, cur[1].x, cur[1].y)
      if (Math.abs(currDelta) > 40) {
        if ((ang > 45 && ang < 135) || (ang > 225 && ang < 315)) {
          this.pinchY(currDelta)
        } else {
          this.pinchX(currDelta)
        }
        this.state.touches = cur
        this.state.lastDistance = dist
      } else if (Math.abs(panX) > 20) {
        this.state.touches = cur
        this.state.lastDistance = dist
        const valueDeltaX = this.dataUtils.xValueFromPos(0) - this.dataUtils.xValueFromPos(panX)
        this.executeCallback('xRangeChange', [
          this.dataUtils.start + valueDeltaX,
          this.dataUtils.end + valueDeltaX
        ])
      } else if (Math.abs(panY) > 20) {
        this.state.touches = cur
        this.state.lastDistance = dist
        const valueDeltaY = this.dataUtils.yValueFromPos(0) - this.dataUtils.yValueFromPos(panY)
        this.executeCallback('yRangeChange', [
          this.dataUtils.yMin - valueDeltaY,
          this.dataUtils.yMax - valueDeltaY
        ])
      }
    }
  }

  pinchX (level: number) {
    const ratio = 0.1 * (this.dataUtils.end - this.dataUtils.start)
    const sign = Math.sign(level)
    this.executeCallback('xRangeChange', [
      this.dataUtils.start + sign * ratio,
      this.dataUtils.end - sign * ratio
    ])
  }

  pinchY (level: number) {
    const ratio = 0.1 * (this.dataUtils.yMax - this.dataUtils.yMin)
    const sign = Math.sign(level)
    this.executeCallback('yRangeChange', [
      this.dataUtils.yMin + sign * ratio,
      this.dataUtils.yMax - sign * ratio
    ])
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

 clearSelection () {
    if (window.getSelection) {
      const sel = window.getSelection()
      sel.removeAllRanges()
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