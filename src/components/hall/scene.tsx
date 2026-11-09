"use client";

import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { Council } from "@/content/councils";
import { Delegate, type DelegateHandle, type DelegateLook } from "./delegate";
import { bannerTexture, floorTexture, placardTexture, sealTexture } from "./textures";

export type HallProps = {
  councils: Council[];
  title: string;
  ringText: string;
  running: boolean;
  lowPower: boolean;
  onNear: (c: Council | null) => void;
  onReady?: () => void;
  onFirstMove?: () => void;
  enterRef: React.MutableRefObject<(() => void) | null>;
  onEnter: (c: Council) => void;
};

const FLOOR_R = 11.5;
const RING_R = 7.6;
const SPEED = 4.2;
const NEAR = 2.15;

type Obstacle = { x: number; z: number; r: number };

export function boothLayout(n: number) {
  // spread booths across a 270° arc, leaving the front (toward the camera) open as the entrance aisle
  const span = Math.PI * 1.5;
  return Array.from({ length: n }, (_, i) => {
    const t = n === 1 ? 0.5 : i / (n - 1);
    const a = -span / 2 + t * span; // 0 = straight back (-z)
    const x = Math.sin(a) * RING_R;
    const z = -Math.cos(a) * RING_R;
    // banners turn only partly toward the centre so they stay readable from the camera
    return { x, z, rotY: Math.atan2(-x, -z) * 0.3 };
  });
}

const PLAYER: DelegateLook = {
  suit: "#2b2a33",
  trousers: "#24232b",
  tie: "#b3261e",
  skin: "#c58c62",
  hair: "#1b1a17",
  hairStyle: "short",
  holds: "folder",
};

const NPCS: { look: DelegateLook; x: number; z: number; face: number }[] = [
  { look: { suit: "#2e5e5a", trousers: "#2a2a2a", tie: "#f3eee3", skin: "#8d5a3b", hair: "#1b1a17", hairStyle: "bun" }, x: -3.3, z: 1.4, face: 1.2 },
  { look: { suit: "#e9e1cf", trousers: "#e9e1cf", tie: "#e9e1cf", skin: "#b67c55", hair: "#1b1a17", hairStyle: "ghutra" }, x: -2.4, z: 2.1, face: -2.1 },
  { look: { suit: "#6b4a2e", trousers: "#2b2a33", tie: "#c8892b", skin: "#e2b48e", hair: "#5a3a22", hairStyle: "long" }, x: 3.6, z: -0.6, face: -1.4 },
  { look: { suit: "#3f6fb0", trousers: "#24232b", tie: "#1b1a17", skin: "#7a4a2c", hair: "#1b1a17", hairStyle: "short" }, x: 2.7, z: -1.6, face: 0.9 },
  { look: { suit: "#1b1a17", trousers: "#1b1a17", tie: "#7a4e8c", skin: "#d9a57e", hair: "#2c1d14", hairStyle: "short", holds: "folder" }, x: 4.4, z: 3.4, face: -0.4 },
];

/* ───────────────────────────── world pieces ───────────────────────────── */

