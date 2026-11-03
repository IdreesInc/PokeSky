import Sprite from "./Sprite";
import { usePokemonPosts } from "../store/pokemonPostStore";
import { Suspense } from "react";

function Sprites() {
	const posts = usePokemonPosts();

	return (
		<>
			{posts.map((item) => (
				<Suspense key={item.key + "/suspend"} fallback={null}>
					<Sprite key={item.key} pokedex={item.pokedex} />
				</Suspense>
			))}
		</>
	);
}

export default Sprites;
