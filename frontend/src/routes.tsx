import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { TopAppBarFixedAdjust } from '@rmwc/top-app-bar'

import SnackBar from './components/Snackbar'
import TopAppBar from './components/TopAppBar'
import Home from './pages/Home'

const Routes:React.FC = () => {
  return (
    <BrowserRouter>
      <TopAppBar/>
      <TopAppBarFixedAdjust>
        <Switch>
          <Route path='/' exact component={Home}/>
        </Switch>
      </TopAppBarFixedAdjust>
      <SnackBar/>
    </BrowserRouter>
  )
}

export default Routes
