import { color } from "csx";
import { useControls } from "leva";
import React, { useEffect, useRef, VFC } from "react";
import * as THREE from "three";
import { useHelper } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.05} />
      <PointLight position={[30, 5, 20]} rotation={[0, 0, 0]} />
    </>
  );
};

const PointLight = ({ position }) => {
  // add controller
  const datas = useController();

  // add helper
  const lightRef = useRef();
  useHelper(lightRef, THREE.PointLightHelper, [datas.helper ? 1 : 0]);

  const meshRef = useRef();
  const { scene } = useThree();

  useEffect(() => {
    if (!scene.userData.refs) scene.userData.refs = {};
    scene.userData.refs.lightMesh = meshRef;
  }, [scene.userData]);

  useEffect(() => {
    // meshRef.current.lookAt(0, 0, 0);
  }, []);

  return (
    <mesh ref={meshRef} position={position} rotation={[0, 1, 0]}>
      <circleGeometry args={[datas.size, 64]} />
      <meshBasicMaterial color={datas.color} side={THREE.DoubleSide} />
      <pointLight
        ref={lightRef}
        color={color(datas.color).lighten(0.5).toHexString()}
        intensity={1}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        castShadow
      />
    </mesh>
  );
};

const useController = () => {
  const datas = useControls("light", {
    size: {
      value: 3.4,
      min: 0.2,
      max: 10,
      step: 0.1,
    },
    color: "#525252",
    helper: false,
  });
  return datas;
};
