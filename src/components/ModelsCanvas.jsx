import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Preload } from "@react-three/drei";
import Models from "./Models";



const ModelsCanvas = ({ fileContent }) => {
  // const initialCameraPosition = [0, 0, 5];

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ fov: 30 }}
      gl={{ preserveDrawingBuffer: true }}
    >
        <Environment preset="sunset" />
        <OrbitControls />
        {/* <Suspense fallback={<div className="z-50">Loading...</div>}> */}
        {fileContent && <Models fileContent={fileContent} />}
        {/* </Suspense> */}
      <Preload all />
    </Canvas>
  );
};

export default ModelsCanvas;
