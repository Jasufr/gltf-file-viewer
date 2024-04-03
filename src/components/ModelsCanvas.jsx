import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
// import CanvasLoader from "../Loader";

const Models = ({ modelFile }) => {
  // const planet = useGLTF("./model/planet/scene.gltf")
  const { nodes, materials } = useGLTF(URL.createObjectURL(modelFile));

  return (
    // <mesh>
    //   <hemisphereLight intensity={0.15} groundColor={"black"} />
    //   <primitive
    //     object={planet.scene}
    //   />
    // </mesh>
    <group>
      <primitive object={nodes.mesh} />
    </group>
  );
};

const ModelsCanvas = ({ modelFile }) => {
  return (
    // <Canvas
    //   frameloop="demand"
    //   shadows
    //   camera={{ position: [20, 3, 5], fov: 25 }}
    //   gl={{ preserveDrawingBuffer: true }}
    // >
    //   {/* <Suspense fallback={<CanvasLoader />}> */}
    //     <OrbitControls />
    //     <Models />
    //   {/* </Suspense> */}
    //   <Preload all />
    // </Canvas>
    <Canvas>
      <OrbitControls />
      <Models modelFile={modelFile} />
    </Canvas>
  );
};

export default ModelsCanvas;
