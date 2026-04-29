/* eslint-disable react/no-unknown-property */
/**
 * HeroScene - 3D animated football pitch using @react-three/fiber.
 *
 * IMPORTANT: This file uses React.createElement (no JSX) so that
 * editor/visual-edits babel transforms do NOT inject DOM-only metadata
 * props (e.g. data-line-number) onto Three.js JSX hosts. R3F would
 * try to forward those to Three objects and crash.
 */
import React, { useMemo, useRef, createElement as h } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ---------- Float (gentle sway) ---------- */
function Float({ children, speed = 1, rotationIntensity = 0.15, floatIntensity = 0.3 }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * speed;
    ref.current.rotation.x = Math.sin(t * 0.6) * rotationIntensity * 0.4;
    ref.current.rotation.y = Math.sin(t * 0.5) * rotationIntensity * 0.6;
    ref.current.position.y = Math.sin(t * 0.8) * floatIntensity * 0.05;
  });
  return h("group", { ref }, children);
}

/* ---------- Pitch ---------- */
function Pitch() {
  const group = useRef();
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.z += delta * 0.02;
  });

  const lineObjs = useMemo(() => {
    const w = 8;
    const hh = 5;
    const segments = [
      [
        [-w / 2, 0, -hh / 2],
        [w / 2, 0, -hh / 2],
        [w / 2, 0, hh / 2],
        [-w / 2, 0, hh / 2],
        [-w / 2, 0, -hh / 2],
      ],
      [
        [0, 0, -hh / 2],
        [0, 0, hh / 2],
      ],
      [
        [-w / 2, 0, -1.4],
        [-w / 2 + 1.2, 0, -1.4],
        [-w / 2 + 1.2, 0, 1.4],
        [-w / 2, 0, 1.4],
      ],
      [
        [w / 2, 0, -1.4],
        [w / 2 - 1.2, 0, -1.4],
        [w / 2 - 1.2, 0, 1.4],
        [w / 2, 0, 1.4],
      ],
    ];
    return segments.map((pts) => {
      const g = new THREE.BufferGeometry().setFromPoints(
        pts.map((p) => new THREE.Vector3(p[0], p[1], p[2]))
      );
      const m = new THREE.LineBasicMaterial({
        color: 0x7cff6b,
        transparent: true,
        opacity: 0.65,
      });
      return new THREE.Line(g, m);
    });
  }, []);

  // Children built with h()
  const pitchPlane = h(
    "mesh",
    { rotation: [-Math.PI / 2, 0, 0], position: [0, -0.001, 0] },
    h("planeGeometry", { args: [8.6, 5.6] }),
    h("meshBasicMaterial", { color: "#06120c", transparent: true, opacity: 0.85 })
  );
  const centerCircle = h(
    "mesh",
    { rotation: [-Math.PI / 2, 0, 0], position: [0, 0.001, 0] },
    h("ringGeometry", { args: [0.95, 1.0, 64] }),
    h("meshBasicMaterial", { color: "#7CFF6B", transparent: true, opacity: 0.55 })
  );
  const linePrims = lineObjs.map((obj, i) =>
    h("primitive", { key: `ln-${i}`, object: obj })
  );

  return h(
    "group",
    { ref: group, rotation: [-Math.PI / 2.6, 0, 0], position: [0, -0.4, 0] },
    pitchPlane,
    centerCircle,
    ...linePrims
  );
}

