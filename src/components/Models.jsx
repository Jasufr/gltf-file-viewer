import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three';

const Models = (props) => {

  const { fileContent, setIsLoading, loadingError, setLoadingError, environment } = props;

  const { scene, camera, gl, clock, mixer } = useThree();

  // function animate() {
  //   requestAnimationFrame(animate);
  //   if (mixer) {
  //     mixer.update(clock.getDelta());
  //   }
  // }


  useEffect(() => {
    scene.clear();
    const loader = new GLTFLoader();

    loader.load(
      // modelToLoad,
      fileContent,
      (gltf) => {
        const model = gltf.scene;

        // console.log(gltf.animations);
        // console.log(gl);
        // gl.setAnimationLoop = true;
        // if (gltf.animations.length > 0) {
          // const animations = gltf.animations;
          // mixer = new THREE.AnimationMixer(model);
          // mixer.clipAction(animations[0]).play();
        // }

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
        // animate();
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
  }, [fileContent, scene, camera, gl, environment]);


  if (loadingError) {
    return;
  }

  return null;
};

const resizeModel = (model, scene) => {
  model.updateMatrixWorld();

  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());

  model.position.x += model.position.x - center.x;
  model.position.y += model.position.y - center.y;
  model.position.z += model.position.z - center.z;

  scene.add(model);
};

export default Models;
