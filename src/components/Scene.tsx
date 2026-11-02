import "./Scene.css";
import { createRoot, type Container } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { MathUtils } from "three";

function Scene() {
	const { scene } = useGLTF("/models/isle_abeens_level1_baked.glb");

	return (
		<div id="canvas-container">
			<Canvas
				camera={{
					position: [0, 45, 70],
					fov: 45,
					rotation: [MathUtils.degToRad(-30), 0, 0],
				}}
			>
				<primitive object={scene} scale={0.04} position={[0, 0, 0]} />
				{Water()}
				<ambientLight intensity={1} />
				{/* <OrbitControls /> */}
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
