import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Environment, OrbitControls, Preload, useEnvironment } from "@react-three/drei";
import Models from "./Models";

const ModelsCanvas = (props) => {

  const { fileContent, selectedModel, isLoading, setIsLoading, loadingError, setLoadingError, environment } = props;

  const controlsRef = useRef();
  // const [forceRender, setForceRender] = useState(false);


  useEffect(() => {

    const controls = controlsRef.current;


    if (controls) {
      controls.reset(); // Reset OrbitControls to have a neutral view for the next Model loaded.

      // Reset scene to have a neutral zoom for the next Model loaded.
      controls.__r3f.parent.scale.x = 1;
      controls.__r3f.parent.scale.y = 1;
      controls.__r3f.parent.scale.z = 1;


      controls.listenToKeyEvents(document.body) // Permit key control.

      controls.keys = {
        RIGHT: "ArrowLeft",
        BOTTOM: "ArrowUp",
        LEFT: "ArrowRight",
        UP: "ArrowDown",
      };

      // Added controls keyboard shortcuts.
      window.addEventListener("keydown", (event) => {

        var polarAngle = controls.getPolarAngle(); // X axis rotation.
        var azimuthalAngle = controls.getAzimuthalAngle(); // Y axis rotation

        // Different action depending on the key pressed:
        switch (event.key) {

          case "a": // Rotation Left.
            azimuthalAngle += 0.2;
            controls.setAzimuthalAngle(azimuthalAngle);
          break;

          case "d": // Rotation Right.
            azimuthalAngle -= 0.2;
            controls.setAzimuthalAngle(azimuthalAngle);
          break;

          case "w": // Rotation Up.
            polarAngle += 0.2;
            controls.setPolarAngle(polarAngle);
          break;

          case "s": // Rotation Down.
            polarAngle -= 0.2;
            controls.setPolarAngle(polarAngle);
          break;

          case "z": // Zoom In.
            controls.__r3f.parent.scale.x += 0.1;
            controls.__r3f.parent.scale.y += 0.1;
            controls.__r3f.parent.scale.z += 0.1;

            // Re-render of the scene for instant visual update.
            controls.dispatchEvent({ type: "change" });
          break;

          case "x": // Zoom Out.
            controls.__r3f.parent.scale.x -= 0.1;
            controls.__r3f.parent.scale.y -= 0.1;
            controls.__r3f.parent.scale.z -= 0.1;

            // Re-render of the scene for instant visual update.
            controls.dispatchEvent({ type: "change" });

          break;

          // case "r": // Toggle autoRotate.
          //   controls.autoRotate = !controls.autoRotate;
          //   controls.update();
          // break;
        }
      });
      // Update the controls for immediate visuals rendering.
      controls.update();
    }
  }, [fileContent])

  //Changes the Environment when selected in the Menu.
  const envMap = useMemo(() => {
    switch (environment) {
      case "none":
        return null;

      case "pure_sky":
        return "/public/hdri/pure_sky.hdr";

      case "brown_photostudio":
        return "/public/hdri/brown_photostudio.hdr"

      case "leadenhall_market":
        return "/public/hdri/leadenhall_market.hdr"

      case "ninomaru_teien":
        return "/public/hdri/ninomaru_teien.hdr"

      case "rosendal_park_sunset":
        return "/public/hdri/rosendal_park_sunset.hdr"

      default:
        return null;
    }
  }, [environment]);

  // const envMap = "/public/hdri/rosendal_park_sunset.hdr";

  // useEffect(() => {
  //   // Force re-render of Canvas when environment changes
  //   setForceRender(true);
  // }, [environment]);

  // useEffect(() => {
  //   // Reset forceRender after re-render
  //   if (forceRender) {
  //     setForceRender(false);
  //   }
  // }, [forceRender]);


  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ fov: 30 }}
      gl={{ preserveDrawingBuffer: true }}
      // key={forceRender ? "forceRender" : undefined} // Key to force re-render
    >
      {!envMap && <Environment preset="sunset" />}
      {(envMap) && <Environment files={envMap} background />}

      <OrbitControls ref={controlsRef} />

      {(fileContent || selectedModel) && <Models fileContent={fileContent} selectedModel={selectedModel} setIsLoading={setIsLoading} loadingError={loadingError} setLoadingError={setLoadingError} />}

      <Preload all />
    </Canvas>
  );
};

export default ModelsCanvas;
