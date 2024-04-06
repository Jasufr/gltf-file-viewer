import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Preload, useGLTF } from "@react-three/drei";
import Models from "./Models";



const ModelsCanvas = ({ fileContent }) => {

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [0, 2, 5], fov: 30 }}
      gl={{ preserveDrawingBuffer: true }}
    >
        <Environment preset="sunset" />
        <OrbitControls />
        {fileContent && <Models fileContent={fileContent} position-y={-10} />}
        {/* <Models /> */}
      <Preload all />
    </Canvas>
  );
};

export default ModelsCanvas;
