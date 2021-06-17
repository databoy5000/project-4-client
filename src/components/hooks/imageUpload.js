import React from 'react'

// ? Accessing cloudinary upload URL and upload preset from env file
const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

function ImageUpload({ onUpload }) {
  const [image, setImage] = React.useState(null)

  // ? Below is from the docs, not React. 
  // ? Can play around with styling
  // ? Can update 'sources' to take a URL or from INstagram (see docs)
  // ? Can also take mulitple images - again see docs
  
  function handleUpload() {
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: uploadUrl,
          uploadPreset,
          sources: ['local'],
          multiple: false,
        },
        (err, result) => {
          if (err) console.log(err)
          if (result.event === 'success') {
            setImage(result.info.url)
            onUpload(result.info.url)
          }
        }
      )
      .open()
  }

  // ? On render, if there is an image it will display the image, if not then the button
  // ? shows until the image is uploaded. Image is returned to user before they submit form
  // ? On upload, it uploads to Cloudianry and returns URL to our app to use
  return (
    <>
      {image && <img src={image} alt="uploaded image"/>}
      {!image && <button onClick={handleUpload} className="button is-info is-fullwidth" type="button">Upload Image</button>}
    </>
  )
}

export default ImageUpload