import * as Sentry from '@sentry/browser'

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY
})