function Floor({
  title,
  ringText,
  onPoint,
}: {
  title: string;
  ringText: string;
  onPoint: (p: THREE.Vector3) => void;
}) {
  const map = useMemo(() => floorTexture(title, ringText), [title, ringText]);
  const down = useRef<{ x: number; y: number } | null>(null);
  return (
    <group>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        onPointerDown={(e: ThreeEvent<PointerEvent>) => (down.current = { x: e.clientX, y: e.clientY })}
        onPointerUp={(e: ThreeEvent<PointerEvent>) => {
          const d = down.current;
          down.current = null;
          if (d && Math.hypot(e.clientX - d.x, e.clientY - d.y) < 8) onPoint(e.point);
        }}
      >
        <circleGeometry args={[FLOOR_R + 1.2, 96]} />
        <meshStandardMaterial map={map} roughness={1} />
      </mesh>
      {/* raised outer rim */}
      <mesh position={[0, 0.12, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[FLOOR_R + 1.6, FLOOR_R + 1.6, 0.24, 96, 1, true, 0, Math.PI * 2]} />
        <meshStandardMaterial color="#dcd1b9" side={THREE.BackSide} roughness={1} />
      </mesh>
      {/* the world beyond: a darker paper sheet */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <circleGeometry args={[80, 48]} />
        <meshStandardMaterial color="#e3d9c3" roughness={1} />
      </mesh>
    </group>
  );
}

function Rostrum({ letter }: { letter: string }) {
  const seal = useMemo(() => sealTexture(letter), [letter]);
  const sealRef = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    sealRef.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.4) * 0.12;
    sealRef.current.position.y = 3.2 + Math.sin(s.clock.elapsedTime * 0.9) * 0.06;
  });
  return (
    <group>
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.75, 1.85, 0.24, 48]} />
        <meshStandardMaterial color="#e9e1cf" roughness={1} />
      </mesh>
      <mesh position={[0, 0.34, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.25, 1.3, 0.2, 48]} />
        <meshStandardMaterial color="#dcd1b9" roughness={1} />
      </mesh>
      {/* lectern facing the entrance */}
      <group position={[0, 0.44, 0.45]}>
        <mesh position={[0, 0.55, 0]} castShadow>
          <boxGeometry args={[0.8, 1.1, 0.5]} />
          <meshStandardMaterial color="#6b4a2e" roughness={0.8} flatShading />
        </mesh>
        <mesh position={[0, 1.13, 0.06]} rotation={[-0.35, 0, 0]} castShadow>
          <boxGeometry args={[0.95, 0.06, 0.6]} />
          <meshStandardMaterial color="#5a3d25" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.6, 0.255]}>
          <circleGeometry args={[0.2, 24]} />
          <meshStandardMaterial color="#b3261e" roughness={0.7} />
        </mesh>
        {/* gavel */}
        <group position={[0.25, 1.2, 0.05]} rotation={[0, 0.6, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 0.18, 10]} />
            <meshStandardMaterial color="#3b2616" />
          </mesh>
          <mesh position={[0, 0.02, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.25, 6]} />
            <meshStandardMaterial color="#3b2616" />
          </mesh>
        </group>
      </group>
      <mesh ref={sealRef} position={[0, 3.2, -0.5]} castShadow>
        <circleGeometry args={[1.05, 48]} />
        <meshStandardMaterial map={seal} transparent alphaTest={0.4} side={THREE.DoubleSide} roughness={0.6} />
      </mesh>
      {/* seal stand */}
      <mesh position={[0, 1.4, -0.55]}>
        <cylinderGeometry args={[0.03, 0.03, 2.4, 8]} />
        <meshStandardMaterial color="#1b1a17" />
      </mesh>
    </group>
  );
}

