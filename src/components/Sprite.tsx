import { useTexture } from "@react-three/drei";
import "./Sprite.css";
import { NearestFilter, type Vector3Tuple } from "three";
import { useState } from "react";

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

	const [position] = useState<Vector3Tuple>(() => {
		return [randomBetween(-15, 15), 4, randomBetween(0, 15)];
	});

	return (
		<>
			<sprite scale={[20 * SCALE, 15 * SCALE, 1]} position={position}>
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
