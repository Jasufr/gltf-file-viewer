
import { useState } from 'react';
import Menu from './components/Menu';
import DisplayContainer from './components/DisplayContainer';

function App() {
  const [fileContent, setFileContent] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedFile, setSelectedFile] = useState("Select a model");


  const modelSelectValue = document.querySelector("#model-select");
  const modelInputValue = document.querySelector("#modelInput");

  const handleOnSelect = (value) => {
    // console.log(value);
    const selectedModel = `./public/models/${value}`;
    setSelectedModel(selectedModel);
    setFileContent(null);
  };

  const handleOnChange = (e) => {
    // if (e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target.result;
        setFileContent(result);
      }
      reader.readAsDataURL(file);
      setSelectedModel(null);
    // }
  };

  const handleFileRead = (event) => {
    const result = event.target.result;
    setFileContent(result);
  };


  return (
    <>
    <div className="flex h-full relative">
      <DisplayContainer handleFileRead={handleFileRead} fileContent={fileContent} selectedModel={selectedModel} setSelectedModel={setSelectedModel} modelSelectValue={modelSelectValue} modelInputValue={modelInputValue} selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
      <Menu handleOnChange={handleOnChange} handleOnSelect={handleOnSelect} modelSelectValue={modelSelectValue} modelInputValue={modelInputValue} selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
    </div>
    </>
  );
}
export default App;
