import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Checkbox, Button } from 'flowbite-react';
import { server } from '../server';
import axios from 'axios'

const PdfViewer = ({ pdfFile, res }) => {
  const [numPages, setNumPages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedPages, setSelectedPages] = useState([]);
  const [newPdf, setNewPdf] = useState(null);

  console.log(newPdf);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(Array.from({ length: numPages }, (_, i) => i + 1));
  }

  const handleSelectedPage = (e, index) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedPages([...selectedPages, index]);
    } else {
      setSelectedPages(selectedPages.filter((page) => page !== index));
    }
  };

  const handleCreatePDF = async () => {
    const response = await axios.get(`${server}/create-pdf?filePath=F:/MERN/Vidyalai/Task/server/uploads/${res}&pages=${selectedPages}`);
    setNewPdf(response.data);
  };

  const handleDownload = () => {
    if (newPdf) {
      const url = window.URL.createObjectURL(new Blob([newPdf], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = 'newPdf.pdf';
      link.click();
      window.URL.revokeObjectURL(url);
    }
  };


  return (
    <div>
      <p className='mb-3'>
        Page {pageNumber} of {numPages.length}
      </p>
      <div className="bg-gray-300 p-10">
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
          {numPages.map((page, index) => (
            <div key={index}>
              <Checkbox
                type='checkbox'
                className='mb-2 mt-2'
                onChange={(e) => handleSelectedPage(e, index)}
              />
              <Page
                pageNumber={page}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </div>
          ))}
        </Document>
      </div>
      <Button className='mt-10' onClick={handleCreatePDF}>
        Create new Pdf
      </Button>
      {newPdf &&
        <Button className='mt-10' onClick={handleDownload}>Download</Button>
      }
    </div>
  );
};

export default PdfViewer;