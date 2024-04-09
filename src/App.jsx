  import ModelsCanvas from './components/ModelsCanvas';
  import { useCallback, useState } from 'react';
  import {useDropzone} from 'react-dropzone'
import Menu from './components/Menu';
import DragDropArea from './components/DragDropArea';

  function App() {
    const [fileContent, setFileContent] = useState(null);
    // const [isDragActive, setIsDragActive] = useState(false);

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
        className="flex h-full relative"
      >
        <DragDropArea handleFileRead={handleFileRead} fileContent={fileContent} />


        {/* { (!fileContent || isDragActive) && <DragDropArea handleFileRead={handleFileRead} fileContent={fileContent} />} */}
        {/* { !isDragActive && <ModelsCanvas className="canvas" fileContent={fileContent} />} */}
        <Menu handleOnChange={handleOnChange} />
      </div>
      </>
    );
  }
  export default App
