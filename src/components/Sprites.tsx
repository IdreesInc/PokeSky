import Sprite from "./Sprite";
import { usePokemonPosts } from "../store/pokemonPostStore";
import { Suspense, useState } from "react";

function Sprites() {
	const posts = usePokemonPosts();
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
							post={item}
							remove={() => setRemoved((prev) => new Set(prev).add(item.key))}
						/>
					</Suspense>
				))}
		</>
	);
}

export default Sprites;
