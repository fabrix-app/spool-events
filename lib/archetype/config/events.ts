/**
 * Events Configuration
 *
 * @see {@link http://
 */
export const events = {
  /**
   * If transactions are production
   */
  live_mode: process.env.LIVE_MODE || true,

  /**
   * If every event should be saved automatically in the database
   */
  auto_save: process.env.AUTO_SAVE || false,

  /**
   * If Events are enabled
   */
  // enabled: process.env.EVENTS_ENABLED || true,

  /**
   * Set profile to subscribe to events, in the matching profile (engine.<type>.profiles).
   * If process.env.PROFILE does not match a profile, the application will not subscribe to any events
   */
  profile: process.env.EVENTS_PROFILE,
  /**
   * Whether to run the subscribe method on every Event class
   */
  auto_subscribe: true,
  /**
   * Define worker profiles. Each profile of a given type listens for the
   * "events" defined in its profile below. The event names represent an Event
   * defined in api.events.
   * You can set these per environment in config/env
   * events: { profiles: ... }
   */
  profiles: {}
}
