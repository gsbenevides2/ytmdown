import React from 'react'

import {
  TextField,
  TextFieldProps
} from '@rmwc/textfield'
import { useField } from '@unform/core'
type OtherProps = TextFieldProps & JSX.IntrinsicElements['input']

interface Props extends OtherProps{
  name:string;
}

const Input:React.FC<Props> = props => {
  const { name, ...rest } = props
  const inputRef = React.useRef(null)

  const {
    registerField,
    fieldName,
    defaultValue
  } = useField(name)

  React.useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])
  return (
    <TextField
      {...rest}
      defaultValue={defaultValue}
      inputRef={inputRef}
    />
  )
}

export default Input
