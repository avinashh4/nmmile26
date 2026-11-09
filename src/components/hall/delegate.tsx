"use client";

import { useFrame } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useRef } from "react";
import * as THREE from "three";

export type DelegateLook = {
  suit: string;
  trousers: string;
  tie: string;
  skin: string;
  hair: string;
  hairStyle?: "short" | "bun" | "long" | "ghutra";
  holds?: "folder" | "placard" | null;
};

export type DelegateHandle = {
  group: THREE.Group;
  /** 0 = standing, 1 = full stride */
  setStride: (v: number) => void;
  wave: () => void;
};

const mat = (color: string) => <meshStandardMaterial color={color} roughness={0.9} flatShading />;

/**
 * A small low-poly delegate built from primitives so the whole thing ships
 * with zero model downloads. Limbs pivot from the hip / shoulder.
 */
export const Delegate = forwardRef<DelegateHandle, { look: DelegateLook; idleSeed?: number }>(
  function Delegate({ look, idleSeed = 0 }, ref) {
    const root = useRef<THREE.Group>(null!);
    const body = useRef<THREE.Group>(null!);
    const legL = useRef<THREE.Group>(null!);
    const legR = useRef<THREE.Group>(null!);
    const armL = useRef<THREE.Group>(null!);
    const armR = useRef<THREE.Group>(null!);
    const head = useRef<THREE.Group>(null!);
    const stride = useRef(0);
    const phase = useRef(idleSeed * 10);
    const waveT = useRef(0);

    useImperativeHandle(ref, () => ({
      get group() {
        return root.current;
      },
      setStride: (v) => (stride.current = v),
      wave: () => (waveT.current = 1.6),
    }));

    useFrame((state, dt) => {
      const s = stride.current;
      phase.current += dt * (2 + s * 8);
      const p = phase.current;
      const swing = Math.sin(p) * 0.75 * s;
      legL.current.rotation.x = swing;
      legR.current.rotation.x = -swing;
      armL.current.rotation.x = -swing * 0.8;
      armR.current.rotation.x = swing * 0.8;
      body.current.position.y = Math.abs(Math.sin(p)) * 0.06 * s + Math.sin(p * 0.5) * 0.008 * (1 - s);
      head.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.6 + idleSeed * 7) * 0.25 * (1 - s);

      if (waveT.current > 0) {
        waveT.current = Math.max(0, waveT.current - dt);
        const k = Math.min(1, waveT.current * 3, (1.6 - waveT.current) * 6);
        armR.current.rotation.z = 2.6 * k;
        armR.current.rotation.x = Math.sin(waveT.current * 18) * 0.25 * k;
      } else {
        armR.current.rotation.z = THREE.MathUtils.lerp(armR.current.rotation.z, 0, 0.2);
      }
    });

    return (
      <group ref={root}>
        <group ref={body}>
          {/* legs */}
          <group ref={legL} position={[-0.11, 0.62, 0]}>
            <mesh position={[0, -0.3, 0]} castShadow>
              <boxGeometry args={[0.16, 0.6, 0.18]} />
              {mat(look.trousers)}
            </mesh>
            <mesh position={[0, -0.6, 0.05]} castShadow>
              <boxGeometry args={[0.17, 0.08, 0.28]} />
              {mat("#1b1a17")}
            </mesh>
          </group>
          <group ref={legR} position={[0.11, 0.62, 0]}>
            <mesh position={[0, -0.3, 0]} castShadow>
              <boxGeometry args={[0.16, 0.6, 0.18]} />
              {mat(look.trousers)}
            </mesh>
            <mesh position={[0, -0.6, 0.05]} castShadow>
              <boxGeometry args={[0.17, 0.08, 0.28]} />
              {mat("#1b1a17")}
            </mesh>
          </group>

          {/* torso: blazer with open front */}
          <mesh position={[0, 0.93, 0]} castShadow>
            <boxGeometry args={[0.46, 0.62, 0.26]} />
            {mat(look.suit)}
          </mesh>
          {/* shirt */}
          <mesh position={[0, 1.06, 0.132]}>
            <planeGeometry args={[0.14, 0.34]} />
            <meshStandardMaterial color="#fbf8f1" roughness={1} />
          </mesh>
          {/* tie */}
          <mesh position={[0, 1.02, 0.136]}>
            <planeGeometry args={[0.06, 0.3]} />
            <meshStandardMaterial color={look.tie} roughness={1} />
          </mesh>
          {/* lapel badge */}
          <mesh position={[-0.15, 1.08, 0.134]}>
            <circleGeometry args={[0.035, 12]} />
            <meshStandardMaterial color="#c8892b" metalness={0.4} roughness={0.5} />
          </mesh>

          {/* arms */}
          <group ref={armL} position={[-0.29, 1.18, 0]}>
            <mesh position={[0, -0.27, 0]} castShadow>
              <boxGeometry args={[0.13, 0.55, 0.15]} />
              {mat(look.suit)}
            </mesh>
            <mesh position={[0, -0.58, 0]}>
              <boxGeometry args={[0.1, 0.1, 0.1]} />
              {mat(look.skin)}
            </mesh>
            {look.holds === "folder" && (
              <mesh position={[0.02, -0.5, 0.12]} rotation={[0.1, 0, 0]} castShadow>
                <boxGeometry args={[0.04, 0.32, 0.24]} />
                {mat("#b3261e")}
              </mesh>
            )}
          </group>
          <group ref={armR} position={[0.29, 1.18, 0]}>
            <mesh position={[0, -0.27, 0]} castShadow>
              <boxGeometry args={[0.13, 0.55, 0.15]} />
              {mat(look.suit)}
            </mesh>
            <mesh position={[0, -0.58, 0]}>
              <boxGeometry args={[0.1, 0.1, 0.1]} />
              {mat(look.skin)}
            </mesh>
          </group>

          {/* head */}
          <group ref={head} position={[0, 1.42, 0]}>
            <mesh position={[0, -0.13, 0]}>
              <cylinderGeometry args={[0.06, 0.07, 0.1, 8]} />
              {mat(look.skin)}
            </mesh>
            <mesh position={[0, 0.06, 0]} castShadow>
              <icosahedronGeometry args={[0.19, 1]} />
              {mat(look.skin)}
            </mesh>
            {/* eyes */}
            <mesh position={[-0.065, 0.08, 0.17]}>
              <sphereGeometry args={[0.022, 8, 8]} />
              <meshBasicMaterial color="#1b1a17" />
            </mesh>
            <mesh position={[0.065, 0.08, 0.17]}>
              <sphereGeometry args={[0.022, 8, 8]} />
              <meshBasicMaterial color="#1b1a17" />
            </mesh>
            <Hair look={look} />
          </group>
        </group>
      </group>
    );
  },
);

