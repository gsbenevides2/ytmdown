import React from 'react'

import {
  SimpleTopAppBar
} from '@rmwc/top-app-bar'

import { useContext } from '../../context'

const TopBar:React.FC = () => {
  const { data, setData } = useContext()

  function handleThemeIcon () {
    document.body.classList.toggle('dark')
    localStorage.setItem('dark', String(!data.theme))
    document.getElementsByName('theme-color')[0].setAttribute('content', !data.theme ? '#383838' : '#5E35B1')
    setData({
      ...data,
      theme: !data.theme
    })
  }

  const actionItems = [{
    icon: data.theme ? 'brightness_low' : 'brightness_2',
    onClick: handleThemeIcon
  }]

  return (
    <SimpleTopAppBar
      fixed
      actionItems={actionItems}
      title='YouTube Music Downloader'/>
  )
}

export default TopBar
