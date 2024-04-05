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

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    const file = acceptedFiles[0];
    console.log(file);
    const reader = new FileReader();
    console.log(reader);
    reader.onload = (event) => {
      const result = event.target.result;
      setFileContent(result);
      console.log(result);
    }

    reader.readAsDataURL(file);
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: {"model/gltf-binary":['.glb', '.gltf'],}});

  return (
    <>
    <div
      className="flex h-full"
    >
       <div {...getRootProps()}>
        <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop some files here, or click to select files</p>
          }
        </div>
      <ModelsCanvas fileContent={fileContent} handleOnChange={handleOnChange} />
      <div className='bg-black text-white p-5 text-center'>
        Drag and drop gltf or glb file here
        <input type="file" name="modelUploaded" accept='.gltf, .glb' onChange={handleOnChange} />
      </div>
    </div>
    </>
  );
};


// const canvas = document.getElementById("canvas");
// canvas.addEventListener('dragenter', () => this.app.showDropDownOverlay = true);
// canvas.addEventListener('dragleave', () => this.app.showDropDownOverlay = false);
export default App
