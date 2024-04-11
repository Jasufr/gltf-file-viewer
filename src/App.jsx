
import { useState } from 'react';
import Menu from './components/Menu';
import DisplayContainer from './components/DisplayContainer';

function App() {
  const [fileContent, setFileContent] = useState(null);


  const handleOnChange = (e) => {

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target.result;
      setFileContent(result);
    }
    reader.readAsDataURL(file);
  };

  const handleFileRead = (event) => {
    const result = event.target.result;
    setFileContent(result);
  };


  return (
    <>
    <div className="flex h-full relative">
      <DisplayContainer handleFileRead={handleFileRead} fileContent={fileContent} />
      <Menu handleOnChange={handleOnChange} />
    </div>
    </>
  );
}
export default App;
