import "./Scene.css";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { BufferGeometry, MathUtils, Matrix4, Mesh, Object3D } from "three";
import WaterFloor from "./water/WaterFloor";
import WaterWaveSimulation from "./water/WaterWaveSimulation";
import { useEffect, useMemo, useRef } from "react";
import { useWaterObject } from "./water/hooks/useWaterObject";
import WaterDepthIntersection from "./water/WaterDepthIntersection";
import { Leva } from "leva";
import Sprites from "./Sprites";

type SceneProps = {
	criesEnabled: boolean;
};

function Scene({ criesEnabled }: SceneProps) {
	const { scene: islandModel } = useGLTF(
		"models/isle_abeens_level1_baked.glb",
	);

	const islandRef = useRef<Object3D>(null);

	const islandGeometries = useMemo(() => {
		islandModel.updateMatrixWorld(true);
		const rootInverse = islandModel.matrixWorld.clone().invert();
		const relative = new Matrix4();
		const geometries: BufferGeometry[] = [];

		islandModel.traverse((child) => {
			if (!(child instanceof Mesh)) {
				return;
			}
			relative.multiplyMatrices(rootInverse, child.matrixWorld);
			geometries.push(child.geometry.clone().applyMatrix4(relative));
		});
		return geometries;
	}, [islandModel]);

	useEffect(
		() => () => {
			islandGeometries.forEach((geometry) => {
				geometry.dispose();
			});
		},
		[islandGeometries],
	);

	useWaterObject("island", islandRef, islandGeometries);

	return (
		<div id="canvas-container">
			<Leva hidden />
			<Canvas
				camera={{
					position: [0, 43, 75],
					fov: 45,
					rotation: [MathUtils.degToRad(-35), 0, 0],
					near: 1,
				}}
			>
				<primitive
					ref={islandRef}
					object={islandModel}
					scale={0.04}
					position={[0, 0, 0]}
				/>
				<Sprites criesEnabled={criesEnabled} />
				<Ground />
				<WaterFloor deepOpacityOverride={0.95} />
				<WaterWaveSimulation />
				<WaterDepthIntersection />
				<ambientLight intensity={1} />
			</Canvas>
		</div>
	);
}

function Ground() {
	return (
		<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
			<planeGeometry args={[400, 400]} />
			<meshStandardMaterial color="cyan" />
		</mesh>
	);
}

export default Scene;
