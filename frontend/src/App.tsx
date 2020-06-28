import React from 'react'

import { RMWCProvider } from '@rmwc/provider'
import { ThemeProvider } from '@rmwc/theme'

import { Provider } from './context'
import Routes from './routes'
import '@rmwc/card/styles'
import '@rmwc/textfield/styles'
import '@rmwc/typography/styles'
import '@rmwc/top-app-bar/styles'
import '@rmwc/button/styles'
import '@rmwc/fab/styles'
import '@rmwc/linear-progress/styles'
import '@rmwc/tabs/styles'
import '@rmwc/theme/styles'

const App:React.FC = () => {
  const themeOptions = {
    primary: '#5e35b1',
    secondary: '#5e35b1'
  }
  return (
    <Provider>
      <ThemeProvider options={themeOptions}>
        <RMWCProvider>
          <Routes />
        </RMWCProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
