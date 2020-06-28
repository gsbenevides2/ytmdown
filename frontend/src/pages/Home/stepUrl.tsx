import React from 'react'

import { MDCTextField } from '@material/textfield'
import { Fab } from '@rmwc/fab'
import { LinearProgress } from '@rmwc/linear-progress'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import Input from '../../components/Input'
import { useContext } from '../../context'
import api from '../../services/api'

interface FormValues {
  url:string
}

interface ApiMusicResponse{
  album:string;
  artist:string;
  cover:string;
  id:number;
  title:string;
}

interface ApiVideoResponse{
  searchTerm:string;
  musics:Array<ApiMusicResponse>;
}

const StepUrl:React.FC = () => {
  const [loading, setLoading] = React.useState(false)
  const formRef = React.useRef<FormHandles>(null)
  const { data, setData } = useContext()

  function handleSubmit (values:FormValues) {
    setLoading(true)
    api.get<ApiVideoResponse>('/video', {
      params: values
    })
      .then(response => {
        setData({
          ...data,
          ...response.data,
          step: 'albumList',
          url: values.url

        })
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        setData({
          ...data,
          snackbar: 'Ops ocorreu um erro, verifique o link e tente novamente.',
          openSnackbar: true
        })
      })
  }
  function handleClipaboardPaste () {
    navigator.clipboard.readText()
      .then(text => {
        if (formRef && formRef.current) {
          formRef.current.setFieldValue('url', text)
        }
      })
      .catch(error => {
        console.error(error)
        setData({
          ...data,
          snackbar: 'Ops ocorreu um erro, verifique as permissões e tente novamente.',
          openSnackbar: true
        })
      })
  }

  function loadUrlFromShareTarget () {
    const url = new URL(window.location.href)
    if (url.searchParams.has('text')) {
      const text = url.searchParams.get('text')
      if (formRef && formRef.current) {
        formRef.current.setFieldValue('url', text)
        const tf = document.getElementsByClassName('mdc-text-field')[0]
        MDCTextField.attachTo(tf)
      }
    }
  }

  React.useEffect(loadUrlFromShareTarget, [])
  return (
    <>
      <LinearProgress
        style={{ opacity: loading ? 1 : 0 }}/>
      <Form
        initialData={{
          url: data.url
        }}
        ref={formRef}
        onSubmit={handleSubmit}>
        <div className="page">
          <Input
            required
            trailingIcon={{
              icon: 'content_paste',
              onClick: handleClipaboardPaste
            }}
            label='Insira a url:'
            onKeyUp={(event) => {
              if (event.keyCode === 13 && formRef.current) {
                formRef.current.submitForm()
              }
            }}
            name='url' />
        </div>
        <Fab
          type='submit'
          icon='send'
        />
      </Form>
    </>
  )
}

export default StepUrl
