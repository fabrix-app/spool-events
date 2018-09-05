import { ExtensionSpool } from '@fabrix/fabrix/dist/common/spools/extension'
const pubSub = require('./pubSub')
import { Events } from './Events'
import { Validator } from './validator'

import * as config from './config/index'
import * as pkg from '../package.json'
import * as api  from './api/index'

export class EventsSpool extends ExtensionSpool {
  private _pubSub

  constructor(app) {
    super(app, {
      config: config,
      pkg: pkg,
      api: api
    })

    this._pubSub = pubSub

    this.extensions = {
      pubSub: {
        get: () => {
          return this.pubSub
        },
        set: (newPubSub) => {
          throw new Error('pubSub can not be set through FabrixApp, check spool-events instead')
        },
        enumerable: true,
        configurable: true
      }
    }
  }

  get pubSub () {
    return this._pubSub
  }

  /**
   * Validate Configuration
   */
  async validate () {
    const requiredSpools = ['express', 'sequelize', 'router']
    const spools = Object.keys(this.app.spools)

    if (!spools.some(v => requiredSpools.indexOf(v) >= 0)) {
      return Promise.reject(new Error(`spool-events requires spools: ${ requiredSpools.join(', ') }!`))
    }

    if (!this.app.config.get('events')) {
      return Promise.reject(new Error('No configuration found at config.events!'))
    }

    return Promise.all([
      Validator.validateEventsConfig(this.app.config.get('events'))
    ])
      .catch(err => {
        return Promise.reject(err)
      })
  }

  /**
   * Adds Routes, Policies, and Agenda
   */
  async configure () {

    return Promise.all([
      Events.configure(this.app),
      Events.copyDefaults(this.app)
    ])
  }

  /**
   * TODO document method
   */
  async initialize () {
    return Promise.all([
      // Events.init(this.app),
      // Events.streamSequelize(this.app),
      Events.addEvents(this.app)
    ])
  }

  /**
   * clear subscriptions
   */
  async unload() {
    return Promise.all([
      Events.cancelPubSub(this.app)
    ])
  }
}
