import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three';

const Models = (props) => {
  var { fileContent, selectedModel, setIsLoading, loadingError, setLoadingError } = props;
  let { scene, camera, gl, clock, mixer } = useThree();
  // const [loadingError, setLoadingError] = useState(null);
  // const [modelToLoad, setModelToLoad] = useState(null);
  console.log(`fileContent ${fileContent}`);
  console.log(`selectedModel ${selectedModel}`);

  function animate() {
    requestAnimationFrame(animate);
    if (mixer) {
      mixer.update(clock.getDelta());
    }
  }

  var modelToLoad = null
  useEffect(() => {
    // if (fileContent) {
    //   modelToLoad = fileContent;
    //   selectedModel = null;
    // }
    fileContent ? modelToLoad = fileContent : "";
  },[fileContent]);

  useEffect(() => {
    // if (selectedModel) {
    //   modelToLoad = selectedModel;
    //   fileContent = null;
    // }
    selectedModel ? modelToLoad = selectedModel : "";
  },[selectedModel]);

  useEffect(() => {
    scene.clear();
    const loader = new GLTFLoader();

    loader.load(
      modelToLoad,
      (gltf) => {
        const model = gltf.scene;
        // console.log(gltf.animations);
        // console.log(gl);
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
        setIsLoading(false);
        gl.render(scene, camera);
        animate();
        setLoadingError(null);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
        console.error('Error loading model:', error);
        setLoadingError(`${error}`);
        setIsLoading(false);
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
