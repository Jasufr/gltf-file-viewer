import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
// import CanvasLoader from "../Loader";

const Models = () => {
  const planet = useGLTF("./model/planet/scene.gltf")
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor={"black"} />
      <primitive
        object={planet.scene}
      />
    </mesh>
  );
};

const ModelsCanvas = () => {
  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      {/* <Suspense fallback={<CanvasLoader />}> */}
        <OrbitControls />
        <Models />
      {/* </Suspense> */}
      <Preload all />
    </Canvas>
  );
};

export default ModelsCanvas;
