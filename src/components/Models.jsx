import { useGLTF } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three';

const Models = ({ fileContent }) => {
  const { scene } = useThree();
  const [loadingError, setLoadingError] = useState(null);
  // useGLTF(fileContent);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      fileContent,
      (gltf) => {
        scene.clear();
        const mroot = gltf.scene; // Get the root object of the loaded model
        const bbox = new THREE.Box3().setFromObject(mroot);
        const cent = bbox.getCenter(new THREE.Vector3());
        const size = bbox.getSize(new THREE.Vector3());

        const maxAxis = Math.max(size.x, size.y, size.z);
        mroot.scale.multiplyScalar(1.0 / maxAxis);
        bbox.setFromObject(mroot);
        bbox.getCenter(cent);
        bbox.getSize(size);

        mroot.position.copy(cent).multiplyScalar(-1);
        mroot.position.y -= (size.y * 0.5);

        // scene.add(gltf.scene);
        scene.add(mroot);
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
