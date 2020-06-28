import React from 'react'

import { Snackbar } from '@rmwc/snackbar'

import '@rmwc/snackbar/styles'
import { useContext } from '../../context'

const SnackbarElement:React.FC = () => {
  const { data } = useContext()

  return (
    <Snackbar
      open={data.openSnackbar}
      message={data.snackbar}
    />
  )
}

export default SnackbarElement
