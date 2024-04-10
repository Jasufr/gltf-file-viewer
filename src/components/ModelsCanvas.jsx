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
        LEFT: "ArrowLeft", //left arrow
        UP: "ArrowUp", // up arrow
        RIGHT: "ArrowRight", // right arrow
        BOTTOM: "ArrowDown", // down arrow
        PAN: "A"
      }
      window.addEventListener("keydown", (event) => {
        console.log(controls);
        console.log(controls.getAzimuthalAngle());
        console.log(controls.getPolarAngle());
        console.log(event.key);
        switch (event.key) {
          case "b":

            console.log(controls.object.rotation);
            // controls.rotateLeft(0.1);
            // requestAnimationFrame(() => {
            //   controls.update(); // Update OrbitControls
            // });
          break;
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
