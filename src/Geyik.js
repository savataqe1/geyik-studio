import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";

// Define a new shader material that uses the UV coordinates of a BufferGeometry to create a line
const UVLineShaderMaterial = extend({
  uniforms: {
    color: { value: new THREE.Color(0xffffff) },
  },
  vertexShader: `
    attribute vec2 uv;

    void main() {
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 color;

    void main() {
      gl_FragColor = vec4(color, 1.0);
    }
  `,
});

export const BufferGeometryUVLine = ({ points }) => {
  const ref = useRef();

  // Calculate the UV coordinates of the BufferGeometry
  const test = 10000;
  const geometry = useMemo(() => {
    const uv = new Float32Array(test);
    for (let i = 0; i < uv.length; i += 3) {
      uv[i] = uv[i];
      uv[i + 1] = uv[i + 1];
    }
    const bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.setAttribute("position", new THREE.BufferAttribute(uv, 3));
    bufferGeometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    return bufferGeometry;
  }, [points]);

  return (
    <line ref={ref} geometry={geometry}>
      <UVLineShaderMaterial />
    </line>
  );
};
