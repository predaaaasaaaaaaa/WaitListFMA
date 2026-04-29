import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Lightweight Float replacement: gentle sway + drift. */
function Float({ children, speed = 1, rotationIntensity = 0.15, floatIntensity = 0.3 }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * speed;
    ref.current.rotation.x = Math.sin(t * 0.6) * rotationIntensity * 0.4;
    ref.current.rotation.y = Math.sin(t * 0.5) * rotationIntensity * 0.6;
    ref.current.position.y = Math.sin(t * 0.8) * floatIntensity * 0.05;
  });
  return <group ref={ref}>{children}</group>;
}

function ThreeLine({ points, color = "#7CFF6B", opacity = 0.7 }) {
  const obj = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints(
      points.map((p) => new THREE.Vector3(p[0], p[1], p[2]))
    );
    const m = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity,
    });
    return new THREE.Line(g, m);
  }, [points, color, opacity]);
  return <primitive object={obj} />;
}

function Pitch() {
  const group = useRef();
  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.z += delta * 0.02;
    }
  });

  // Pitch lines
  const lines = useMemo(() => {
    const w = 8;
    const h = 5;
    const lineSegments = [];
    // outer
    lineSegments.push([
      [-w / 2, 0, -h / 2],
      [w / 2, 0, -h / 2],
      [w / 2, 0, h / 2],
      [-w / 2, 0, h / 2],
      [-w / 2, 0, -h / 2],
    ]);
    // halfway
    lineSegments.push([
      [0, 0, -h / 2],
      [0, 0, h / 2],
    ]);
    // boxes
    lineSegments.push([
      [-w / 2, 0, -1.4],
      [-w / 2 + 1.2, 0, -1.4],
      [-w / 2 + 1.2, 0, 1.4],
      [-w / 2, 0, 1.4],
    ]);
    lineSegments.push([
      [w / 2, 0, -1.4],
      [w / 2 - 1.2, 0, -1.4],
      [w / 2 - 1.2, 0, 1.4],
      [w / 2, 0, 1.4],
    ]);
    return lineSegments;
  }, []);

  return (
    <group ref={group} rotation={[-Math.PI / 2.6, 0, 0]} position={[0, -0.4, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]}>
        <planeGeometry args={[8.6, 5.6]} />
        <meshBasicMaterial color={"#06120c"} transparent opacity={0.85} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <ringGeometry args={[0.95, 1.0, 64]} />
        <meshBasicMaterial color={"#7CFF6B"} transparent opacity={0.55} />
      </mesh>
      {lines.map((seg, i) => (
        <ThreeLine key={i} points={seg} color={"#7CFF6B"} opacity={0.65} />
      ))}
    </group>
  );
}

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
  return (
    <group ref={groupRef} rotation={[-Math.PI / 2.6, 0, 0]} position={[0, -0.4, 0]}>
      {positions.current.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.08, 18, 18]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
}

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
  return (
    <group rotation={[-Math.PI / 2.6, 0, 0]} position={[0, -0.4, 0]}>
      <mesh ref={ballRef}>
        <sphereGeometry args={[0.11, 24, 24]} />
        <meshStandardMaterial color={"#ffffff"} emissive={"#ffffff"} emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

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

  return <primitive ref={ref} object={obj} />;
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 2.4, 5.4], fov: 38 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <color attach="background" args={["#050810"]} />
      <fog attach="fog" args={["#050810", 6, 14]} />
      <ambientLight intensity={0.65} />
      <directionalLight position={[3, 6, 4]} intensity={0.6} />
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
        <Pitch />
        <PlayerDots team="a" count={11} />
        <PlayerDots team="b" count={11} />
        <Ball />
      </Float>
      <Particles count={70} />
    </Canvas>
  );
}
