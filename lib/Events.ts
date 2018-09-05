import { FabrixApp } from '@fabrix/fabrix'
import { clone } from 'lodash'
import * as sequelizeStream from 'sequelize-stream'
import { Utils } from './utils'


export const Events = {

  /**
   * configure - Configure the Events Engine
   * @param app
   */
  configure: (app) => {
    return
  },
  /**
   *
   * @param app
   */
  streamSequelize: (app: FabrixApp ) => {
    const stream = sequelizeStream(app.models['Event'].sequelize)
    // Make past tense
    const METHODS = {
      'create': 'created',
      'update': 'updated',
      'destroy': 'destroyed'
    }
    stream.on('data', (instance, event) => {
      if (instance && instance.$modelOptions && instance.$modelOptions.tableName !== 'event') {
        const object = instance.$modelOptions.tableName
        const data = instance.toJSON()
        const newEvent = {
          object: object,
          object_id: data.id,
          type: `${object}.${METHODS[event]}`,
          data: data
        }
        app.services.EventsService.publish(newEvent.type, newEvent, { save: instance.$modelOptions.autoSave })
      }
    })
  },
  /**
   *
   * @param app
   * @returns {Promise.<T>}
   */
  cancelPubSub: (app: FabrixApp) => {
    app.pubSub.clearAllSubscriptions()
    return Promise.resolve()
  },

  /**
   * copyDefaults - Copies the default configuration so that it can be restored later
   * @param app
   * @returns {Promise.<{}>}
   */
  copyDefaults: (app: FabrixApp) => {
    app.config.set('eventsDefaults', clone(app.config.get('events')))
    return Promise.resolve({})
  },

  // /**
  //  * Add Events to Engine
  //  * @param app
  //  * @returns {Promise.<{}>}
  //  */
  addEvents: (app: FabrixApp) => {
    // Subscribe to Events using the Subscribe method provided in each event
    // Then, allow the profile follow it's own pattern
    Object.keys(app.events || {}).forEach(function(key) {
      const event = app.events[key]
      if (
        event.methods && event.methods.indexOf('subscribe') > -1
        && app.config.get('events.auto_subscribe') !== false
      ) {
        event.subscribe()
        app.log.debug(`Engine auto subscribed ${ event.name }: ${event.subscribers.length} subscribers`)
      }
      // Load profile
      const profile = app.config.get('events.profile')
      if (
        app.config.get('events.profiles')
        && app.config.get('events.profiles')[profile]
      ) {
        app.config.get('events.profiles')[profile].forEach(allowed => {
          const allowedEvent = allowed.split('.')[0]
          const allowedMethod = allowed.split('.')[1]
          if (
            allowedEvent === key
            && allowedMethod
            && event.methods.indexOf(allowedMethod) > -1
          ) {
            app.services.EventsService.subscribe(allowed, allowedMethod, event[allowedMethod])
          }
        })
      }
    })

    return
  }
}
