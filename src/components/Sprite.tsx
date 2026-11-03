import { useTexture } from "@react-three/drei";
import "./Sprite.css";
import { NearestFilter, type Sprite as ThreeSprite, type Vector3Tuple } from "three";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

const SCALE = 0.3;

type SpriteProps = {
	pokedex: number;
};

function Sprite({ pokedex }: SpriteProps) {
	const texture = useTexture(`/sprites/${pokedex}.png`, (texture) => {
		texture.minFilter = NearestFilter;
		texture.magFilter = NearestFilter;
		texture.needsUpdate = true;
	});
	const spriteRef = useRef<ThreeSprite>(null);
	const [position] = useState<Vector3Tuple>(() => {
		return [randomBetween(-15, 15), 4, randomBetween(-10, 15)];
	});
	const [baseTime] = useState(() => Math.random() * 2); 

	useFrame((state) => {
		const sprite = spriteRef.current;
		if (!sprite) {
			return;
		}
		sprite.position.y = position[1] + (Math.round((baseTime + state.clock.elapsedTime) * 3) % 2 ? 0.6 : 0);
	});

	return (
		<>
			<sprite ref={spriteRef} scale={[20 * SCALE, 15 * SCALE, 1]} position={position}>
				<spriteMaterial map={texture} alphaTest={0.5} />
			</sprite>
		</>
	);
}

function randomBetween(min: number, max: number): number {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

export default Sprite;
