import React from 'react'

import { Button } from '@rmwc/button'
import { TabBar, Tab } from '@rmwc/tabs'

import { useContext } from '../../context'

const StepLyrics:React.FC = () => {
  const [activeTab, setActiveTab] = React.useState(0)

  const { data, setData } = useContext()

  function handleToDownload (lyrics:boolean, translation:boolean) {
    setData({
      ...data,
      lyricsAproved: {
        lyrics, translation
      },
      step: 'download'
    })
  }

  return (
    <>
      <TabBar
        activeTabIndex={activeTab}
        onActivate={evt => setActiveTab(evt.detail.index)}>
        <Tab>Original</Tab>
        {data.lyrics?.translation &&
    <Tab>Tradução</Tab>
        }
      </TabBar>
      <div className='page'>
        <p style={{
          textAlign: 'center'
        }}>
          {
            activeTab === 0
              ? data.lyrics?.lyrics.split('\n').map((item, key) => (
                <React.Fragment key={key}>{item}<br/></React.Fragment>
              ))
              : data.lyrics?.translation.split('\n').map((item, key) => (
                <React.Fragment key={key}>{item}<br/></React.Fragment>
              ))
          }
        </p>
        {data.lyrics?.translation &&
        <Button onClick={() => handleToDownload(true, true)} label='Continuar com letra e tradução'/>
        }
        <Button onClick={() => handleToDownload(true, false)} label='Continuar com letra'/>
        <Button onClick={() => handleToDownload(false, false)} label='Continuar sem letra nenhuma'/>
      </div>
    </>
  )
}

export default StepLyrics
