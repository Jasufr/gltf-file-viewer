import { useGLTF } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three';

const Models = ({ fileContent }) => {
  const { scene, camera } = useThree();
  const [loadingError, setLoadingError] = useState(null);
  // useGLTF(fileContent);

  useEffect(() => {
    scene.clear();
    // camera.position.set(0, 0, 15);

    const loader = new GLTFLoader();
    loader.load(
      fileContent,
      (gltf) => {
        const model = gltf.scene;

        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3()).length();

        // Calculate distance from camera based on model size
        const distance = size / Math.tan(Math.PI * camera.fov / 360);

        // Adjust camera position to fit the model
        camera.position.set(0, 0, distance);
        camera.lookAt(0, 0, 0);

        resizeModel(model, scene);
        scene.add(model);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
        console.error('Error loading model:', error);
        setLoadingError("Error loading model. Please check the file and try again.");
      }
    );
  }, [fileContent, scene, camera]);


  if (loadingError) {
    return;
  }

  return null;
};

const resizeModel = (model, scene) => {
  model.updateMatrixWorld();

  const box = new THREE.Box3().setFromObject(model);
  // const size = box.getSize(new THREE.Vector3()).length();
  const center = box.getCenter(new THREE.Vector3());

  model.position.x += model.position.x - center.x;
  model.position.y += model.position.y - center.y;
  model.position.z += model.position.z - center.z;
  console.log(model.position);
  console.log(model.rotation);

  scene.add(model);
};

export default Models;
