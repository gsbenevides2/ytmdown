import React from 'react'

export type DataType = {
  step:string;
  url:string;
  theme:boolean;
  snackbar?:string;
  openSnackbar:boolean;
  searchTerm:string;
  musics:Array<{
    album:string;
    artist:string;
    cover:string;
    id:number;
    title:string;
  }>;
  next?:number,
  lyrics?:{
    lyrics:string;
    translation:string;
  };
  lyricsAproved?:{
    lyrics:boolean;
    translation:boolean;
  };
  music?:{
    album:string;
    artist:string;
    title:string;
    cover:string;
    number:number;
    year:number
  }
}

type ContextType = {
  data:DataType
  setData:(data:DataType)=>void;
}

const initialData:DataType = {
  step: 'url',
  url: '',
  searchTerm: '',
  musics: [],
  theme: false,
  openSnackbar: false
}

const initialContext:ContextType = {
  data: initialData,
  setData (data) {}
}

export const Context = React.createContext<ContextType>(initialContext)

export const Provider:React.FC = (props) => {
  const [data, setData] = React.useState<DataType>(initialData)

  function load () {
    const theme = localStorage.getItem('dark')
    if (theme === 'true') {
      document.body.classList.toggle('dark')
      document.getElementsByName('theme-color')[0].setAttribute('content', '#383838')
      setData({
        ...data,
        theme: true
      })
    }
  }

  React.useEffect(load, [])
  return (
    <Context.Provider value={{ data, setData }}>
      {props.children}
    </Context.Provider>
  )
}
export function useContext ():ContextType {
  return React.useContext(Context)
}
