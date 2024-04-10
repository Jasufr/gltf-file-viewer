import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, Preload } from "@react-three/drei";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Models from "./Models";

const ModelsCanvas = ({ fileContent }) => {
  // const initialCameraPosition = [0, 0, 5];
  // console.log(OrbitControls);
  const controlsRef = useRef();
  useEffect(() => {
    const controls = controlsRef.current;
    if (controls) {
      controls.reset(); // Reset OrbitControls
      console.log(controls);
      controls.listenToKeyEvents(document.body)
      controls.keys = {
        RIGHT: "ArrowLeft", //left arrow
        BOTTOM: "ArrowUp", // up arrow
        LEFT: "ArrowRight", // right arrow
        UP: "ArrowDown", // down arrow
      };

      var azimuthalAngle = 0;
      var polarAngle = 1.57079;
      // controls.autoRotate = true;
      window.addEventListener("keydown", (event) => {
        console.log(controls);
        // console.log(controls.getAzimuthalAngle());
        console.log(controls.getPolarAngle());
        console.log(event.key);
        switch (event.key) {
          case "a":
            azimuthalAngle += 0.1;
            controls.setAzimuthalAngle(azimuthalAngle);
            requestAnimationFrame(() => {
              controls.update(); // Update OrbitControls
            });
          break;
          case "d":
            azimuthalAngle -= 0.1;
            controls.setAzimuthalAngle(azimuthalAngle);
            requestAnimationFrame(() => {
              controls.update(); // Update OrbitControls
            });
          break;
          case "w":
            polarAngle += 0.1;
            controls.setPolarAngle(polarAngle);
            requestAnimationFrame(() => {
              controls.update(); // Update OrbitControls
            });
          break;
          case "s":
            polarAngle -= 0.1;
            controls.setPolarAngle(polarAngle);
            requestAnimationFrame(() => {
              controls.update(); // Update OrbitControls
            });
          break;
          case "z":
            // controls.setDistance(2);
            // controls.setDistance(3);
            console.log(controls.object.position.distanceTo(controls));
            console.log(controls.getDistance());
            // controls.object.position.z -= 0.5;
            // controls.update();
        }
      })
      // controls.autoRotate = !controls.autoRotate
      requestAnimationFrame(() => {
            controls.update(); // Update OrbitControls
          });
    // })
    }



  }, [fileContent]);


  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ fov: 30 }}
      gl={{ preserveDrawingBuffer: true }}
    >
        {/* <CameraOrbitController /> */}
        <Environment preset="sunset" />
        <OrbitControls ref={controlsRef} />
        {/* <Suspense fallback={<div className="z-50">Loading...</div>}> */}
        {fileContent && <Models fileContent={fileContent} />}
        {/* </Suspense> */}
      <Preload all />
    </Canvas>
  );
};

export default ModelsCanvas;
