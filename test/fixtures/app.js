/* eslint new-cap: [0]*/
'use strict'

const _ = require('lodash')
const smokesignals = require('smokesignals')
const fs = require('fs')
const Model = require('@fabrix/fabrix/dist/common').FabrixModel
const Event = require('../../dist/index').Event
const SequelizeResolver = require('@fabrix/spool-sequelize').SequelizeResolver

const App = {
  api: {
    models: {
      // Event: require('../dist/api/models/Event').Event,
      // EventItem: require('../dist/api/models/EventItem').EventItem,
      // EventSubscriber: require('../dist/api/models/EventSubscriber').EventSubscriber,
      Item: class Item extends Model {
        static config(app, Sequelize) {
          return {
            options: {}
          }
        }
        static schema(app, Sequelize) {
          return {
            name: {
              type: Sequelize.STRING,
              allowNull: false
            }
          }
        }
        static get resolver() {
          return SequelizeResolver
        }
      }
    },
    events: {
      onAutoTestEvent: class onAutoTestEvent extends Event {
        subscribe() {
          console.log('I AM AUTOMATICALLY SUBSCRIBING...', !!this.app)
          this.app.services.EventsService.subscribe('onAutoTestEvent.test','test', this.test)
          this.app.services.EventsService.subscribe('onAutoTestEvent.test2','test2', this.test2)
        }
        test(msg, data, options) {
          console.log('test: I SUBSCRIBED AUTOMATICALLY', msg, data, options)
          return options.done ? options.done() : true
        }
        test2(msg, data, options) {
          console.log('test2: I SUBSCRIBED AUTOMATICALLY TOO', msg, data, options)
          return options.done ? options.done() : true
        }
      },
      onTestEvent: class onTestEvent extends Event {
        test3(msg, data, options) {
          console.log('test: I WAS PROFILE SUBSCRIBED', msg, data, options)
          return options.done ? options.done() : true
        }
        test4(msg, data, options) {
          console.log('test2: I WAS PROFILE SUBSCRIBED TOO', msg, data, options)
          return options.done ? options.done() : true
        }
      },
      onNotTestEvent: class onNotTestEvent extends Event {
        test5(msg, data, options) {
          console.log('I WAS TESTED and should not have been', msg, data, options)
          const err = new Error('I am not subscribed')
          return options.done ? options.done(err) : true
        }
        test6(msg, data, options) {
          console.log('I WAS TESTED TOO and should not have been', msg, data, options)
          const err = new Error('I am not subscribed')
          return options.done ? options.done(err) : true
        }
      }
    },
    services: require('../../dist/api/services/index')
  },
  pkg: {
    name: 'spool-events-test',
    version: '1.0.0'
  },
  config: {
    stores: {
      sequelize: {
        orm: 'sequelize',
        database: 'Sequelize',
        host: '127.0.0.1',
        dialect: 'postgres',
        migrate: 'drop'
      }
    },
    models: {
      defaultStore: 'sequelize',
      migrate: 'drop'
    },
    routes: {},
    main: {
      spools: [
        require('@fabrix/spool-router').RouterSpool,
        require('@fabrix/spool-sequelize').SequelizeSpool,
        require('@fabrix/spool-express').ExpressSpool,
        require('../../dist/index').EventsSpool
      ]
    },
    policies: {},
    log: {
      logger: new smokesignals.Logger('debug')
    },
    web: {
      express: require('express'),
      middlewares: {
        order: [
          'static',
          'addMethods',
          'cookieParser',
          'session',
          'bodyParser',
          'methodOverride',
          'router',
          'www',
          '404',
          '500'
        ],
        static: require('express').static('test/static')
      }
    },
    // Generics
    generics: {},
    // Events
    events: {
      live_mode: true,
      auto_save: false,
      // enabled: true,
      auto_subscribe: true,
      profile: 'testProfile',
      profiles: {
        testProfile: [
          'onTestEvent.test3',
          'onTestEvent.test4'
        ],
        otherProfile: [
          'onTestEvent.test'
        ]
      }
    }
  }
}

_.defaultsDeep(App, smokesignals.FailsafeConfig)
module.exports = App
