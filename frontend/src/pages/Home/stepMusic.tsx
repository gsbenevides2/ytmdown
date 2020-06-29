import React from 'react'

import { Card, CardMedia, CardActions, CardActionIcons, CardActionButton } from '@rmwc/card'
import { LinearProgress } from '@rmwc/linear-progress'
import { Form } from '@unform/web'

import Input from '../../components/Input'
import { useContext } from '../../context'
import api from '../../services/api'

interface FormValues{
  album:string;
  artist:string;
  title:string;
  number:number;
  year:number
}

const StepMusic:React.FC = () => {
  const [loading, setLoading] = React.useState(false)
  const { data, setData } = useContext()
  const { music } = data
  function handleSubmit (values:FormValues) {
    setLoading(true)
    api.get('/lyrics', {
      params: {
        musicName: values.title,
        artist: values.artist
      }
    }).then((response) => {
      setLoading(false)
      setData({
        ...data,
        music: {
          cover: music?.cover || '',
          ...values
        },
        lyrics: response.data,
        step: 'lyrics'
      })
    }).catch((err) => {
      setLoading(false)
      if (err.request.status === 400) {
        setData({
          ...data,
          music: {
            cover: music?.cover || '',
            ...values
          },
          step: 'download'
        })
      } else {
        setData({
          ...data,
          snackbar: 'Ops ocorreu um erro, tente novamente mais tarde.',
          openSnackbar: true
        })
      }
    })
  }
  return (
    <>
      <LinearProgress
        style={{ opacity: loading ? 1 : 0 }}/>
      <Form
        initialData={{
          title: music?.title,
          artist: music?.artist,
          album: music?.album,
          year: music?.year,
          number: music?.number
        }}
        className='page'
        onSubmit={handleSubmit}>
        <Card>
          <CardMedia
            style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '250px',
              backgroundImage: `url(${music?.cover})`
            }}
            square/>
          <div style={{
            padding: '12px'
          }}>
            <Input
              label='Nome da Música:'
              name='title'/>
            <Input
              label='Nome do Artista:'
              name='artist'/>
            <Input
              label='Albúm:'
              name='album'/>
            <Input
              label='Ano:'
              name='year'/>
            <Input
              label='Número da Faixa:'
              name='number'/>
          </div>
          <CardActions>
            <CardActionIcons>
              <CardActionButton type='submit'>Continuar</CardActionButton>
            </CardActionIcons>
          </CardActions>
        </Card>
      </Form>
    </>
  )
}

export default StepMusic
