import { Html, useTexture } from "@react-three/drei";
import "./Sprite.css";
import { NearestFilter, Vector3, type Sprite as ThreeSprite } from "three";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import PostBubble from "./PostBubble";

const SCALE = 0.3;
const SPEED = 2.5;

type SpriteProps = {
	pokedex: number;
	post: string;
};

function getRandom() {
	return new Vector3(randomBetween(-15, 15), 4, randomBetween(-10, 15));
}

function Sprite({ pokedex, post }: SpriteProps) {
	const texture = useTexture(`/sprites/${pokedex}.png`, (texture) => {
		texture.minFilter = NearestFilter;
		texture.magFilter = NearestFilter;
		texture.needsUpdate = true;
	});
	const spriteRef = useRef<ThreeSprite>(null);
	const fromPositionRef = useRef<Vector3>(getRandom());
	const nextPositionRef = useRef<Vector3 | null>(null);
	const [baseTime] = useState(() => Math.random() * 2);
	const startTimeRef = useRef<number | null>(null);

	useEffect(() => {
		moveRandom();
	}, []);

	useFrame((state) => {
		const sprite = spriteRef.current;
		const fromPosition = fromPositionRef.current;
		if (!sprite || !fromPosition) {
			return;
		}
		const nextPosition = nextPositionRef.current;
		if (nextPosition != null) {
			// Hop to destination
			startTimeRef.current ??= state.clock.elapsedTime;
			const t = Math.min(
				1,
				(state.clock.elapsedTime - startTimeRef.current) /
					getDuration(fromPosition, nextPosition),
			);
			sprite.position.lerpVectors(fromPosition, nextPosition, t);
			if (t === 1) {
				endMove();
			}
			sprite.position.y =
				fromPosition.y +
				(Math.round((baseTime + state.clock.elapsedTime) * 5) % 2 ? 0.6 : 0);
		} else {
			// Ambient bouncing
			sprite.position.y =
				fromPosition.y +
				(Math.round((baseTime + state.clock.elapsedTime) * 2) % 2 ? 0.35 : 0);
		}
	});

	function moveRandom() {
		const sprite = spriteRef.current;
		if (!sprite) {
			return;
		}
		fromPositionRef.current.copy(sprite.position);
		nextPositionRef.current = getRandom();
		startTimeRef.current = null;
	}

	function endMove() {
		if (nextPositionRef.current != null) {
			fromPositionRef.current.copy(nextPositionRef.current);
			nextPositionRef.current = null;
		}
		setTimeout(moveRandom, randomBetween(5000, 10000));
	}

	return (
		<>
			<sprite
				ref={spriteRef}
				scale={[20 * SCALE, 15 * SCALE, 1]}
				position={fromPositionRef.current}
			>
				<PostBubble post={post} />
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

function getDuration(from: Vector3, to: Vector3) {
	return Math.hypot(to.x - from.x, to.z - from.z) / SPEED;
}

export default Sprite;
