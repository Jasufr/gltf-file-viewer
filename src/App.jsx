
import { useState } from 'react';
import Menu from './components/Menu';
import DisplayContainer from './components/DisplayContainer';

function App() {
  const [fileContent, setFileContent] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedFile, setSelectedFile] = useState("Select a model");
  const [environment, setEnvironment] = useState("none");

  const modelSelectValue = document.querySelector("#model-select");
  // console.log(modelSelectValue);
  const modelInputValue = document.querySelector("#modelInput");
  // console.log(modelInputValue);
  // const environmentInputValue = document.querySelector("#environment-select");
  // console.log(environmentInputValue);

  const handleOnSelect = (value) => {
    // console.log(value);
    // const selectedModel = `./public/models/${value}`;

    // setSelectedModel(selectedModel);
    // setFileContent(null);

    // const file = value;
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
    // .catch(error => {
    //   console.error('Error fetching file:', error);
    //   // Handle error
    // });
  };

  const handleOnChange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target.result;
        setFileContent(result);
      }
      console.log(reader);
      reader.readAsDataURL(file);
      // setSelectedModel(null);
  };

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
