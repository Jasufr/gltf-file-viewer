import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Preload, useEnvironment } from "@react-three/drei";
import Models from "./Models";

const ModelsCanvas = (props) => {
  const controlsRef = useRef();
  const { fileContent, selectedModel } = props;

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

          case "r": // Toggle autoRotate.
            controls.autoRotate = !controls.autoRotate;
            controls.update();
          break;
        }
      });
      // Update the controls for immediate visuals rendering.
      controls.update();
    }
  }, [fileContent]);


  // const envMap = useEnvironment({files: selectedEnvironment });
  const envMap = useEnvironment({files: "/public/hdri/symmetrical_garden.hdr"});


  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ fov: 30 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      {/* <Environment preset="sunset" /> */}
      <Environment map={envMap} background />
      <OrbitControls ref={controlsRef} />
      {(fileContent || selectedModel) && <Models fileContent={fileContent} selectedModel={selectedModel} />}
      <Preload all />
    </Canvas>
  );
};

export default ModelsCanvas;