function Booth({
  council,
  index,
  x,
  z,
  rotY,
  active,
  onPick,
}: {
  council: Council;
  index: number;
  x: number;
  z: number;
  rotY: number;
  active: boolean;
  onPick: () => void;
}) {
  const banner = useMemo(
    () => bannerTexture(council.abbr, council.name, council.color, index),
    [council, index],
  );
  const placard = useMemo(() => placardTexture(council.abbr, council.color), [council]);
  const flag = useRef<THREE.Mesh>(null!);
  const ring = useRef<THREE.Mesh>(null!);
  const lift = useRef(0);

  useFrame((s, dt) => {
    const t = s.clock.elapsedTime;
    // banner sway: bend the plane vertices slightly
    const g = flag.current.geometry as THREE.PlaneGeometry;
    const pos = g.attributes.position as THREE.BufferAttribute;
    const base = (g.userData.base ??= Float32Array.from(pos.array as Float32Array)) as Float32Array;
    for (let i = 0; i < pos.count; i++) {
      const bx = base[i * 3];
      const by = base[i * 3 + 1];
      const k = (1.2 - by) / 2.4; // more movement lower down
      pos.setZ(i, Math.sin(t * 1.6 + bx * 2 + index + by * 1.5) * 0.07 * k);
    }
    pos.needsUpdate = true;
    lift.current = THREE.MathUtils.damp(lift.current, active ? 1 : 0, 6, dt);
    ring.current.scale.setScalar(1 + lift.current * 0.12 + Math.sin(t * 3) * 0.02 * lift.current);
    (ring.current.material as THREE.MeshBasicMaterial).opacity = 0.25 + lift.current * 0.55;
  });

  return (
    <group position={[x, 0, z]} rotation={[0, rotY, 0]}>
      {/* platform */}
      <mesh
        position={[0, 0.08, 0]}
        receiveShadow
        castShadow
        onClick={(e) => {
          e.stopPropagation();
          onPick();
        }}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "")}
      >
        <cylinderGeometry args={[1.25, 1.32, 0.16, 40]} />
        <meshStandardMaterial color="#e9e1cf" roughness={1} />
      </mesh>
      {/* glow ring */}
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[1.45, 1.6, 64]} />
        <meshBasicMaterial color={council.color} transparent opacity={0.25} />
      </mesh>
      {/* desk */}
      <mesh position={[0, 0.5, 0.15]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.7, 0.6]} />
        <meshStandardMaterial color="#7a5533" roughness={0.85} flatShading />
      </mesh>
      <mesh position={[0, 0.865, 0.15]} castShadow>
        <boxGeometry args={[1.6, 0.04, 0.68]} />
        <meshStandardMaterial color="#5a3d25" roughness={0.8} />
      </mesh>
      {/* folded placard (two faces) */}
      <group position={[0, 0.98, 0.32]}>
        <mesh rotation={[-0.32, 0, 0]} position={[0, 0, 0.035]}>
          <planeGeometry args={[0.7, 0.22]} />
          <meshStandardMaterial map={placard} roughness={1} />
        </mesh>
        <mesh rotation={[0.32, Math.PI, 0]} position={[0, 0, -0.035]}>
          <planeGeometry args={[0.7, 0.22]} />
          <meshStandardMaterial map={placard} roughness={1} />
        </mesh>
      </group>
      {/* microphone */}
      <group position={[0.5, 0.9, 0.22]} rotation={[0.5, 0, 0]}>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.3, 6]} />
          <meshStandardMaterial color="#1b1a17" />
        </mesh>
        <mesh position={[0, 0.31, 0]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshStandardMaterial color="#1b1a17" />
        </mesh>
      </group>
      {/* banner on two poles behind the desk */}
      <mesh position={[-0.72, 1.7, -0.55]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 3.4, 8]} />
        <meshStandardMaterial color="#1b1a17" />
      </mesh>
      <mesh position={[0.72, 1.7, -0.55]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 3.4, 8]} />
        <meshStandardMaterial color="#1b1a17" />
      </mesh>
      <mesh position={[0, 3.38, -0.55]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.025, 0.025, 1.6, 8]} />
        <meshStandardMaterial color="#c8892b" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh
        ref={flag}
        position={[0, 2.14, -0.55]}
        castShadow
        onClick={(e) => {
          e.stopPropagation();
          onPick();
        }}
      >
        <planeGeometry args={[1.2, 2.4, 8, 12]} />
        <meshStandardMaterial map={banner} side={THREE.DoubleSide} alphaTest={0.5} roughness={0.95} />
      </mesh>
    </group>
  );
}

// deterministic scatter so renders stay pure
function makeSheets(count: number) {
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  return Array.from({ length: count }, () => ({
    x: (rnd() - 0.5) * 22,
    y: rnd() * 9 + 1,
    z: (rnd() - 0.5) * 22,
    s: 0.25 + rnd() * 0.35,
    rx: rnd() * 6,
    ry: rnd() * 6,
    v: 0.15 + rnd() * 0.25,
  }));
}

