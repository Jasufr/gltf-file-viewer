import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three';

const Models = (props) => {
  const { fileContent, selectedModel } = props;
  let { scene, camera, gl, clock, mixer } = useThree();
  const [loadingError, setLoadingError] = useState(null);
  // const [modelToLoad, setModelToLoad] = useState(null);

  function animate() {
    requestAnimationFrame(animate);
    if (mixer) {
      mixer.update(clock.getDelta());
    }
  }

  var modelToLoad = null
  useEffect(() => {
    fileContent ? modelToLoad = fileContent : "";
  },[fileContent]);

  useEffect(() => {
    selectedModel ? modelToLoad = selectedModel : "";
  },[selectedModel]);


  useEffect(() => {
    scene.clear();
    const loader = new GLTFLoader();
    loader.load(
      modelToLoad,
      (gltf) => {
        const model = gltf.scene;

        console.log(gltf.animations);
        console.log(gl);
        gl.setAnimationLoop = true;
        if (gltf.animations.length > 0) {
          const animations = gltf.animations;
          mixer = new THREE.AnimationMixer(model);
          mixer.clipAction(animations[0]).play();
        }

        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3()).length();

        // Calculate distance from camera based on model size
        const distance = size / Math.tan(Math.PI * camera.fov / 360);

        // Adjust camera position to fit the model
        camera.position.set(0, 0, distance);
        camera.lookAt(0, 0, 0);

        resizeModel(model, scene);
        scene.add(model);
        gl.render(scene, camera);
        animate();
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
        console.error('Error loading model:', error);
        setLoadingError("Error loading model. Please check the file and try again.");
      }
    );
  }, [fileContent, selectedModel, scene, camera, gl]);


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

  scene.add(model);
};

export default Models;
