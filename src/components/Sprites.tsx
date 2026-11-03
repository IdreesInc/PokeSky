import Sprite from "./Sprite";
import { usePokemonPosts } from "../store/pokemonPostStore";

function Sprites() {
	const posts = usePokemonPosts();

	return (
		<>
			{posts.map((item) => (
				<Sprite key={item.key} pokedex={item.pokedex} />
			))}
		</>
	);
}

export default Sprites;
