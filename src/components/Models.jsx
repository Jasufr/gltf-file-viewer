import { useGLTF } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Models = ({ fileContent }) => {
  const { scene } = useThree();
  const [loadingError, setLoadingError] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      fileContent,
      (gltf) => {
        scene.clear();
        scene.add(gltf.scene);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
        console.error('Error loading model:', error);
        setLoadingError("Error loading model. Please check the file and try again.");
      }
    );
  }, [fileContent, scene]);

  if (loadingError) {
    return;
  }

  return null;



  // const planet = useGLTF("./model/planet/scene.gltf")
  // const model = useGLTF(fileContent)

  // const loader = new GLTFLoader();
  // loader.load(
  //   '{ fileContent }',
  //   function ( gltf ) {
  //     scene.add( gltf.scene );
  //     gltf.animations; // Array<THREE.AnimationClip>
  //     gltf.scene; // THREE.Group
  //     gltf.scenes; // Array<THREE.Group>
  //     gltf.cameras; // Array<THREE.Camera>
  //     gltf.asset; // Object
  //   },
  //   function ( xhr ) {
  //     console.log( (xhr.loaded / xhr.total * 100 ) + '% loaded' );
  //   },
  //   function ( error ) {
  //     console.log( 'An error happened' );
  //   }
  // );

  // const gltf = useLoader(GLTFLoader, { fileContent });

  // return (
  //   <mesh>
  //     {/* <hemisphereLight intensity={0.15} groundColor={"black"} /> */}
  //     <primitive
  //       // object={planet.scene}
  //       object={model.scene}
  //       // object={gltf.scene}
  //       />
  //   </mesh>
  // );
};

export default Models;
