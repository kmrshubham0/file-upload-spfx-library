import React from 'react'

import  AttachmentControl from 'file-upload-spfx-library'
import 'file-upload-spfx-library/dist/index.css'


const addFile = (file:any) =>{
  console.log(file)
}

const App = () => {
  return <AttachmentControl context={undefined} onChange={addFile} currentFiles={[]} existingFiles={[]} viewOnlyMode={false}/>
}

export default App
