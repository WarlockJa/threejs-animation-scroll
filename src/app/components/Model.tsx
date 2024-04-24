import { useAnimations, useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Group } from "three";

useGLTF.preload("/robot_playground.glb");

export default function Model() {
  const groupRef = useRef<Group>(null);
  const { nodes, materials, animations, scene } = useGLTF(
    "/robot_playground.glb"
  );

  const { actions, clips } = useAnimations(animations, scene);
  const scroll = useScroll();

  // pausing animation on first render
  useEffect(() => {
    // console.log(actions);
    if (!actions["Experiment"]) return;
    actions["Experiment"].play().paused = true;
  }, []);

  // attaching animation steps to scroll
  useFrame(() => {
    if (!actions["Experiment"]) return;
    actions["Experiment"].time =
      actions["Experiment"].getClip().duration * scroll.offset;
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}
