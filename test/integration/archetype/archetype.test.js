// 'use strict'
//
// const assert = require('assert')
// const FabrixApp = require('@fabrix/fabrix').FabrixApp
// const RouterSpool = require('@fabrix/spool-router').RouterSpool
// const SequelizeSpool = require('@fabrix/spool-sequelize').SequelizeSpool
// const EventsSpool = require('../../../dist/EventsSpool').EventsSpool
// const archetype = require('../../../dist/archetype/config/events').events
//
// describe('Archetype', () => {
//   let app
//   before(() => {
//     app = new FabrixApp({
//       config: {
//         main: {
//           spools: [
//             RouterSpool,
//             SequelizeSpool,
//             EventsSpool
//           ]
//         },
//         routes: {},
//         events: archetype
//       },
//       api: {},
//       pkg: {}
//     })
//
//     return app.start().catch(app.stop)
//   })
//
//   describe('#archetype should work', () => {
//     it('should have been added', () => {
//       assert(app.spools['events'])
//     })
//   })
//
//   after(() => {
//     app.stop()
//   })
// })
