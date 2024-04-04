import ModelsCanvas from './components/ModelsCanvas';
import { useState } from 'react';

function App() {
  const [fileContent, setFileContent] = useState(null);
  // const [preview, setPreview] = useState();

  const handleOnChange = (e) => {
    // const target = e.target;
    // const files = target.files;
    // console.log(files[0]);

    // setFile(files[0])

    // const file = new FileReader;
    // file.onload = function() {
    //   setPreview(file.result);
    //   console.log(file.result);
    // }
    // file.readAsDataURL(files[0])

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

  return (
    <>
    <div
      className="flex h-full"
    >
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
