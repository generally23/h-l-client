// const onUpload = async e => {
//     // uploaded files
//     let uploads = Array.from(e.target.files);
//     const uploadsLength = uploads.length;
//     const accepts = [];
//     const rejects = [];
//     // length of files that are uploaded past the max allowed
//     let excludesLength = uploadsLength > max ? uploadsLength - max : 0;

//     // let includesLength = uploadsLength - excludesLength;

//     for (let image of uploads.slice(0, max)) {
//       console.log(image);
//       // check if image is accepted. use (size, resolution)
//       const isAccepted = await isAcceptableImage(image);

//       // console.log(isAccepted);

//       !isAccepted ? rejects.push(image) : accepts.push(image);
//     }

//     // total length of uploaded files
//     // setUploadedFilesLength(uploadedFilesLength + uploadsLength);

//     setUploadedFilesLength(uploadsLength);

//     // total length of ignored files
//     // setIgnoredFilesLength(ignoredFilesLength + excludesLength);
//     setIgnoredFilesLength(excludesLength);

//     // all accepted files from uploads
//     // const totalAcceptsLength = acceptedFiles.length + accepts.length;

//     // all rejected files from uploads
//     // setRejectedFiles([...rejectedFiles, ...rejects]);
//     setRejectedFiles(rejects);

//     // if (totalAcceptsLength > max) {
//     //   // current accepts + new accepts === max space allowed
//     //   // calculate length of spaces rest to be filled in acceptedFiles
//     //   const boundary = max - acceptedFiles.length;
//     //   // update acceptedFiles
//     //   setAcceptedFiles([...acceptedFiles, ...accepts.slice(0, boundary)]);
//     // } else setAcceptedFiles([...acceptedFiles, ...accepts]);

//     setAcceptedFiles(accepts);
//   };

// dummy fuction
// const onUpload = e => {
//   const max = 12;
//   const filesLength = files.length;
//   let uploads = Array.from(e.target.files);
//   const uploadsLength = uploads.length;

//   uploads =
//     filesLength + uploadsLength > max
//       ? uploads.slice(0, max - filesLength)
//       : uploads;

//   uploads = uploads.filter(upload => {
//     const fileName = upload.name + upload.size;

//     if (!duplicates[fileName]) {
//       duplicates[fileName] = true;
//       return true;
//     }

//     return false;
//   });

//   setFiles(uploads);
// };
