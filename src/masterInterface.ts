import type { EventChannelSubscription } from './types'

export default class MasterInterface {

  subscription: EventChannelSubscription;
  registered: Record<string, any>;

  constructor() {
    this.subscription = {}
    this.registered = {}
  }

  clear() {
    this.subscription = {}
    this.registered = {}
  }

  on(name: string, callback: (data?: any) => void) {
    if (this.subscription[name] == null) {
      this.subscription[name] = []
    }
    this.subscription[name].push(callback)
    return this
  }

  send(name: string, data: any) {
    if (this.subscription[name] != null) {
      for (const callback of this.subscription[name]) {
        callback.call(null, data)
      }
    }
  }

  register(name: string, obj: any) {
    // console.log(`Registering object with name "${name}"`, obj)
    if (this.registered[name] != null) {
      throw new Error(`An object is already registered with name "${name}"`)
    }
    this.registered[name] = obj
  }

  getRegistered(name: string) {
    if (this.registered[name] == null) {
      throw new Error(`No object registered with name "${name}"`)
    }
    return this.registered[name]
  }
}