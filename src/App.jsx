import ModelsCanvas from './components/ModelsCanvas';
import FileInput from './components/FileInput';
import { useState } from 'react';

function App() {
  const [modelFile, setModelFile] = useState(null);

  const handleFileUpload = (file) => {
    setModelFile(file);
  };

  return (
    <>
    <div className="flex h-full">
      <ModelsCanvas modelFile={modelFile} />
      {/* <div className='bg-black text-white p-5 text-center'>
        hello world */}
        <FileInput onFileChange={handleFileUpload} />
      {/* </div> */}
    </div>
    </>
  )
}

export default App
