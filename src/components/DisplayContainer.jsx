import { useCallback, useState, Suspense } from "react";
import { useDropzone } from "react-dropzone";
import ModelsCanvas from "./ModelsCanvas";

const DisplayContainer = (props) => {
  const { handleFileRead, fileContent } = props;
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = handleFileRead;
    reader.readAsDataURL(file);
    setIsLoading(true);
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({noClick:true, onDrop, accept: {"model/gltf-binary":['.glb', '.gltf'],}});

  return (
    <>
    <div
          className="absolute w-full h-full z-40"
          {...getRootProps()}
        >
          <input className='' {...getInputProps()} />
          { (isDragActive || !fileContent) && <div className="absolute top-1/3 bottom-1/3 left-1/3 right-1/3 bg-sky-200 py-3 px-6 z-50">
            <div className="text-center">
              <img className="m-auto" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAC6ElEQVR4nO3csWuTQRjH8QMXtYvopBTyXldxdBecBf8EF4s4Cs46iSjq0Nxb1KEQmgyK4ChCQFDoUmgqSAKJ1MlJ0dy176JwErQSwnt5XwfzPPfc7wvvlAwP9yH3JFCqFEIIIYQQQgghhBBCgV6923qzMxj5aJ7+qNXr9ZbEgJp2x8eHMOzv9j+eU1IAIkUodvqjVSUFIEqEgYAraRogXoRhvFfSLEDECEWUV1IZQLQIgwivpBBA3AjDeK6keQCRIxRRXElVAFEjDCK4kuoAxI8w5Hsl1QUQgFCwvJL+BWDydN9uRf0obgGAOAAQBwDiAEAcAIgDAHEAIA4AxAGAOAAQBwDiAEAcAIgDAHEAIA4AxAGAOAAQBwDiAEAcAIiTAnD9+R7+KqJLCKBzVwtBcUsSgK6BoLglDUBXIChuSQTQcxAUt6QC6ACC4pZkAF2CoLglHUDPIChupQCgpxAUt1IB0H8QFLdMu7ORCoD+/dxVnLrfai01250PCQF4dgjNTuesaXf2EwLw/BA2N68kBuDZIdTZB8IAPCuEOvtAIIBnhVC1D4QCeF4Ic/aBYADPCiG0D4QDeDYIoX2QAIBng1C2DxIB8HwQZvZBQgCeDcL0PkgMwLNAmN4HCQJ4FgiH+0AYwBMVU5N9IAvAFmfWxqeoz1VEes5BZ/n+wyy3P8pfG9+knl1EOnj49tbk9Sx3LwKfgk/qmT9CPX/06TmHP6mx7i6EkBrGXqadXkB6zuEfluV2txTK2C7N1ILSFYc/KWvaq6FPwcqa4/lfFWNJVxz+pOUH/pjO3ZcAwvpiJxaWrjj8v+8z7l4pgLEHy0+/n1zMtALTxt2u876sWTS0sT/LEdyN/z8pUjp3LwMAe/hKuoBWmu5i8IebGV9axAzJl+X2feAr6evkD2cRNYy9FljGnxuPvp1YyBApd/qxP66N+zr19XU7y+1qY8MfpZ4tmbLc3dHGtrQ5OE89C0IIIYQQQgghpKLsF/pWbPI+vLdAAAAAAElFTkSuQmCC" />
              <h3>Welcome User, Drag and Drop your 3D Model to load.</h3>
              <p>(.glft or .glb accepted)</p>
            </div>
            </div>}
          <ModelsCanvas fileContent={fileContent} />
          {/* {isLoading ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Loading...
          </div>
        ) : (
          <Suspense fallback={<div>Loading...</div>}>
            <ModelsCanvas fileContent={fileContent} />
          </Suspense>
        )} */}
    </div>
    </>
  )

}

export default DisplayContainer;
