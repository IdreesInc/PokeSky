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
									const elementRect = element.getBoundingClientRect();
									const containerRect = container.getBoundingClientRect();
									container.scrollBy({
										left:
											elementRect.left -
											containerRect.left -
											(container.clientWidth - element.clientWidth) / 2,
										behavior: "smooth",
									});
									setTimeout(() => {
										if (caught[item.pokedex] === undefined) {
											catchPokemon(item.pokedex, item.link);
										}
									}, 850);
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
