
import { useState } from 'react';
import Menu from './components/Menu';
import DisplayContainer from './components/DisplayContainer';

function App() {

  const [fileContent, setFileContent] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedFile, setSelectedFile] = useState("Select a model");
  const [environment, setEnvironment] = useState("none");

  const modelSelectValue = document.querySelector("#model-select");
  const modelInputValue = document.querySelector("#modelInput");

  //Fetch and read the fileContent of Models selectable in the Menu.
  const handleOnSelect = (value) => {
    const file = `./public/models/${value}`;
    fetch(file)
    .then(response => response.blob())
    .then(blob => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target.result;
        setFileContent(result);
      };
      reader.readAsDataURL(blob);
    })
  };

  //Handle and read files added through the input in the Menu.
  const handleOnChange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target.result;
        setFileContent(result);
      }
      reader.readAsDataURL(file);
  };

  //Read drag and dropped files.
  const handleFileRead = (e) => {
    const result = e.target.result;
    setFileContent(result);
  };


  return (
    <>
    <div className="flex h-full relative">
      <DisplayContainer handleFileRead={handleFileRead} fileContent={fileContent} selectedModel={selectedModel} setSelectedModel={setSelectedModel} modelSelectValue={modelSelectValue} modelInputValue={modelInputValue} selectedFile={selectedFile} setSelectedFile={setSelectedFile} environment={environment} />
      <Menu handleOnChange={handleOnChange} handleOnSelect={handleOnSelect} modelSelectValue={modelSelectValue} modelInputValue={modelInputValue} selectedFile={selectedFile} setSelectedFile={setSelectedFile} environment={environment} setEnvironment={setEnvironment} />
    </div>
    </>
  );
}
export default App;
