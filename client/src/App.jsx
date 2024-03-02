import { Button, FileInput } from 'flowbite-react'
import React, { useState } from 'react'
import { server } from './server'
import axios from 'axios'
import { toast } from 'react-toastify'

function App() {
  const [file, setFile] = useState(null)

  const handleChange = (e) => {
    const file = e.target.files[0]
    setFile(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newFile = new FormData()
    newFile.append("file", file)
    await axios.post(`${server}/upload`, newFile, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        toast.success("File upload successfully")
      })
      .catch((err) => {
        toast.error('Upload failed')
      })
  }

  return (
    <div>
      <div className="p-3 max-w-3xl mx-auto min-h-screen my-16">
        <h1 className='text-3xl font-bold lg:text-4xl text-center text-blue-950'>File Upload</h1>
        <form className='flex flex-col justify-center mt-10 border border-slate-300 p-20' onSubmit={handleSubmit}>
          <FileInput type='file' accept='application/pdf' onChange={handleChange} required />
          <Button type='submit' gradientDuoTone="cyanToBlue" outline className='mt-4 max-w-20 sm:ml-64 ml-32'>Upload</Button>
        </form>
      </div>
    </div>
  )
}

export default App