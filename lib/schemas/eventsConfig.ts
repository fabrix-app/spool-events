import * as joi from 'joi'

export const eventsConfig = joi.object().keys({
  prefix: joi.string().allow('', null),
  live_mode: joi.boolean().required(),
  auto_save: joi.boolean().required(),
  profile: joi.string().allow(null).required(),
  enabled: joi.boolean().allow(null),
  auto_subscribe: joi.boolean(),
  profiles: joi.object().pattern(/^/, joi.array().items(joi.string().regex(/(.+)\.(.+)/)))
})
