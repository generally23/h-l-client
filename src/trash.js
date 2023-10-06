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

<Routes>
  {/* Property Routes */}
  <Route path='/'>
    {/* Test Page */}
    <Route path='test' element={<Test />} />

    {/* Home Page */}
    <Route index element={<Home />} />
    {/* Single Property Page */}
    <Route path=':propertyId' element={<PropertyDetail />} />
    {/* Create new Property Form */}
    <Route path='create' element={<CreateProperty />} />
    {/* Update Property */}
    <Route path=':propertyId/update' element={<UpdateProperty />} />

    {/* Auth Routes */}

    {/* Signup Page */}
    <Route path='signup' element={<Signup />} />

    {/* Signin Page */}
    <Route path='signin' element={<Signin />} />

    {/* Logout Page */}
    <Route path='signout' element={<Logout />} />

    {/* Forgot Password */}
    <Route path='forgot-password' element={<ForgotPassword />} />

    {/* Reset Password */}
    <Route path='reset-password/:resetToken' element={<ResetPassword />} />

    {/* Verify */}
    <Route path='verify/:verficationCode' element={<VerifyAccount />}></Route>

    {/* Account Routes */}
    <Route path='my-account'>
      {/* Account Page */}
      <Route index element={<AccountDetail />} />

      {/* Change Password */}
      <Route path='change-my-password' element={<ChangePassword />} />
    </Route>

    {/* 404 Route */}
    <Route path='*' element={<div>not found 404</div>} />
  </Route>
</Routes>;
