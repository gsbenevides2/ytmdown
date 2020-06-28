import React from 'react'
import Lottie, { LottieProps } from 'react-lottie'

import { Button } from '@rmwc/button'
import io from 'socket.io-client'

import { useContext } from '../../context'

const errorAnimation = require('../../assets/errorAnimation.json')
const loadingAnimation = require('../../assets/loadingAnimation.json')
const successAnimation = require('../../assets/successAnimation.json')

type StatusType = {
  type:'Log' | 'Error' | 'Success';
  message:string;
}

interface SocketData {
  message:string;
}

const backendUrl = process.env.REACT_APP_BACKEND_URL as string

const Download:React.FC = () => {
  const { data } = useContext()
  const [status, setStatus] = React.useState<StatusType>({
    type: 'Log',
    message: 'Carregando...'
  })

  function load () {
    window.onbeforeunload = () => false
    const dataToDownload = {
      ...data.music,
      url: data.url,
      lyrics: data.lyricsAproved?.lyrics ? data.lyrics?.lyrics : null,
      translation: data.lyricsAproved?.translation ? data.lyrics?.translation : null
    }

    const socket = io(backendUrl)
    socket.on('Log', (socketData:SocketData) => {
      setStatus({
        ...socketData,
        type: 'Log'
      })
    })
    socket.on('Error', (socketData:SocketData) => {
      setStatus({
        ...socketData,
        type: 'Error'
      })
      socket.disconnect()
    })
    socket.on('Success', (socketData:SocketData) => {
      window.onbeforeunload = null
      setStatus({
        ...socketData,
        type: 'Success'
      })
      socket.disconnect()
    })
    socket.emit('downloadMusic', dataToDownload)
  }
  function makeDownloadUrl () {
    const url = new URL(backendUrl)
    url.pathname = `download/${status.message}.mp3`
    return url.href
  }
  React.useEffect(load, [])

  let lottieData:LottieProps
  let message:string
  if (status.type === 'Log') {
    lottieData = {
      options: {
        animationData: loadingAnimation,
        loop: true,
        autoplay: true
      },
      height: 300,
      width: 300
    }
    message = status.message
  } else if (status.type === 'Success') {
    lottieData = {
      options: {
        animationData: successAnimation,
        loop: false,
        autoplay: true
      },
      height: 300,
      width: 300
    }
    message = 'Download Concluido.'
  } else {
    lottieData = {
      options: {
        animationData: errorAnimation,
        loop: false,
        autoplay: true
      },
      height: 300,
      width: 300
    }
    message = status.message
  }
  return (
    <div className='page'>
      <Lottie {...lottieData}/>
      <h4 style={{
        textAlign: 'center'
      }}>{message}</h4>
      { status.type === 'Success' &&
      <Button
        tag='a'
        href={makeDownloadUrl()}
        label='Baixar Música' download/>
      }
      { status.type === 'Error' &&
      <Button
        onClick={load}
        label='Tentar Novamente'/>
      }
    </div>
  )
}

export default Download