function Hair({ look }: { look: DelegateLook }) {
  switch (look.hairStyle) {
    case "ghutra":
      return (
        <group>
          <mesh position={[0, 0.12, -0.02]} castShadow>
            <sphereGeometry args={[0.215, 10, 8, 0, Math.PI * 2, 0, Math.PI / 1.9]} />
            {mat("#fbf8f1")}
          </mesh>
          <mesh position={[0, 0, -0.08]} castShadow>
            <boxGeometry args={[0.44, 0.34, 0.18]} />
            {mat("#fbf8f1")}
          </mesh>
          <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.17, 0.025, 6, 16]} />
            {mat("#1b1a17")}
          </mesh>
        </group>
      );
    case "bun":
      return (
        <group>
          <mesh position={[0, 0.1, -0.02]} castShadow>
            <sphereGeometry args={[0.205, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2.1]} />
            {mat(look.hair)}
          </mesh>
          <mesh position={[0, 0.2, -0.17]} castShadow>
            <icosahedronGeometry args={[0.09, 0]} />
            {mat(look.hair)}
          </mesh>
        </group>
      );
    case "long":
      return (
        <group>
          <mesh position={[0, 0.1, -0.02]} castShadow>
            <sphereGeometry args={[0.21, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            {mat(look.hair)}
          </mesh>
          <mesh position={[0, -0.08, -0.1]} castShadow>
            <boxGeometry args={[0.38, 0.36, 0.14]} />
            {mat(look.hair)}
          </mesh>
        </group>
      );
    default:
      return (
        <mesh position={[0, 0.11, -0.02]} castShadow>
          <sphereGeometry args={[0.205, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2.4]} />
          {mat(look.hair)}
        </mesh>
      );
  }
}
