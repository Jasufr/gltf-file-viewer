import { useCallback, useState, Suspense, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import ModelsCanvas from "./ModelsCanvas";

const DisplayContainer = (props) => {
  const { handleFileRead, fileContent, selectedModel } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  useEffect(() => {
    // Toggle loading state based on fileContent or selectedModel changes
    if (fileContent || selectedModel) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [fileContent, selectedModel]);
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = handleFileRead;
    reader.readAsDataURL(file);
  }, [handleFileRead]);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({noClick:true, onDrop, accept: {"model/gltf-binary":['.glb', '.gltf'],}});

  return (
    <>
    <div
          className="cursor-grab absolute w-full h-full z-40 bg-slate-50"
          {...getRootProps()}
        >
          { isLoading && <div className="absolute w-full h-full z-40 bg-slate-50 opacity-30"></div>}
          <input className='' {...getInputProps()} />
          { isLoading && <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50" role="status">
            <svg aria-hidden="true" className="inline w-10 h-10 text-slate-50 animate-spin fill-sky-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
          </div>}
          { (loadingError && !isDragActive) && <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-w-96 bg-red-700 bg-opacity-50 p-8 rounded-lg text-slate-50">
            <p>Error loading model. Please check the file and try again (can't load files with external dependencies).</p>
            <div className="p-4 max-h-48 overflow-auto">
            <p className="text-center font-semibold">{loadingError}</p>
            </div>
            </div>}
          { (!isLoading &&(isDragActive || (!fileContent && !selectedModel))) && <div className="select-none cursor-default absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sky-200 bg-opacity-50 p-6 z-50 rounded-lg">
            <div className="text-center flex flex-col justify-center h-full w-full">
              <img className="mx-auto" draggable="false" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAC6ElEQVR4nO3csWuTQRjH8QMXtYvopBTyXldxdBecBf8EF4s4Cs46iSjq0Nxb1KEQmgyK4ChCQFDoUmgqSAKJ1MlJ0dy176JwErQSwnt5XwfzPPfc7wvvlAwP9yH3JFCqFEIIIYQQQgghhBBCgV6923qzMxj5aJ7+qNXr9ZbEgJp2x8eHMOzv9j+eU1IAIkUodvqjVSUFIEqEgYAraRogXoRhvFfSLEDECEWUV1IZQLQIgwivpBBA3AjDeK6keQCRIxRRXElVAFEjDCK4kuoAxI8w5Hsl1QUQgFCwvJL+BWDydN9uRf0obgGAOAAQBwDiAEAcAIgDAHEAIA4AxAGAOAAQBwDiAEAcAIgDAHEAIA4AxAGAOAAQBwDiAEAcAIiTAnD9+R7+KqJLCKBzVwtBcUsSgK6BoLglDUBXIChuSQTQcxAUt6QC6ACC4pZkAF2CoLglHUDPIChupQCgpxAUt1IB0H8QFLdMu7ORCoD+/dxVnLrfai01250PCQF4dgjNTuesaXf2EwLw/BA2N68kBuDZIdTZB8IAPCuEOvtAIIBnhVC1D4QCeF4Ic/aBYADPCiG0D4QDeDYIoX2QAIBng1C2DxIB8HwQZvZBQgCeDcL0PkgMwLNAmN4HCQJ4FgiH+0AYwBMVU5N9IAvAFmfWxqeoz1VEes5BZ/n+wyy3P8pfG9+knl1EOnj49tbk9Sx3LwKfgk/qmT9CPX/06TmHP6mx7i6EkBrGXqadXkB6zuEfluV2txTK2C7N1ILSFYc/KWvaq6FPwcqa4/lfFWNJVxz+pOUH/pjO3ZcAwvpiJxaWrjj8v+8z7l4pgLEHy0+/n1zMtALTxt2u876sWTS0sT/LEdyN/z8pUjp3LwMAe/hKuoBWmu5i8IebGV9axAzJl+X2feAr6evkD2cRNYy9FljGnxuPvp1YyBApd/qxP66N+zr19XU7y+1qY8MfpZ4tmbLc3dHGtrQ5OE89C0IIIYQQQgghpKLsF/pWbPI+vLdAAAAAAElFTkSuQmCC" />
              <h3 className="font-bold">Drag and Drop your 3D Model to load.</h3>
              <p className="opacity-70 font-light">(.glft or .glb accepted)</p>
            </div>
            </div>}
          <ModelsCanvas fileContent={fileContent} selectedModel={selectedModel} setIsLoading={setIsLoading} isLoading={isLoading} loadingError={loadingError} setLoadingError={setLoadingError} />
    </div>
    </>
  )

}

export default DisplayContainer;
