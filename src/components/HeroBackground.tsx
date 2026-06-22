"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

// ... (keep fragment and vertex shader)
const fragmentShader = `
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    // Mouse influence
    vec2 mouseEffect = (u_mouse - gl_FragCoord.xy / u_resolution.xy) * 0.5;
    
    // Noise generation
    vec2 pos = st * 1.5;
    float n = snoise(pos + u_time * 0.1 + mouseEffect);
    float n2 = snoise(pos * 2.0 - u_time * 0.15 - mouseEffect * 0.5);
    float n3 = snoise(pos * 4.0 + u_time * 0.05);

    float combinedNoise = (n + n2 * 0.5 + n3 * 0.25) / 1.75;
    
    vec3 colorBase = vec3(0.01, 0.03, 0.07);
    vec3 colorNavy = vec3(0.06, 0.09, 0.16);
    vec3 colorCyan = vec3(0.22, 0.74, 0.97);
    vec3 colorPurple = vec3(0.55, 0.36, 0.96);

    vec3 color = mix(colorBase, colorNavy, combinedNoise + 0.5);
    color = mix(color, colorCyan, smoothstep(0.4, 1.0, combinedNoise) * 0.3);
    color = mix(color, colorPurple, smoothstep(-0.4, -1.0, combinedNoise) * 0.3);

    float dist = distance(gl_FragCoord.xy / u_resolution.xy, vec2(0.5));
    color *= smoothstep(1.0, 0.2, dist);

    gl_FragColor = vec4(color, 1.0);
}
`;

const vertexShader = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

const ShaderPlane = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2() },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    []
  );

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
      uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      uniforms.u_mouse.value.set(
        e.clientX / window.innerWidth,
        1.0 - e.clientY / window.innerHeight
      );
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [uniforms]);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.u_time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
};

const NetworkNode = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2} floatingRange={[-0.1, 0.1]}>
      <Icosahedron ref={meshRef} args={[1, 1]} position={[1.5, 0, 0]}>
        <meshBasicMaterial color="#38BDF8" wireframe transparent opacity={0.3} />
      </Icosahedron>
      <Icosahedron args={[0.8, 1]} position={[1.5, 0, 0]}>
        <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.15} />
      </Icosahedron>
    </Float>
  );
};

export default function HeroBackground() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const listener = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  if (prefersReducedMotion) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-[#030712] via-[#0F172A] to-[#030712]" />
    );
  }

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        gl={{ powerPreference: "high-performance", alpha: false, antialias: true }}
        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
      >
        <ambientLight intensity={0.5} />
        <ShaderPlane />
        <NetworkNode />
      </Canvas>
    </div>
  );
}
