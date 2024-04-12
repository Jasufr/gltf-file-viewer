import { useState } from "react";

const Menu = (props) => {
  const { handleOnChange, handleOnSelect } = props;
  const [menuOpened, setMenuOpened] = useState(null);
  const [selectedFile, setSelectedFile] = useState("Select a model");

  const preloadedModels = ["Nissan350Z.glb", "Fox.glb", "BoxAnimated.glb", "Lamp.glb", "DamagedHelmet.glb", "BarrelKeg.gltf"];
  preloadedModels.sort();

  const modelSelectValue = document.querySelector("#model-select");
  return (
    <>
      <button
        onClick={() => setMenuOpened(!menuOpened)}
        className="z-50 fixed z top-8 right-8 p-3 bg-sky-300 w-11 h-11 rounded-md"
      >
        <div
          className={`bg-slate-50 h-0.5 rounded-md w-full transition-all ${
            menuOpened ? "rotate-45  translate-y-0.5" : ""
          }`}
        />
        <div
          className={`bg-slate-50 h-0.5 rounded-md w-full my-1 ${
            menuOpened ? "hidden" : ""
          }`}
        />
        <div
          className={`bg-slate-50 h-0.5 rounded-md w-full transition-all ${
            menuOpened ? "-rotate-45" : ""
          }`}
        />
      </button>
      <div
        className={`z-40 fixed top-0 right-0 bottom-0 bg-slate-800 transition-all overflow-hidden flex flex-col
      ${menuOpened ? "w-80" : "w-0"}`}
      >
        <div className="flex-1 flex items-start mt-20 flex-col gap-6 p-8">
        <div className="w-full">
          <div className="text-slate-50 py-1 text-lg font-semibold">Browse your 3D model.</div>
          <div className='text-slate-50 flex items-center border-2 border-slate-500 rounded-s-md bg-slate-900'>
            <label htmlFor="modelInput" className="py-1 px-2 min-w-28">Choose a file: </label>
            <label htmlFor="modelInput" className=" text-slate-500 bg-slate-50 py-1 px-2 w-full truncate">{selectedFile}</label>
            <input className="modelInput" id="modelInput" type="file" name="modelUploaded" accept='.gltf, .glb' onChange={(e) => {handleOnChange(e); setMenuOpened(!menuOpened); setSelectedFile(e.target.files[0].name); modelSelectValue.value = "selected";}} hidden />
          </div>
          <label htmlFor="modelInput" className="text-slate-50 opacity-60 px-1 text-sm">.GLTF or .GLB</label>
        <div className="text-slate-50 py-1 text-lg font-semibold">Preloaded Models</div>
          <div className="text-slate-50 flex items-center border-2 border-slate-500 rounded-s-md bg-slate-900">
            <label htmlFor="model-select" className="py-1 px-2 min-w-28">Models list:</label>
            <select defaultValue={"selected"} className="text-slate-500 bg-slate-50 py-1 px-2 w-full truncate" name="model" id="model-select" onChange={(e) => {handleOnSelect(e.target.value); setSelectedFile("Select a model"); setMenuOpened(!menuOpened);}}>
              <option disabled value="selected">🔎</option>
              {preloadedModels.map((modelFile, index) => {
                const modelName = modelFile.replace(/\.(gltf|glb)$/,'');
                return <option key={index} value={modelFile}>{modelName}</option>
              })}
            </select>
          </div>
        <div className="text-slate-50 py-1 text-lg font-semibold">Environments</div>
        <div className="text-slate-50 flex items-center border-2 border-slate-500 rounded-s-md bg-slate-900">
          <label htmlFor="model-select" className="py-1 px-2 min-w-28">HDR files list:</label>
          <select name="environment" id="environment-select" className="text-slate-500 bg-slate-50 py-1 px-2 w-full truncate">
            <option value="none">None</option>
            <option defaultValue value="cobblestone_street_night">Cobblestone Street Night</option>
            <option value="symmetrical_garden">Symmetrical Garden</option>
          </select> */}
        </div>
        </div>
        <div className="text-slate-50 py-1 text-lg font-semibold">Animation</div>
        </div>
      </div>
    </>
  )

}

export default Menu;
