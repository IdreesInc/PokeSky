import type { Pokemon } from "../data/pokemon";
import "./Card.css";
import "./PokedexEntry.css";

type PokedexEntryProps = {
	pokemon: Pokemon;
	caught: boolean;
};

function PokedexEntry({ pokemon, caught }: PokedexEntryProps) {
	return (
		<div
			className={`pokedexEntry card ${caught ? "" : "uncaught"} ${pokemon.primaryType.toLowerCase()}Type`}
		>
			<img
				src={`renders/${pokemon.pokedex}.webp`}
				loading="lazy"
			></img>
		</div>
	);
}

export default PokedexEntry;
