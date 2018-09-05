/* eslint no-console: [0] */
'use strict'

const joi = require('joi')
import { eventsConfig } from './schemas'

export const Validator = {

  // Validate events Config
  validateEventsConfig (config) {
    return new Promise((resolve, reject) => {
      joi.validate(config, eventsConfig, (err, value) => {
        if (err) {
          return reject(new TypeError('config.events: ' + err))
        }
        return resolve(value)
      })
    })
  }
}