function PaperSheets({ count = 26 }: { count?: number }) {
  const ref = useRef<THREE.InstancedMesh>(null!);
  const sheets = useRef(makeSheets(count));
  const m = useMemo(() => new THREE.Object3D(), []);
  useFrame((s, dt) => {
    const t = s.clock.elapsedTime;
    sheets.current.forEach((d, i) => {
      d.y -= d.v * dt;
      if (d.y < 0.1) d.y = 10;
      m.position.set(d.x + Math.sin(t * 0.5 + i) * 0.6, d.y, d.z + Math.cos(t * 0.4 + i) * 0.6);
      m.rotation.set(d.rx + t * 0.6, d.ry + t * 0.3, Math.sin(t + i) * 0.6);
      m.scale.set(d.s, d.s * 1.3, d.s);
      m.updateMatrix();
      ref.current.setMatrixAt(i, m.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <planeGeometry args={[0.5, 0.5]} />
      <meshStandardMaterial color="#fbf8f1" side={THREE.DoubleSide} roughness={1} />
    </instancedMesh>
  );
}

/* ───────────────────────────── player + camera ───────────────────────────── */

function Player({
  booths,
  councils,
  obstacles,
  targetRef,
  onNear,
  onFirstMove,
  enterRef,
  onEnter,
}: {
  booths: { x: number; z: number }[];
  councils: Council[];
  obstacles: Obstacle[];
  targetRef: React.MutableRefObject<THREE.Vector3 | null>;
  onNear: (c: Council | null) => void;
  onFirstMove?: () => void;
  enterRef: React.MutableRefObject<(() => void) | null>;
  onEnter: (c: Council) => void;
}) {
  const me = useRef<DelegateHandle>(null!);
  const pos = useRef(new THREE.Vector3(0, 0, 5.2));
  const vel = useRef(new THREE.Vector3());
  const heading = useRef(Math.PI);
  const keys = useRef(new Set<string>());
  const nearIdx = useRef(-1);
  const moved = useRef(false);
  const jump = useRef({ y: 0, v: 0 });
  const camTarget = useRef(new THREE.Vector3());
  const intro = useRef(0);
  const camera = useThree((s) => s.camera);
  const canvasEl = useThree((s) => s.gl.domElement);

  useEffect(() => {
    const isTyping = () => {
      const a = document.activeElement;
      return a && (a.tagName === "INPUT" || a.tagName === "TEXTAREA" || (a as HTMLElement).isContentEditable);
    };
    // only steer while the hall fills a good part of the screen
    const inView = () => {
      const r = canvasEl.getBoundingClientRect();
      return r.bottom > window.innerHeight * 0.35 && r.top < window.innerHeight * 0.5;
    };
    const down = (e: KeyboardEvent) => {
      if (isTyping() || e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      const move = ["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(k);
      if (!inView()) return;
      if (move) {
        keys.current.add(k);
        targetRef.current = null;
        if (k.startsWith("arrow")) e.preventDefault();
      } else if (k === " ") {
        e.preventDefault();
        if (jump.current.y === 0) jump.current.v = 4.2;
        me.current.wave();
      } else if (k === "e" || k === "enter") {
        enterRef.current?.();
      }
    };
    const up = (e: KeyboardEvent) => keys.current.delete(e.key.toLowerCase());
    const blur = () => keys.current.clear();
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
    };
  }, [canvasEl, targetRef, enterRef]);

  useEffect(() => {
    enterRef.current = () => {
      if (nearIdx.current >= 0) onEnter(councils[nearIdx.current]);
    };
  }, [councils, enterRef, onEnter]);

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 1 / 20);
    const k = keys.current;
    const input = new THREE.Vector3(
      (k.has("d") || k.has("arrowright") ? 1 : 0) - (k.has("a") || k.has("arrowleft") ? 1 : 0),
      0,
      (k.has("s") || k.has("arrowdown") ? 1 : 0) - (k.has("w") || k.has("arrowup") ? 1 : 0),
    );
    if (input.lengthSq() === 0 && targetRef.current) {
      const to = targetRef.current.clone().sub(pos.current);
      to.y = 0;
      if (to.length() < 0.15) targetRef.current = null;
      else input.copy(to).normalize().multiplyScalar(Math.min(1, to.length() * 1.5));
    }
    if (input.lengthSq() > 1) input.normalize();
    if (input.lengthSq() > 0 && !moved.current) {
      moved.current = true;
      onFirstMove?.();
    }

    const want = input.multiplyScalar(SPEED);
    vel.current.lerp(want, 1 - Math.exp(-12 * dt));
    pos.current.addScaledVector(vel.current, dt);

    // collide with round obstacles
    for (const o of obstacles) {
      const dx = pos.current.x - o.x;
      const dz = pos.current.z - o.z;
      const d = Math.hypot(dx, dz);
      const min = o.r + 0.3;
      if (d < min && d > 1e-4) {
        pos.current.x = o.x + (dx / d) * min;
        pos.current.z = o.z + (dz / d) * min;
      }
    }
    const r = Math.hypot(pos.current.x, pos.current.z);
    if (r > FLOOR_R) pos.current.multiplyScalar(FLOOR_R / r);

    // jump
    const j = jump.current;
    if (j.v !== 0 || j.y > 0) {
      j.v -= 14 * dt;
      j.y = Math.max(0, j.y + j.v * dt);
      if (j.y === 0) j.v = 0;
    }

    const speed = vel.current.length();
    if (speed > 0.2) {
      const h = Math.atan2(vel.current.x, vel.current.z);
      let diff = h - heading.current;
      diff = Math.atan2(Math.sin(diff), Math.cos(diff));
      heading.current += diff * (1 - Math.exp(-14 * dt));
    }
    const g = me.current.group;
    g.position.set(pos.current.x, j.y, pos.current.z);
    g.rotation.y = heading.current;
    me.current.setStride(Math.min(1, speed / SPEED));

    // nearest booth
    let best = -1;
    let bestD = NEAR;
    booths.forEach((b, i) => {
      const d = Math.hypot(b.x - pos.current.x, b.z - pos.current.z);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    if (best !== nearIdx.current) {
      nearIdx.current = best;
      onNear(best >= 0 ? councils[best] : null);
    }

    // camera: swoop in, then follow
    intro.current = Math.min(1, intro.current + dt * 0.45);
    const e = 1 - Math.pow(1 - intro.current, 3);
    // portrait screens: pull back and look higher so the floor sits below the headline
    const portrait = (camera as THREE.PerspectiveCamera).aspect < 1;
    const height = THREE.MathUtils.lerp(22, portrait ? 8.5 : 6.0, e);
    const back = THREE.MathUtils.lerp(4, portrait ? 15 : 11.5, e);
    const lookY = portrait ? 3.4 : 1.1;
    // on wide screens pan left so the floor sits to the right of the headline
    const aspect = (camera as THREE.PerspectiveCamera).aspect;
    const pan = aspect > 1.25 ? -3.2 * e : 0;
    camTarget.current.set(pos.current.x * 0.6 + pan, height, pos.current.z * 0.6 + back);
    camera.position.lerp(camTarget.current, 1 - Math.exp(-3 * dt));
    camera.lookAt(pos.current.x * 0.75 + pan, lookY, pos.current.z * 0.75 - 2);
  });

  return <Delegate ref={me} look={PLAYER} />;
}

function Npc({ look, x, z, face, seed }: { look: DelegateLook; x: number; z: number; face: number; seed: number }) {
  const ref = useRef<DelegateHandle>(null!);
  useEffect(() => {
    ref.current.group.position.set(x, 0, z);
    ref.current.group.rotation.y = face;
    const id = window.setInterval(() => Math.random() < 0.3 && ref.current?.wave(), 4000 + seed * 900);
    return () => window.clearInterval(id);
  }, [x, z, face, seed]);
  return <Delegate ref={ref} look={look} idleSeed={seed} />;
}

function TargetMarker({ targetRef }: { targetRef: React.MutableRefObject<THREE.Vector3 | null> }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    const t = targetRef.current;
    ref.current.visible = !!t;
    if (t) {
      ref.current.position.set(t.x, 0.03, t.z);
      ref.current.scale.setScalar(1 + Math.sin(s.clock.elapsedTime * 6) * 0.1);
    }
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} visible={false}>
      <ringGeometry args={[0.22, 0.3, 32]} />
      <meshBasicMaterial color="#b3261e" />
    </mesh>
  );
}

/* ───────────────────────────── root ───────────────────────────── */

export default function HallScene(props: HallProps) {
  const { councils, title, ringText, running, lowPower, onNear, onReady, onFirstMove, enterRef, onEnter } = props;
  const booths = useMemo(() => boothLayout(councils.length), [councils.length]);
  const targetRef = useRef<THREE.Vector3 | null>(null);
  const [active, setActive] = useState<string | null>(null);

  const obstacles = useMemo<Obstacle[]>(
    () => [
      { x: 0, z: 0, r: 1.8 },
      ...booths.map((b) => ({ x: b.x, z: b.z, r: 1.15 })),
      ...NPCS.map((n) => ({ x: n.x, z: n.z, r: 0.3 })),
    ],
    [booths],
  );

  const handleNear = (c: Council | null) => {
    setActive(c?.slug ?? null);
    onNear(c);
  };

  return (
    <Canvas
      shadows={lowPower ? false : "percentage"}
      dpr={lowPower ? [1, 1.25] : [1, 1.75]}
      frameloop={running ? "always" : "never"}
      camera={{ position: [0, 22, 9], fov: 38, near: 0.1, far: 120 }}
      gl={{ antialias: !lowPower, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        onReady?.();
      }}
      style={{ touchAction: "pan-y" }}
    >
      <color attach="background" args={["#ece4d2"]} />
      <fog attach="fog" args={["#ece4d2", 18, 42]} />
      <hemisphereLight args={["#fff6e6", "#b9a888", 1.1]} />
      <directionalLight
        position={[6, 14, 8]}
        intensity={2.1}
        color="#fff1dc"
        castShadow={!lowPower}
        shadow-mapSize={[1536, 1536]}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
      />

      <Floor
        title={title}
        ringText={ringText}
        onPoint={(p) => {
          targetRef.current = new THREE.Vector3(p.x, 0, p.z);
        }}
      />
      <Rostrum letter="N" />
      {councils.map((c, i) => (
        <Booth
          key={c.slug}
          council={c}
          index={i}
          {...booths[i]}
          active={active === c.slug}
          onPick={() => {
            const b = booths[i];
            // walk to the near side of the booth
            const toCenter = new THREE.Vector3(-b.x, 0, -b.z).normalize().multiplyScalar(1.7);
            targetRef.current = new THREE.Vector3(b.x + toCenter.x, 0, b.z + toCenter.z);
          }}
        />
      ))}
      {NPCS.map((n, i) => (
        <Npc key={i} {...n} seed={i + 1} />
      ))}
      <Player
        booths={booths}
        councils={councils}
        obstacles={obstacles}
        targetRef={targetRef}
        onNear={handleNear}
        onFirstMove={onFirstMove}
        enterRef={enterRef}
        onEnter={onEnter}
      />
      <TargetMarker targetRef={targetRef} />
      {!lowPower && <PaperSheets />}
      {lowPower && <ContactShadows position={[0, 0.01, 0]} opacity={0.35} scale={30} blur={2.5} far={4} />}
    </Canvas>
  );
}
