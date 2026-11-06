import Sprite from "./Sprite";
import { usePokemonPosts } from "../store/pokemonPostStore";
import { Suspense, useState } from "react";
import { useCaught } from "../hooks/useCaught";

function Sprites() {
	const posts = usePokemonPosts();
	const { caught, catchPokemon } = useCaught();
	const [removed, setRemoved] = useState(new Set<string>());

	return (
		<>
			{posts
				.filter((item) => !removed.has(item.key))
				.map((item) => (
					<Suspense key={item.key + "/suspend"} fallback={null}>
						<Sprite
							key={item.key}
							pokedex={item.pokedex}
							caught={caught[item.pokedex] !== undefined}
							post={item}
							onClick={() => {
								const element = document.getElementById(
									`pokedexEntry${item.pokedex}`,
								);
								if (element && element.parentElement) {
									const container = element.parentElement;
									let elementRect = element.getBoundingClientRect();
									let containerRect = container.getBoundingClientRect();
									container.scrollBy({
										left:
											elementRect.left -
											containerRect.left -
											(container.clientWidth - element.clientWidth) / 2,
										behavior: "smooth",
									});
									let iterations = 0;
									const interval = setInterval(() => {
										elementRect = element.getBoundingClientRect();
										containerRect = container.getBoundingClientRect();
										if (
											iterations > 30 ||
											(elementRect.left >= containerRect.left &&
												elementRect.right <= containerRect.right)
										) {
											clearInterval(interval);
											if (caught[item.pokedex] === undefined) {
												catchPokemon(item.pokedex, item.link);
											}
										}
										iterations++;
									}, 50);
								}
							}}
							remove={() => setRemoved((prev) => new Set(prev).add(item.key))}
						/>
					</Suspense>
				))}
		</>
	);
}

export default Sprites;
