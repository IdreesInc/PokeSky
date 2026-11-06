import type { Pokemon } from "../data/pokemon";
import "./Card.css";
import "./PokedexEntry.css";

type PokedexEntryProps = {
	pokemon: Pokemon;
	caught: boolean;
	justCaught: boolean;
};

function PokedexEntry({ pokemon, caught, justCaught }: PokedexEntryProps) {

	return (
		<div
			className={`pokedexEntry card ${!caught && "uncaught"} ${justCaught && "justCaught"} ${pokemon.primaryType.toLowerCase()}Type`}
			id={`pokedexEntry${pokemon.pokedex}`}
		>
			<img src={`renders/${pokemon.pokedex}.webp`} loading="lazy"></img>
		</div>
	);
}

export default PokedexEntry;
