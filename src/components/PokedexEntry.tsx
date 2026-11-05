import type { Pokemon } from "../data/pokemon";
import "./Card.css";
import "./PokedexEntry.css";

type PokedexEntryProps = {
	pokemon: Pokemon;
};

function PokedexEntry({ pokemon }: PokedexEntryProps) {
	return (
		<div
			className={`pokedexEntry card ${pokemon.primaryType.toLowerCase()}Type`}
		>
			<img
				src={`renders/${pokemon.pokedex}.webp`}
				loading="lazy"
			></img>
		</div>
	);
}

export default PokedexEntry;
