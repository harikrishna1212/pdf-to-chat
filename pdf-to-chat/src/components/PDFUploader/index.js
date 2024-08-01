import React from 'react';

function PDFUploader({ onFileUpload }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("Upto here it is working fine")
    if (file && file.type === 'application/pdf') {
      onFileUpload(file);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  return (
    <div className="pdf-uploader">
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <p>Upload your PDF here</p>
    </div>
  );
}

export default PDFUploader;