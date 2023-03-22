import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
const glowWhite = new THREE.MeshBasicMaterial({
  color: new THREE.Color(5, 5, 5),
  toneMapped: false,
});

export default function Rings() {
  const itemsRef = useRef([]);

  useFrame((state, delta) => {
    let elapsed = state.clock.getElapsedTime();

    for (let i = 0; i < itemsRef.current.length; i++) {
      let mesh = itemsRef.current[i];
      let z = (i - 7) * 3.5 + ((elapsed * 0.4) % 3.5) * 1;
      let dist = Math.abs(z);
      mesh.position.set(0, 0.7, -z * 2);
      mesh.scale.set(1 - dist * 0.04, 1 - dist * 0.04, 1 - dist * 0.04);
    }
  });

  return (
    <>
      {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((v, i) => (
        <mesh
          position={[0, 10, 0]}
          key={i}
          ref={(el) => (itemsRef.current[i] = el)}
          material={glowWhite}
        >
          <planeGeometry args={[2, 3]} />
          {/* <meshStandardMaterial emissive={[4, 0.1, 0.4]} color={"white"} /> */}
        </mesh>
      ))}
    </>
  );
}
