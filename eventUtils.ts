export default class EventUtils {

  handler: Record<keyof HTMLElementEventMap, (e: any) => void>;

  constructor (element: HTMLElement) {
    this.handler = {
      'mousenter': (e: MouseEvent) => this.handleMouseEnter(e),
      'mouseleave': (e: MouseEvent) => this.handleMouseLeave(e),
      'mousemove': (e: MouseEvent) => this.handleMouseMove(e),
      'click': (e: MouseEvent) => this.handleClick(e),
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
  }

  handleMouseEnter (e: MouseEvent) {

  }

  handleMouseLeave (e: MouseEvent) {

  }

  handleMouseMove (e: MouseEvent) {

  }

  handleClick (e: MouseEvent) {

  }

  handleDblClick (e: MouseEvent) {

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

}