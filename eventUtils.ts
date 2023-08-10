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
      touches: []
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

  handleDblClick (e: MouseEvent) {
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

  handleTouchStart (e: TouchEvent) {
    e.preventDefault()
    console.log('touchstart', e)
    if (this.state.active === false) {
      this.state.active = true
      this.executeCallback('active', true)
    }
    for (const touch of e.changedTouches) {
      this.state.touches.push({
        identifier: touch.identifier,
        clientX: touch.clientX,
        clientY: touch.clientY
      })
    }
    if (this.state.touches.length === 1) {
      this.state.cursorPos = e.changedTouches[0]
      const [x, y] = this.getRelativePosition(this.state.touches[0])
      this.executeCallback('move', [
        this.dataUtils.xValueFromPos(x),
        this.dataUtils.yValueFromPos(y)
      ])
    }
  }
  
  handleTouchEnd (e: TouchEvent) {
    e.preventDefault()
    console.log('touchend', e)
    for (const touch of e.changedTouches) {
      const corresponding = this.state.touches.filter(x => x.identifier === touch.identifier)
      for (const curr of corresponding) {
        this.state.touches.splice(this.state.touches.indexOf(curr), 1)
      }
    }
    if (this.state.touches.length === 0) {
      console.log('leave')
      this.handleMouseLeave()
    }
  }
  
  handleTouchMove (e: TouchEvent) {
    e.preventDefault()
    // console.log('touchmove', e)
    if (e.touches.length === 1) {
      const touch = e.changedTouches[0]
      this.state.cursorPos = {
        pageX: touch.pageX,
        pageY: touch.pageY
      }
      const [x, y] = this.getRelativePosition(touch)
      this.executeCallback('move', [
        this.dataUtils.xValueFromPos(x),
        this.dataUtils.yValueFromPos(y)
      ])
    } else if (e.touches.length  === 2) {
      const touches = []
      let updateX = false
      let updateY = false
      for (const touch of e.touches) {
        const corresponding = this.state.touches.find(x => x.identifier === touch.identifier)
        touches.push({
          id: touch.identifier,
          x1: corresponding != null ? corresponding.clientX : touch.clientX,
          y1: corresponding != null ? corresponding.clientY : touch.clientY,
          x2: touch.clientX,
          y2: touch.clientY
        })
      }
      const pinchX = Math.min(2, Math.abs(touches[1].x1 - touches[0].x1) / Math.abs(1 + touches[1].x2 - touches[0].x2))
      const pinchY = Math.min(2, Math.abs(touches[1].y1 - touches[0].y1) / Math.abs(1 + touches[1].y2 - touches[0].y2))
      const panX = ((touches[0].x2 - touches[0].x1) + (touches[1].x2 - touches[1].x1)) / 2
      const panY = ((touches[0].y2 - touches[0].y1) + (touches[1].y2 - touches[1].y1)) / 2
      // console.log({ pinchX, pinchY, panX, panY })
      if (Math.abs(pinchX - 1) > 0.2) {
        updateX = true
        console.log('pinch x', pinchX)
        this.pinchX(pinchX)
      }
      if (Math.abs(pinchY - 1) > 0.2) {
        updateY = true
        console.log('pinch y', pinchY)
        this.pinchY(pinchY)
      }
      if (Math.abs(panX) > SELECT_THRESHOLD) {
        updateX = true
        console.log('pan x', panX)
      }
      if (Math.abs(panY) > SELECT_THRESHOLD) {
        updateY = true
        console.log('pan y', panY)
      }
      for (const touch of e.touches) {
        const corresponding = this.state.touches.find(x => x.identifier === touch.identifier)
        if (corresponding != null) {
          if (updateX) {
            corresponding.clientX = touch.clientX
          }
          if (updateY) {
            corresponding.clientY = touch.clientY
          }
        }
      }
    }
  }

  pinchX (level: number) {
    const halfSpan = (this.dataUtils.end - this.dataUtils.start) / 2
    const center = this.dataUtils.start + halfSpan
    const [xMin, xMax] = this.dataUtils.xRange()
    this.executeCallback('xRangeChange', [
      Math.max(xMin, center - level * halfSpan),
      Math.min(xMax, center + level * halfSpan)
    ])
  }

  pinchY (level: number) {
    const halfSpan = (this.dataUtils.yMax - this.dataUtils.yMin) / 2
    const center = this.dataUtils.yMin + halfSpan
    const [yMin, yMax] = this.dataUtils.yRange()
    this.executeCallback('yRangeChange', [
      Math.max(yMin, center - level * halfSpan),
      Math.min(yMax, center + level * halfSpan)
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