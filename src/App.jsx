import ModelsCanvas from './components/ModelsCanvas';
import { useCallback, useState } from 'react';
import {useDropzone} from 'react-dropzone'

function App() {
  const [fileContent, setFileContent] = useState(null);

  const handleOnChange = (e) => {

    const file = e.target.files[0];
    const reader = new FileReader();
    console.log(reader);
    reader.onload = (event) => {
      const result = event.target.result;
      setFileContent(result);
      console.log(result);
    }

    reader.readAsDataURL(file);
  };

  // const onDrop = useCallback(acceptedFiles => {
  //   // Do something with the files
  //   const file = acceptedFiles[0];
  //   console.log(file);
  //   const reader = new FileReader();
  //   console.log(reader);
  //   reader.onload = (event) => {
  //     const result = event.target.result;
  //     setFileContent(result);
  //     console.log(result);
  //   }

  //   reader.readAsDataURL(file);
  // }, []);

  const handleFileRead = (event) => {
    const result = event.target.result;
    setFileContent(result);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = handleFileRead;
    reader.readAsDataURL(file);
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: {"model/gltf-binary":['.glb', '.gltf'],}});

  return (
    <>
    <div
      className="flex h-full"
    >
      <div  {...getRootProps()}>
        <input {...getInputProps()} />
          {
            isDragActive ? (
              <p>Drop the files here ...</p>) :
              (<p>Drag 'n' drop some files here, or click to select files</p>)
          }
          {(!fileContent || isDragActive) && (
            <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "rgba(0, 0, 0, 0.5)",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              zIndex: "9999",
            }}
            >Drag and drop your 3D model</div>
          )}
      </div>
      <ModelsCanvas className="canvas" fileContent={fileContent} />
      <div className='bg-black text-white p-5 text-center'>
        Drag and drop gltf or glb file here
        <input type="file" name="modelUploaded" accept='.gltf, .glb' onChange={handleOnChange} />
      </div>
    </div>
    </>
  );
}

// const canvas = document.querySelector(".canvas");
// canvas.addEventListener('dragenter', () => this.app.showDropDownOverlay = true);
// canvas.addEventListener('dragleave', () => this.app.showDropDownOverlay = false);
export default App