/* ---------- Player dots ---------- */
function PlayerDots({ team = "a", count = 11 }) {
  const groupRef = useRef();
  const targets = useRef([]);
  const positions = useRef([]);

  useMemo(() => {
    positions.current = [];
    targets.current = [];
    for (let i = 0; i < count; i++) {
      const x =
        team === "a"
          ? -2.5 + (Math.random() - 0.5) * 3.2
          : 2.5 + (Math.random() - 0.5) * 3.2;
      const z = (Math.random() - 0.5) * 4.6;
      positions.current.push([x, 0.05, z]);
      targets.current.push([
        x + (Math.random() - 0.5) * 1.2,
        0.05,
        z + (Math.random() - 0.5) * 1.2,
      ]);
    }
  }, [team, count]);

  useFrame((_, delta) => {
    const grp = groupRef.current;
    if (!grp) return;
    grp.children.forEach((mesh, i) => {
      if (!targets.current[i]) return;
      const [tx, , tz] = targets.current[i];
      const p = mesh.position;
      p.x += (tx - p.x) * Math.min(delta * 0.6, 1);
      p.z += (tz - p.z) * Math.min(delta * 0.6, 1);
      if (Math.abs(p.x - tx) < 0.05 && Math.abs(p.z - tz) < 0.05) {
        const baseX = team === "a" ? -2.2 : 2.2;
        targets.current[i] = [
          baseX + (Math.random() - 0.5) * 4,
          0.05,
          (Math.random() - 0.5) * 4.4,
        ];
      }
    });
  });

  const color = team === "a" ? "#7CFF6B" : "#4CC9FF";
  const dots = positions.current.map((pos, i) =>
    h(
      "mesh",
      { key: `${team}-${i}`, position: pos },
      h("sphereGeometry", { args: [0.08, 18, 18] }),
      h("meshBasicMaterial", { color })
    )
  );
  return h(
    "group",
    { ref: groupRef, rotation: [-Math.PI / 2.6, 0, 0], position: [0, -0.4, 0] },
    ...dots
  );
}

/* ---------- Ball ---------- */
function Ball() {
  const ballRef = useRef();
  const t = useRef(0);
  useFrame((_, delta) => {
    t.current += delta;
    if (ballRef.current) {
      const r = 1.4;
      ballRef.current.position.x = Math.sin(t.current * 0.6) * r;
      ballRef.current.position.z = Math.cos(t.current * 0.6) * r * 0.5;
      ballRef.current.position.y = 0.1 + Math.sin(t.current * 1.2) * 0.05;
    }
  });
  return h(
    "group",
    { rotation: [-Math.PI / 2.6, 0, 0], position: [0, -0.4, 0] },
    h(
      "mesh",
      { ref: ballRef },
      h("sphereGeometry", { args: [0.11, 24, 24] }),
      h("meshStandardMaterial", {
        color: "#ffffff",
        emissive: "#ffffff",
        emissiveIntensity: 0.4,
      })
    )
  );
}

/* ---------- Particles ---------- */
function Particles({ count = 70 }) {
  const ref = useRef();
  const obj = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 9;
      arr[i * 3 + 1] = Math.random() * 2.5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    const mat = new THREE.PointsMaterial({
      color: 0x7cff6b,
      size: 0.03,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.55,
    });
    return new THREE.Points(geom, mat);
  }, [count]);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.04;
  });
  return h("primitive", { ref, object: obj });
}

/* ---------- Scene root ---------- */
function SceneContent() {
  return [
    h("color", { key: "bg", attach: "background", args: ["#050810"] }),
    h("fog", { key: "fog", attach: "fog", args: ["#050810", 6, 14] }),
    h("ambientLight", { key: "amb", intensity: 0.65 }),
    h("directionalLight", { key: "dir", position: [3, 6, 4], intensity: 0.6 }),
    h(
      Float,
      { key: "float", speed: 1.2, rotationIntensity: 0.15, floatIntensity: 0.3 },
      h(Pitch, { key: "pitch" }),
      h(PlayerDots, { key: "team-a", team: "a", count: 11 }),
      h(PlayerDots, { key: "team-b", team: "b", count: 11 }),
      h(Ball, { key: "ball" })
    ),
    h(Particles, { key: "particles", count: 70 }),
  ];
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 2.4, 5.4], fov: 38 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <SceneContent />
    </Canvas>
  );
}
