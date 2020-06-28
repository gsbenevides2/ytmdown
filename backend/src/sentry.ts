import * as Sentry from '@sentry/node'

Sentry.init({
  dsn: process.env.SENTRY
})

export default Sentry
