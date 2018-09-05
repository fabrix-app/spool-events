/**
 * Events Configuration
 *
 * @see {@link https://}
 */
export const events = {
  prefix: null,
  live_mode: true,
  enabled: true,
  auto_save: false,
  auto_subscribe: true,
  profile: process.env.EVENTS_PROFILE || null,
  profiles: {}
}
