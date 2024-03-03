import { Button, FileInput } from 'flowbite-react'
import React, { useState } from 'react'
import { server } from './server'
import axios from 'axios'
import PdfViewer from './Components/PdfViewer';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();


function App() {
  const [file, setFile] = useState(null)
  const [pdfFile, setPdfFile] = useState(null)

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file.type === 'application/pdf') {
      setFile(file);
    } else {
      alert('Please upload a PDF file.');
    }
  }


  const showPdf = (pdf) => {
    setPdfFile(`http://localhost:7000/uploads/${pdf}`)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newFile = new FormData()
    newFile.append("file", file)
    await axios.post(`${server}/upload`, newFile, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        alert("File upload successfully")
        showPdf(res.data.file)
      })
      .catch((err) => {
        alert('Upload failed')
      })
  }

  return (
    <div className='mb-32'>
      <div className="p-3 max-w-3xl mx-auto mt-16">
        <h1 className='text-3xl font-bold lg:text-4xl text-center text-blue-950'>File Upload</h1>
        <form className='flex flex-col justify-center mt-10 border border-slate-300 p-20' onSubmit={handleSubmit}>
          <FileInput type='file' accept='application/pdf' onChange={handleChange} required />
          <Button type='submit' gradientDuoTone="cyanToBlue" outline className='mt-4 max-w-20 sm:ml-64 ml-32'>Upload</Button>
        </form>
      </div>
      <div className="mt-10 flex flex-col justify-center items-center">
        {pdfFile === null ? "" :
          <>
            <PdfViewer pdfFile={pdfFile}/>
          </>
        }
      </div>
    </div>
  )
}

export default App



