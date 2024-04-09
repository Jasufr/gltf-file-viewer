import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Preload, useGLTF } from "@react-three/drei";
import Models from "./Models";



const ModelsCanvas = ({ fileContent }) => {

  const initialCameraPosition = [0, 0, 15];

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: initialCameraPosition, fov: 30 }}
      gl={{ preserveDrawingBuffer: true }}
    >
        <Environment preset="sunset" />
        <OrbitControls />
        {fileContent && <Models fileContent={fileContent} />}
      <Preload all />
    </Canvas>
  );
};

export default ModelsCanvas;
