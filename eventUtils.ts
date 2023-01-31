import DataUtils from './dataUtils'

export default class EventUtils {

  element: HTMLElement;
  dataUtils: DataUtils;
  handler: Record<string, (e: any) => void>;
  registered: Record<string, ((e:any) => void)[]>;
  state: Record<string, any>;

  constructor (element: HTMLElement, dataUtils: DataUtils) {
    this.element = element
    this.dataUtils = dataUtils
    this.handler = {
      'mouseleave': (e: MouseEvent) => this.handleMouseLeave(e),
      'mousemove': (e: MouseEvent) => this.handleMouseMove(e),
      'mousedown': (e: MouseEvent) => this.handleMouseDown(e),
      'mouseup': (e: MouseEvent) => this.handleMouseUp(e),
      'dblclick': (e: MouseEvent) => this.handleDblClick(e),
      'wheel': (e: WheelEvent) => this.handleWheel(e),
      'touchstart': (e: TouchEvent) => this.handleTouchStart(e),
      'touchend': (e: TouchEvent) => this.handleTouchEnd(e),
      'touchmove': (e: TouchEvent) => this.handleTouchMove(e),
      'keydown': (e: KeyboardEvent) => this.handleKeyDown(e),
      'keyup': (e: KeyboardEvent) => this.handleKeyup(e)
    }
    for (const [eventName, callback] of Object.entries(this.handler)) {
      element.addEventListener(eventName, callback)
    }
    this.registered = {
      active: [],
      move: [],
      xRangeChange: [],
      yRangeChange: []
    }
    this.state = {
      active: false,
      mouseDownPos: null
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
      const deltaX = this.state.mouseDownPos[0] - x
      if (Math.abs(deltaX) > 5) {
        // MARKER
        const valueDeltaX = this.dataUtils.xValueFromPos(this.state.mouseDownPos[0]) - this.dataUtils.xValueFromPos(x)
        console.log(valueDeltaX)
        
        // this.executeCallback('xRangeChange', [
        //   this.dataUtils.start + valueDeltaX,
        //   this.dataUtils.end + valueDeltaX
        // ])
      }
    } else {
      this.executeCallback('move', [
        this.dataUtils.xValueFromPos(x),
        this.dataUtils.yValueFromPos(y)
      ])
    }
  }

  handleMouseDown (e: MouseEvent) {
    console.log('mouseDown')
    this.state.mouseDownPos = this.getRelativePosition(e)
  }

  handleMouseUp (e: MouseEvent) {
    this.state.mouseDownPos = null
  }

  handleDblClick (e: MouseEvent) {
    this.executeCallback('xRangeChange', this.dataUtils.dataRange())
  }

  handleWheel (e: WheelEvent) {

  }

  handleTouchStart (e: TouchEvent) {

  }

  handleTouchEnd (e: TouchEvent) {

  }

  handleTouchMove (e: TouchEvent) {

  }

  handleKeyDown (e: KeyboardEvent) {

  }

  handleKeyup (e: KeyboardEvent) {

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

}