import { Html, useCursor, useTexture } from "@react-three/drei";
import "./Sprite.css";
import { NearestFilter, Vector3, type Sprite as ThreeSprite } from "three";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import PostBubble from "./PostBubble";
import type { PokemonPost } from "../store/pokemonPostStore";

const SCALE = 0.3;
const SPEED = 2.5;
const FADE_IN_STEP = 0.015;
const FADE_OUT_STEP = 0.02;
const EXPIRATION = 4 * 60;

type SpriteProps = {
	pokedex: number;
	caught: boolean;
	post: PokemonPost;
	onClick: () => void;
	remove: () => void;
};

function getRandom(towardsFront: boolean = false) {
	const x = randomBetween(-20, 20);
	const z = towardsFront
		? randomBetween(5, 15)
		: randomBetween(Math.abs(x) > 15 ? -8 : -10, 15);
	return new Vector3(x, 4, z);
}

function Sprite({ pokedex, caught, post, onClick, remove }: SpriteProps) {
	const texture = useTexture(`/sprites/${pokedex}.png`, (texture) => {
		texture.minFilter = NearestFilter;
		texture.magFilter = NearestFilter;
		texture.needsUpdate = true;
	});
	const textureRight = texture.clone();
	textureRight.repeat.x = -1;
	textureRight.offset.x = 1;
	const [opacity, setOpacity] = useState(0);
	const [fadeOut, setFadeOut] = useState(false);
	const [flipped, setFlipped] = useState(false);
	const spriteRef = useRef<ThreeSprite>(null);
	const mountTimeRef = useRef<number | null>(null);
	const fromPositionRef = useRef<Vector3>(getRandom());
	const nextPositionRef = useRef<Vector3 | null>(null);
	const [baseTime] = useState(() => Math.random() * 2);
	const startTimeRef = useRef<number | null>(null);
	const [hovered, setHovered] = useState(false);
	const [uiActive, setUiActive] = useState(false);

	useCursor(hovered);

	useEffect(() => {
		moveRandom();
	}, []);

	useFrame((state) => {
		const sprite = spriteRef.current;
		const fromPosition = fromPositionRef.current;
		if (!sprite || !fromPosition) {
			return;
		}
		mountTimeRef.current ??= state.clock.elapsedTime;
		const mountTime = mountTimeRef.current;
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
				(Math.round((baseTime + state.clock.elapsedTime) * 2) % 2 ? 0.3 : 0);
		}
		if (!uiActive && state.clock.elapsedTime - mountTime > EXPIRATION) {
			setFadeOut(true);
		}
		if (!uiActive && fadeOut) {
			if (opacity > 0) {
				setOpacity(Math.max(0, opacity - FADE_OUT_STEP));
			} else {
				remove();
			}
		} else if (opacity < (caught ? 1 : 0.8)) {
			setOpacity(Math.min(caught ? 1 : 0.8, opacity + FADE_IN_STEP));
		}
	});

	function moveRandom() {
		const sprite = spriteRef.current;
		if (!sprite) {
			return;
		}
		fromPositionRef.current.copy(sprite.position);
		nextPositionRef.current = getRandom(!caught);
		startTimeRef.current = null;
		setFlipped(fromPositionRef.current.x < nextPositionRef.current.x);
	}

	function endMove() {
		if (nextPositionRef.current != null) {
			fromPositionRef.current.copy(nextPositionRef.current);
			nextPositionRef.current = null;
		}
		setTimeout(moveRandom, randomBetween(5000, 20000));
	}

	return (
		<>
			<sprite
				ref={spriteRef}
				scale={[20 * SCALE, 15 * SCALE, 1]}
				position={fromPositionRef.current}
				onPointerOver={(e) => {
					setHovered(true);
					e.stopPropagation();
				}}
				onPointerOut={() => {
					setHovered(false);
				}}
				onClick={(e) => {
					setUiActive(!uiActive);
					setHovered(false);
					onClick();
					e.stopPropagation();
				}}
				onPointerMissed={() => {
					setUiActive(false);
				}}
			>
				{(uiActive || hovered) && (
					<PostBubble
						post={post}
						preview={!uiActive}
						onMiss={() => setUiActive(false)}
					/>
				)}
				<spriteMaterial
					map={flipped ? textureRight : texture}
					alphaTest={0.5 * opacity}
					color={caught ? "hsl(0, 0%, 90%)" : "black"}
					opacity={opacity}
				/>
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
