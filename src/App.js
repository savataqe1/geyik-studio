import React, { useRef } from "react";
import Deer from "./Demo.js";
import Audio from "./components/audio/index.js";
import Cursor from "./components/cursor/index.js";

import { Canvas, useFrame, extend } from "@react-three/fiber";
import { UnrealBloomPass } from "three-stdlib";
import Shadow from "./Shadow.js";
import { OrbitControls } from "@react-three/drei";
import { Effects } from "./Effects";
import Tree1 from "./Tree1.js";
import Tree2 from "./Tree2.js";
import Tree3 from "./Tree3.js";

import { Lights } from "./Lights.js";
import Ekmek from "./Ekmek.js";
import "./App.css";
extend({ UnrealBloomPass });

const OFFSET_Z = 20;
const TREE_1 = 10;
const TREE_2 = 10;
const TREE_3 = 10;
const MovingItem = (props) => {
  const ref = useRef();
  useFrame((_state, delta) => {
    ref.current.position.z -= delta * 5;
    if (ref.current.position.z <= -OFFSET_Z) {
      ref.current.position.z = +OFFSET_Z;
    }
  });
  return (
    <group ref={ref} position={props.position}>
      {props.children}
    </group>
  );
};

export default function App() {
  return (
    // <Canvas
    //   camera={{ position: [1.79, 1.81, 3] }}
    //   gl={{ powerPreference: "high-performance" }}
    // >
    //   <color attach="background" args={["black"]} />
    //   <ambientLight intensity={0.5} />

    //   <OrbitControls />
    //   {[...Array(TREE_1)].map((_v, index) => (
    //     <MovingItem
    //       key={index}
    //       position={[0, 0, -OFFSET_Z + (index / TREE_1) * OFFSET_Z * 5]}
    //     >
    //       <Tree1 />
    //     </MovingItem>
    //   ))}
    //   {[...Array(TREE_2)].map((_v, index) => (
    //     <MovingItem
    //       key={index}
    //       position={[0, 0, -OFFSET_Z + (index / TREE_1) * OFFSET_Z * 5]}
    //     >
    //       <Tree2 />
    //     </MovingItem>
    //   ))}
    //   {[...Array(TREE_3)].map((_v, index) => (
    //     <MovingItem
    //       key={index}
    //       position={[0, 0, -OFFSET_Z + (index / TREE_1) * OFFSET_Z * 5]}
    //     >
    //       <Tree3 />
    //     </MovingItem>
    //   ))}
    //   <Deer />
    //   <Lights />
    //   {/* <Shadow /> */}
    //   <Effects />
    //   {/*
    //   <Effects disableGamma>
    //     <unrealBloomPass threshold={1} strength={1.0} radius={0.5} />
    //   </Effects> */}
    // </Canvas>
    // <Q />
    <Ekmek />
  );
}
