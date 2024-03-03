import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Checkbox, Button } from 'flowbite-react';

const PdfViewer = ({ pdfFile }) => {
  const [numPages, setNumPages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(Array.from({ length: numPages }, (_, i) => i + 1));
  }


  return (
    <div>
      <p className='mb-3'>
        Page {pageNumber} of {numPages.length}
      </p>
      <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        {numPages.map((page, index) => (
          <>
            <Checkbox
              type='checkbox'
              className='mb-2 mt-2'
            />
            <Page
              pageNumber={page}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </>
        ))}
      </Document>
      <Button className='mt-10'>
        Create new Pdf
      </Button>
      {/* {newPdf && (
        <a href={newPdf} download="new.pdf">
          Download New PDF
        </a>
      )} */}
    </div>
  );
};

export default PdfViewer;