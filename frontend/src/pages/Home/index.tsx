import React from 'react'

import { useContext } from '../../context'
import StepAlbumList from './stepAlbumList'
import StepDownload from './stepDownload'
import StepLyrics from './stepLyrics'
import StepMusic from './stepMusic'
import StepUrl from './stepUrl'

const Home:React.FC = () => {
  const { data } = useContext()

  if (data.step === 'url') {
    return <StepUrl/>
  } else if (data.step === 'albumList') {
    return <StepAlbumList/>
  } else if (data.step === 'music') {
    return <StepMusic/>
  } else if (data.step === 'lyrics') {
    return <StepLyrics/>
  } else if (data.step === 'download') {
    return <StepDownload/>
  } else {
    return <h1>Ola</h1>
  }
}

export default Home
