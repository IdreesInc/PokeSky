import "./Scene.css";
import { createRoot, type Container } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Stats } from "@react-three/drei";
import { BufferGeometry, MathUtils, Matrix4, Mesh, Object3D } from "three";
import WaterFloor from "./water/WaterFloor";
import WaterWaveSimulation from "./water/WaterWaveSimulation";
import { useMemo, useRef } from "react";
import { useWaterObject } from "./water/hooks/useWaterObject";
import WaterDepthIntersection from "./water/WaterDepthIntersection";

function Scene() {
	const { scene } = useGLTF("/models/isle_abeens_level1_baked.glb");

	const islandRef = useRef<Object3D>(null);

	const islandGeometries = useMemo(() => {
		scene.updateMatrixWorld(true);
		const rootInverse = scene.matrixWorld.clone().invert();
		const relative = new Matrix4();
		const geometries: BufferGeometry[] = [];

		scene.traverse((child) => {
			if (!(child instanceof Mesh)) {
				return;
			}
			relative.multiplyMatrices(rootInverse, child.matrixWorld);
			geometries.push(child.geometry.clone().applyMatrix4(relative));
		});
		return geometries;
	}, [scene]);

	useWaterObject("island", islandRef, islandGeometries);

	return (
		<div id="canvas-container">
			<Canvas
				camera={{
					position: [0, 45, 70],
					fov: 45,
					rotation: [MathUtils.degToRad(-30), 0, 0],
					near: 1
				}}
			>
				<primitive ref={islandRef} object={scene} scale={0.04} position={[0, 0, 0]} />
				{/* <Water /> */}
				<WaterFloor deepOpacityOverride={0.95} />
				<WaterWaveSimulation />
				<WaterDepthIntersection />
				{/* <ambientLight intensity={1} /> */}
				<OrbitControls />
				<Stats />
			</Canvas>
		</div>
	);
}

function Water() {
	return (
		<mesh rotation={[-Math.PI / 2, 0, 0]}>
			<planeGeometry args={[500, 1000]} />
			<meshStandardMaterial color="cyan" />
		</mesh>
	);
}

createRoot(document.getElementById("root") as Container).render(<Scene />);

export default Scene;
