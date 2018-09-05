import * as joi from 'joi'
export const routes = {
  '/events': {
    'GET': 'EventController.findAll',
    config: {
      prefix: 'events.prefix',
      validate: {
        query: {
          offset: joi.number(),
          limit: joi.number(),
          where: joi.object(),
          sort: joi.array().items(joi.array()),
        }
      },
      app: {
        permissions: {
          resource_name: 'apiGetEventsRoute',
          roles: ['admin']
        }
      }
    }
  },
  '/event': {
    'POST': 'EventController.create',
    config: {
      prefix: 'events.prefix',
      app: {
        permissions: {
          resource_name: 'apiPostEventRoute',
          roles: ['admin']
        }
      }
    }
  },
  '/event/:id': {
    'GET': 'EventController.findOne',
    config: {
      prefix: 'events.prefix',
      validate: {
        params: {
          id: joi.string().required()
        }
      },
      app: {
        permissions: {
          resource_name: 'apiGetEventIdRoute',
          roles: ['admin']
        }
      }
    }
  }
}
