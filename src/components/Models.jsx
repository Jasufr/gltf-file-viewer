import { useGLTF } from "@react-three/drei";

const Models = ({ fileContent }) => {
  const planet = useGLTF("./model/planet/scene.gltf")
  const model = useGLTF(fileContent)
  return (
    <mesh>
      {/* <hemisphereLight intensity={0.15} groundColor={"black"} /> */}
      <primitive
        // object={planet.scene}
        object={model.scene}
      />
    </mesh>
  );
};

export default Models;
