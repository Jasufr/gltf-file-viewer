import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Preload, useGLTF } from "@react-three/drei";
import Models from "./Models";


const ModelsCanvas = ({ fileContent, handleOnChange }) => {
  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
        <Environment preset="sunset" />
        <OrbitControls />
        {fileContent && <Models fileContent={fileContent} />}
        {/* <Models /> */}
      <Preload all />
    </Canvas>
  );
};

export default ModelsCanvas;
