import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import PDFUploader from './components/PDFUploader';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';
import './App.css';

// Setting the workerSrc globally to match the installed version
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js`;

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber] = useState(1);
  const [pdfText, setPdfText] = useState('');

  const onDocumentLoadSuccess = ({ numPages }) => {
    console.log("upto onDocumentLoadSuccess function code is working fine");
    setNumPages(numPages);
  };

  const handleFileUpload = (file) => {
    setPdfFile(file);
  };

  const extractTextFromPDF = async (pdf) => {
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }
    setPdfText(fullText);
  };

  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <div className="pdf-viewer">
          {pdfFile ? (
            <Document
              file={pdfFile}
              onLoadSuccess={(pdf) => {
                onDocumentLoadSuccess(pdf);
                extractTextFromPDF(pdf);
              }}
            >
              <Page pageNumber={pageNumber} />
            </Document>
          ) : (
            <PDFUploader onFileUpload={handleFileUpload} />
          )}
          {numPages && (
            <p>
              Page {pageNumber} of {numPages}
            </p>
          )}
        </div>
        <ChatInterface pdfText={pdfText} />
      </div>
    </div>
  );
}

export default App;
