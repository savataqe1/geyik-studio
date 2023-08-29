/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useMemo } from "react";
import { useGLTF, useAnimations, Effects } from "@react-three/drei";
import { useLoader, extend, useFrame, useGraph } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { shaderMaterial } from "@react-three/drei";
import gsap from "gsap";
import glsl from "babel-plugin-glsl/macro";
import { SkeletonUtils } from "three-stdlib";

import * as THREE from "three";

const matcaps = [
  "/matcap1.jpg",
  "/matcap2.jpg",
  "/matcap3.jpg",
  "/matcap4.jpg",
  "/matcap5.jpg",
  "1.png",
  "5.png",
  "3.png",
  "4.png",
  "2.png",
];

const DeerShaderMaterial = shaderMaterial(
  // Uniform
  {
    tMatcap: { value: new THREE.Texture() },
    tMatcap2: { value: null },
    uProgress: { value: 0 },
  },
  // Vertex Shader
  glsl`
  varying vec2 vUv;
varying vec3 vEye;
varying vec3 vNormal;
varying vec3 vPos;

void main() {
  vUv = uv;
  vEye = normalize((modelViewMatrix * vec4( position, 1.0 )).xyz);
  vNormal = normalize(normalMatrix * normal);
  vPos = position;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
  `,
  // Fragment Shader
  glsl`
  uniform sampler2D tMatcap;
  uniform sampler2D tMatcap2;
  uniform float uProgress;
  varying vec3 vEye;
  varying vec3 vNormal;
  varying vec3 vPos;
  
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float cnoise(vec3 P){
  vec3 Pi0 = floor(P); // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
  return 2.2 * n_xyz;
}
  vec2 matcap(vec3 eye, vec3 normal) {
    vec3 reflected = reflect(eye, normal);
    float m = 2.8284271247461903 * sqrt( reflected.z+1.0 );
    return reflected.xy / m + 0.5;
  }

  float luma(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
  }
  
  float parabola(float x, float k) {
    return pow(4. * x * (1. - x), k);
  }
  
  void main() {
    vec2 mUv = matcap(vEye, vNormal);
    vec3 m1 = texture2D(tMatcap, mUv).rgb;
    vec3 m2 = texture2D(tMatcap2, mUv).rgb;
  
    float progress = uProgress * 2.0 - 1.0;
    progress *= 0.7;
  
    float thresold = smoothstep(-0.2 + progress, 0.2 + progress, -vPos.z);
  
    float pt = parabola(thresold, 2.0);
    float n = cnoise(vPos * 30.0);
    float t = smoothstep(-0.01 + progress, 0.01 + progress, -vPos.z + n * pt);
  
    vec3 color = mix(m2, m1, t);
  
    gl_FragColor = vec4(color, 1.0);
  }
  `,
);

extend({ DeerShaderMaterial });
export default function Model({ ...props }) {
  const group = useRef();
  const ref = useRef();
  const [isSwapping, setIsSwapping] = useState(false);
  const [delayCounter, setDelayCounter] = useState(1);
  const {
    scene,

    animations,
  } = useGLTF("/geyik-transformed.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);
  const { actions } = useAnimations(animations, group);
  const [
    matcap1,
    matcap2,
    matcap3,
    matcap4,
    matcap5,
    matcap6,
    matcap7,
    matcap8,
    matcap9,
  ] = useLoader(THREE.TextureLoader, [
    matcaps[0],
    matcaps[1],
    matcaps[2],
    matcaps[3],
    matcaps[4],
    matcaps[5],
    matcaps[6],
    matcaps[7],
    matcaps[8],
  ]);
  const allMatcaps = [
    matcap1,
    matcap2,
    matcap3,
    matcap4,
    matcap5,
    matcap6,
    matcap7,
    matcap8,
    matcap9,
  ];
  function changeMatCap() {
    setIsSwapping(true);
    const currentMatCap = ref.current.uniforms.tMatcap.value;
    const otherMatcaps = allMatcaps.filter((m) => m !== currentMatCap);
    const r = ~~(Math.random() * otherMatcaps.length);
    const nextMatcap = otherMatcaps[r];
    const tl = gsap.timeline({
      onComplete: () => {
        setIsSwapping(false);
        setDelayCounter(1);
      },
    });
    tl.set(ref.current.uniforms.tMatcap2, {
      value: nextMatcap,
    });

    tl.to(ref.current.uniforms.uProgress, {
      value: 1,
      duration: 8.5,
      ease: "power2.out",
    });
    tl.call(() => {
      ref.current.uniforms.tMatcap.value = ref.current.uniforms.tMatcap2.value;
      ref.current.uniforms.uProgress.value = 0;
    });
  }
  useFrame((_state, delta) => {
    if (!isSwapping) changeMatCap();
    setDelayCounter(delayCounter + 1);
    // group.current.position.z += delta * 0.1;
  });

  useEffect(() => {
    actions["Run_Cycle_2x"].play();
  }, [actions]);
  return (
    <group ref={group} {...props} dispose={null} castShadow receiveShadow>
      <primitive object={nodes.Bone} />
      <primitive object={nodes.pole_hinten_links} />
      <primitive object={nodes.ik_hinten_links} />
      <primitive object={nodes.pole_vorne_links} />
      <primitive object={nodes.ik_vorne_links} />
      <primitive object={nodes.pole_hinten_rechts} />
      <primitive object={nodes.ik_hinten_rechts} />
      <primitive object={nodes.pole_vorne_rechts} />
      <primitive object={nodes.ik_vorne_rechts} />
      <skinnedMesh
        name="body"
        geometry={nodes.body.geometry}
        // material={nodes.body.material}
        skeleton={nodes.body.skeleton}
        // skinning
      >
        <deerShaderMaterial tMatcap={matcap3} ref={ref} skinning />
      </skinnedMesh>
    </group>
  );
}

useGLTF.preload("/geyik-transformed.glb");
