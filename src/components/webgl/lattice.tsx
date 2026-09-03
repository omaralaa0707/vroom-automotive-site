"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useWebglHealth } from "@/lib/use-webgl-health";

/**
 * Vroom's signature piece: the lattice.
 *
 * Every one of their photographs is shot from the same spot, against the
 * same wall — a faceted diamond marble panel standing in front of a
 * terracotta timber facade. So this rebuilds that panel as a real screen of
 * diamonds hanging in front of the car, and the pointer parallaxes the two
 * layers against each other the way walking past a real lattice screen
 * shifts what it hides and what it lets through.
 *
 * A grid of flat rhombus planes forms the screen; the car's own photograph
 * sits on a cover-fit plane behind it. The two layers drift at different
 * rates under the pointer, which is what makes it read as depth rather than
 * as a flat pattern laid over a picture.
 */

const COLS = 9;
const ROWS = 7;
const GAP = 0.14;

function rhombusGeometry(w: number, h: number) {
  const shape = new THREE.Shape();
  shape.moveTo(0, h / 2);
  shape.lineTo(w / 2, 0);
  shape.lineTo(0, -h / 2);
  shape.lineTo(-w / 2, 0);
  shape.closePath();
  return new THREE.ShapeGeometry(shape);
}

function Screen() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const eased = useRef({ x: 0, y: 0 });

  const geometry = useMemo(() => rhombusGeometry(0.86, 0.86), []);

  useEffect(() => {
    const m = mesh.current;
    if (!m) return;
    const dummy = new THREE.Object3D();
    let i = 0;
    const spanX = (COLS - 1) * GAP * 6.6;
    const spanY = (ROWS - 1) * GAP * 6.6;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        // Alternate rows offset by half a step, matching a real diamond
        // lattice's brick-like stagger rather than a plain grid.
        const stagger = (r % 2) * (GAP * 3.3);
        const x = c * GAP * 6.6 - spanX / 2 + stagger;
        const y = r * GAP * 6.6 - spanY / 2;
        dummy.position.set(x, y, 0);
        dummy.rotation.z = 0;
        dummy.updateMatrix();
        m.setMatrixAt(i, dummy.matrix);
        i++;
      }
    }
    m.instanceMatrix.needsUpdate = true;
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    eased.current.x += (pointer.current.x - eased.current.x) * (1 - Math.pow(0.02, dt));
    eased.current.y += (pointer.current.y - eased.current.y) * (1 - Math.pow(0.02, dt));
    const g = group.current;
    if (!g) return;
    const drift = Math.sin(state.clock.elapsedTime * 0.35) * 0.05;
    g.position.x = eased.current.x * 0.5 + drift;
    g.position.y = -eased.current.y * 0.32;
    g.rotation.z = eased.current.x * 0.02;
  });

  return (
    <group ref={group} position={[0, 0, 0.7]}>
      <instancedMesh ref={mesh} args={[geometry, undefined, COLS * ROWS]} frustumCulled={false}>
        <meshStandardMaterial color="#3a3632" roughness={0.55} metalness={0.15} />
      </instancedMesh>
    </group>
  );
}

function Photo({ src }: { src: string }) {
  const tex = useTexture(src);
  const mesh = useRef<THREE.Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const eased = useRef({ x: 0, y: 0 });
  const [aspect, setAspect] = useState(1);

  useEffect(() => {
    const img = tex.image as { width?: number; height?: number } | undefined;
    if (img?.width && img?.height) {
      // A one-time handoff of a value read off the loaded texture — the
      // same pattern used for WebGL-capability detection elsewhere.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAspect(img.width / img.height);
    }
  }, [tex]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    eased.current.x += (pointer.current.x - eased.current.x) * (1 - Math.pow(0.03, dt));
    eased.current.y += (pointer.current.y - eased.current.y) * (1 - Math.pow(0.03, dt));
    const m = mesh.current;
    if (!m) return;
    // The photo drifts opposite the screen and more slowly, which is the
    // actual parallax cue — two layers moving at different rates.
    m.position.x = -eased.current.x * 0.12;
    m.position.y = eased.current.y * 0.08;
  });

  // Cover-fit within a fixed 4:3 frame, computed once the texture's real
  // aspect is known, rather than squashing a portrait source.
  const frame = 4 / 3;
  const [w, h] = aspect > frame ? [aspect / frame, 1] : [1, frame / aspect];

  return (
    <mesh ref={mesh} position={[0, 0, 0]} scale={[w * 5.4, h * 5.4, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={tex} map-colorSpace={THREE.SRGBColorSpace} toneMapped={false} />
    </mesh>
  );
}

function Rig({ src }: { src: string }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />
      <Suspense fallback={null}>
        <Photo src={src} />
      </Suspense>
      <Screen />
    </>
  );
}

function canRenderWebgl() {
  try {
    const c = document.createElement("canvas");
    return Boolean(
      c.getContext("webgl2") ?? c.getContext("webgl") ?? c.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

export function Lattice({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const { lost, bind } = useWebglHealth();
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(canRenderWebgl());
  }, []);

  if (lost || supported !== true) {
    return (
      <div className={className}>
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div className={className} role="img" aria-label={alt}>
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 0, 6.2], fov: 40 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => bind(gl.domElement)}
      >
        <Rig src={src} />
      </Canvas>
    </div>
  );
}
