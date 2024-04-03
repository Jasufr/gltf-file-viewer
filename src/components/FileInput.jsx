const FileInput = ({ onFileChange }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileChange(file);
    }
  };

  return (
    <input
      type="file"
      accept=".glb, .gltf"
      onChange={handleFileChange}
    />
  );
};

export default FileInput;
