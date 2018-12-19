'use strict'

const assert = require('assert')
const FabrixApp = require('@fabrix/fabrix').FabrixApp
const RouterSpool = require('@fabrix/spool-router').RouterSpool
const EventsSpool = require('../../../dist/EventsSpool').EventsSpool
const archetype = require('../../../dist/archetype/config/events').events

describe('Archetype', () => {
  let app
  before(() => {
    app = new FabrixApp({
      config: {
        main: {
          spools: [
            RouterSpool,
            EventsSpool
          ]
        },
        events: archetype
      },
      api: {},
      pkg: {}
    })

    return app.start().catch(app.stop)
  })

  describe('#archetype should work', () => {
    it('should have route cors set to true', () => {
      assert(app.spools['events'])
    })
  })

  after(() => {
    app.stop()
  })
})
