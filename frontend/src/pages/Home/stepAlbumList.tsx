import React from 'react'

import { Button } from '@rmwc/button'
import { Card, CardMedia, CardPrimaryAction } from '@rmwc/card'
import { LinearProgress } from '@rmwc/linear-progress'
import { Typography } from '@rmwc/typography'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import Input from '../../components/Input'
import { useContext } from '../../context'
import api from '../../services/api'

interface FormValues {
  searchTerm:string
}

interface ApiMusicResponse{
  musics:Array<{
    album:string;
    artist:string;
    cover:string;
    id:number;
    title:string;
  }>;
  next?:number;
}
const StepAlbumList:React.FC = () => {
  const [loading, setLoading] = React.useState(false)
  const { data, setData } = useContext()

  const formRef = React.useRef<FormHandles>(null)
  function handleSubmit (values:FormValues) {
    setLoading(true)
    api.get<ApiMusicResponse>('/musics', {
      params: values
    })
      .then(response => {
        setData({
          ...data,
          ...values,
          ...response.data,
          next: response.data.next
        })
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        setData({
          ...data,
          snackbar: 'Ops ocorreu um erro, tente novamente mais tarde.',
          openSnackbar: true
        })
      })
  }
  function handleMoreResults () {
    setLoading(true)
    api.get<ApiMusicResponse>('/musics', {
      params: {
        searchTerm: data.searchTerm,
        index: data.next
      }
    })
      .then(response => {
        setData({
          ...data,
          musics: [...data.musics, ...response.data.musics],
          next: response.data.next
        })
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        setData({
          ...data,
          snackbar: 'Ops ocorreu um erro, tente novamente mais tarde.',
          openSnackbar: true
        })
      })
  }
  function handleSelectedMusic (id:number) {
    setLoading(true)
    api.get('/music', {
      params: { id }
    })
      .then(response => {
        setData({
          ...data,
          music: response.data,
          step: 'music'
        })
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        setData({
          ...data,
          snackbar: 'Ops ocorreu um erro, tente novamente mais tarde.',
          openSnackbar: true
        })
      })
  }
  return (
    <>
      <LinearProgress
        style={{ opacity: loading ? 1 : 0 }}/>
      <div className='page'>
        {data.musics.length === 0 &&
        <Typography use='headline3' tag='h2' >
          Ops não conseguimos encontrar sua música tente digitar algo diferente:
        </Typography>
        }
        <Form
          ref={formRef}
          initialData={{ searchTerm: data.searchTerm }}
          onSubmit={handleSubmit}>
          <Input
            required
            trailingIcon={{
              icon: 'search',
              onClick: () => {
                if (formRef.current) {
                  formRef.current.submitForm()
                }
              }
            }}
            onKeyUp={(event) => {
              if (event.keyCode === 13 && formRef.current) {
                formRef.current.submitForm()
              }
            }}
            label='Buscar:'
            name='searchTerm' />
        </Form>
        <br/>
        {data.musics.map(music => (
          <Card key={music.id} style={{
            width: '100%',
            marginBottom: '10px'
          }} onClick={() => handleSelectedMusic(music.id)}>
            <CardPrimaryAction style={{
              display: 'flex',
              flexDirection: 'row'
            }}>
              <CardMedia
                square
                className='albumListCover'
                style={{
                  width: '150px',
                  backgroundImage: `url(${music.cover})`
                }}
              />
              <div style={{ padding: '12px' }}>
                <Typography use="headline6" tag="h2">
                  {music.title}
                </Typography>
                <Typography
                  use="subtitle2"
                  tag="h3"
                  theme="textSecondaryOnBackground"
                  style={{ marginTop: '1rem' }}
                >
                  {music.artist}-{music.album}
                </Typography>
              </div>
            </CardPrimaryAction>
          </Card>
        ))}
        {data.next &&
  <Button
    onClick={handleMoreResults}
    label='Mais Resultados'/>
        }
      </div>
    </>
  )
}

export default StepAlbumList
