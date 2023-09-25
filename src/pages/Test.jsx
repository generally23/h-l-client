// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { createRef, useEffect, useState } from 'react';

export default function Test({ children }) {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = e => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleUpload = () => {
    // You can upload the selectedFiles to your server here
    // For demonstration purposes, we'll just log the file names
    selectedFiles.forEach(file => {
      console.log('Uploading:', file.name);
    });
  };

  const ref = createRef();

  useEffect(() => {
    // ref.current.play();
  }, []);

  return (
    <>
      <div class='links'>
        <div class='link'>Home</div>
        <div class='link'>Signup</div>
        <div class='link'>Signin</div>
        <div class='link'>Help</div>
        <div class='link'>About</div>
        <div class='link'>Ressources</div>
      </div>
    </>
    // <form onSubmit={e => e.preventDefault()}>
    //   <input name='images' type='file' multiple onChange={handleFileChange} />
    //   <button onClick={handleUpload}>Upload</button>

    //   <audio ref={ref} src='/successAlert.mp3' autoPlay></audio>

    //   {/* Display selected file names */}
    //   <div>
    //     <h2>Selected Files:</h2>
    //     <ul>
    //       {selectedFiles.map((file, index) => (
    //         <li key={index}>{file.name}</li>
    //       ))}
    //     </ul>
    //   </div>
    // </form>
  );
}
