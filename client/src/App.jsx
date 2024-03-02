import { Button, FileInput, Label } from 'flowbite-react'
import React from 'react'

function App() {
  return (
    <div>
      <div className="p-3 max-w-3xl mx-auto min-h-screen my-20">
        <h1 className='text-3xl font-bold lg:text-4xl text-center text-blue-950'>File Upload</h1>
        <form className='flex flex-col justify-center mt-20'>
          <FileInput type='file' accept='pdf/*'/>
          <Button gradientDuoTone="cyanToBlue" outline className='mt-4 max-w-32 sm:ml-80 ml-40'>Upload</Button>
        </form>
      </div>
    </div>
  )
}

export default App